import { RESTDataSource } from "apollo-datasource-rest";
import { MeetLink } from "../types/index";
import { getIndexToModify, addIDsToLinks } from "../utils";

import { PrismaClient } from "@prisma/client";

import {
  TestResults,
  Scalars,
  OralResults,
  WrittenResultsInput,
} from "../generated/graphql";
import { ApplicantWithMeetLink } from "modules/placement_exam";

class PlacementAPI extends RESTDataSource {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    super();
    if (prisma === undefined) {
      throw Error("Supply a new PrismaCLient() on constructor");
    }

    this.prisma = prisma;
    this.baseURL = "https://filex-5726c.firebaseio.com/placement";
  }

  updateFinalResults(input: {
    id: number;
    nivelOral: number;
    nivelFinal: number;
  }): void {
    this.prisma.testResults.update({
      where: { id: input.id },
      data: { nivelOral: input.nivelOral, nivelFinal: input.nivelFinal },
    });
  }

  async addApplicant(applicant) {
    return this.post(`applications.json`, applicant);
  }

  async getTestResults(
    filter: "ASSIGNED" | "NONASSIGNED" | "ALL" | undefined
  ): Promise<TestResults[]> {
    switch (filter) {
      case "ASSIGNED":
        return (
          await this.prisma.testResults.findMany({
            where: { nivelFinal: { not: null } },
          })
        ).map((item) => ({ ...item, id: String(item.id) }));
      case "NONASSIGNED":
        return (
          await this.prisma.testResults.findMany({
            where: { nivelFinal: null },
          })
        ).map((item) => ({ ...item, id: String(item.id) }));
      default:
        return (await this.prisma.testResults.findMany()).map((item) => ({
          ...item,
          id: String(item.id),
        }));
    }
  }

  async postTestResults(results: ApplicantWithMeetLink): Promise<string> {
    const posted = await this.prisma.testResults.create({
      data: results,
    });
    return String(posted.id);
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
