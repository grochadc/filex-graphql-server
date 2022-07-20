import { RESTDataSource } from "apollo-datasource-rest";
import { MeetLink } from "../types/index";
import { getIndexToModify, addIDsToLinks } from "../utils";
import { ParameterizedQuery as PQ } from "pg-promise";
import db from "../datasources/database";


export interface TestInput {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  ciclo: string;
  carrera: string;
  telefono: string;
  email: string;
  institutionalEmail?: string;
  nivel_escrito: number;
  curso: string;
  externo: boolean;
  reubicacion: boolean;
}

export interface TestResults extends TestInput{
  generated_id: string;
  meetLink: string;
}
type PGDatabase = typeof db;

class PlacementAPI extends RESTDataSource {
  db: PGDatabase;
  constructor(db: PGDatabase) {
    super();
    this.db = db;
    this.baseURL = "https://filex-5726c.firebaseio.com/placement";
  }

  async addApplicant(applicant) {
    return this.post(`applications.json`, applicant );
  }

  async getTestResults(): Promise<TestResults[]> {
    return this.db.many(GET_TEST_RESULTS);
  }

  async postTestResults(results: TestResults): Promise<null> {
    const params = [
      results.codigo, 
      results.nombre, 
      results.apellido_paterno, 
      results.apellido_materno, 
      results.genero, 
      results.ciclo, 
      results.carrera, 
      results.telefono, 
      results.email, 
      results.institutionalEmail, 
      results.nivel_escrito, 
      results.curso,
      results.externo, 
      results.reubicacion,
      results.generated_id,
      results.meetLink
    ];

    return this.db.none(
      new PQ({ text: POST_TEST_RESULTS, values: [...params] })
    );
  }

  async getMeetLinks(env?: "dev" | "prod") {
    const defaultLinksUrl =
      env === "dev" ? `/${env}/meetLinks.json` : `/meetLinks.json`;
    const links = await this.get(defaultLinksUrl);
    const result = links ? addIDsToLinks(links) : [];
    return result;
  }

  async saveMeetLinks(links: { teacher: string; link: string }[], env) {
    const defaultLinksUrl =
      env === "dev" ? `/${env}/meetLinks.json` : `/meetLinks.json`;
    console.log("saving meet links in", defaultLinksUrl);
    return this.put(defaultLinksUrl, links);
  }

  async saveSingleMeetLink(link: MeetLink, env?: "dev" | "prod") {
    const defaultMeetLinksLocation =
      env === "dev" ? `/${env}/meetLinks` : `/meetLinks`;
    const meetLinks: MeetLink[] = await this.get(
      defaultMeetLinksLocation + ".json"
    );
    const insertAtIndex = getIndexToModify(
      link,
      meetLinks,
      (i, a) => i.id === a.id
    );
    return this.put(
      `${defaultMeetLinksLocation}/${insertAtIndex.toString()}.json`,
      JSON.stringify(link)
    );
  }

  async removeMeetLink(link: MeetLink, env?: "dev" | "prod") {
    const defaultMeetLinksLocation =
      env === "dev" ? `/${env}/meetLinks` : `/meetLinks`;
    const links: MeetLink[] = await this.get(
      defaultMeetLinksLocation + ".json"
    );
    const result = links.filter((item) => item.id !== link.id);
    return this.put(`${defaultMeetLinksLocation}.json`, JSON.stringify(result));
  }

  async logInUser() {
    const online = await this.get(`/online.json`);
    if (online === null) {
      this.put(`/online.json`, Number(1).toString());
      return 1;
    }
    const counter = Number(online) + 1;
    this.context.dataSources.sheetsAPI.setOnlineUsers(counter);
    this.put(`/online.json`, counter.toString());
    return counter;
  }

  async logOutUser() {
    const online = await this.get(`/online.json`);
    const counter = Number(online) - 1;
    this.context.dataSources.placementSheetsAPI.setOnlineUsers(counter);
    this.put(`/online.json`, counter.toString());
    return counter;
  }

  getCarreras() {
    return this.get("/carreras.json");
  }

  getHomePageMessage() {
    return this.get("/homePageMessage.json");
  }

  async setPlacementHomePageMessage(input: {
    active: boolean;
    message: string;
  }) {
    await this.put("/homePageMessage.json", {
      active: input.active,
      message: input.message,
    });
    return true;
  }
}

export const POST_TEST_RESULTS = `
-- POST TEST RESULTS INTO DB
INSERT INTO test_results (
  codigo, 
  nombre, 
  apellido_paterno, 
  apellido_materno, 
  genero, 
  ciclo, 
  carrera, 
  telefono, 
  email, 
  institucionalEmail, 
  nivel_escrito, 
  curso, externo, 
  reubicacion,
  generated_id,
  meetLink
  )
VALUES (
  $1, 
  $2, 
  $3, 
  $4, 
  $5, 
  $6, 
  $7, 
  $8, 
  $9, 
  $10, 
  $11, 
  $12, 
  $13, 
  $14,
  $15,
  $16
  );
`;

export const GET_TEST_RESULTS = `
  -- Get the first 100 test results
  SELECT * FROM test_results LIMIT 100;
`;

export { PlacementAPI };
