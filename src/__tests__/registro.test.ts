import testServer from "../testUtils/testServer";
import Database from "../testUtils/databaseCreator";
import { gql } from "apollo-server";
const { RegistroAPI } = require("../datasources/registroAPI");
import { SheetsAPI } from "../datasources/SheetsAPI";

describe("registro", () => {
  const registroAPI = new RegistroAPI();
  const applicant = {
    codigo: "1234567890",
    nombre: "Benito Antonio",
    apellido_paterno: "Martinez",
    apellido_materno: "Ocasio",
    genero: "M",
    ciclo: "2021A",
    carrera: "Agronegocios",
    telefono: "3411234567",
    email: "bad@bunny.pr",
    externo: true,
    nivel: "4",
    curso: "en"
  };
  const schedulesLevel4 = {
    "E4-1": {
      teacher: "GONZALO ROCHA",
      group: "E4-1",
      sesiones: "HTTP://URL_AQUI",
      chat: "HTTP://URL_AQUI",
      classroom: "HTTP://URL_AQUI"
    }
  };

  it("gets registering levels", async () => {
    const db = {
      prod: {
        registeringLevels: {
          en: ["1", "2"]
        }
      }
    };
    const GET_LEVELS_REGISTERING = gql`
      query getLevelsRegistering($course: String!) {
        english: registeringLevels(course: $course)
      }
    `;
    const variables = { course: "en" };
    const database = new Database(db);
    registroAPI.get = jest.fn(url => database.get(url));
    const dataSources = () => {
      return { registroAPI };
    };
    const context = () => {
      return { enviroment: "prod" };
    };
    const { query } = testServer(dataSources, context);
    const res = await query({
      query: GET_LEVELS_REGISTERING,
      variables
    });
    expect(registroAPI.get).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(registroAPI.get).toHaveBeenCalledTimes(1);
    expect(registroAPI.get).toHaveBeenCalledWith(
      "prod/registeringLevels/en.json"
    );
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("gets an applicant who isn't registered", async () => {
    const db = {
      prod: {
        applicants: {
          "1234567890": applicant
        },
        registeringLevels: { en: ["4"] },
        schedules: {
          en: {
            level4: schedulesLevel4
          }
        }
      }
    };
    const GET_APPLICANT = gql`
      query info($codigo: ID!) {
        applicant(codigo: $codigo) {
          codigo
          nombre
          apellido_materno
          apellido_paterno
          genero
          carrera
          ciclo
          telefono
          email
          nivel
          curso
          externo
          registering
          registeredSchedule {
            teacher
            group
            classroom
            chat
            sesiones
          }
          schedules {
            teacher
            group
            serialized(options: { teacher: true, group: true })
          }
        }
      }
    `;
    const variables = {
      codigo: "1234567890"
    };
    const database = new Database(db);
    registroAPI.get = jest.fn(url => database.get(url));
    const dataSources = () => {
      return { registroAPI };
    };
    const context = () => {
      return { enviroment: "prod" };
    };
    const { query } = testServer(dataSources, context);
    const res = await query({
      query: GET_APPLICANT,
      variables
    });
    expect(registroAPI.get).toHaveBeenCalledTimes(5);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
    expect(registroAPI.get).not.toHaveBeenCalledWith(
      expect.stringMatching("undefined")
    );
  });
  it("gets an applicant who is already registered", async () => {
    const db = {
      prod: {
        alreadyRegistered: {
          "1234567890": "E4-1"
        },
        applicants: {
          "1234567890": applicant
        },
        registeringLevels: {
          en: ["3"]
        },
        schedules: {
          en: {
            level4: schedulesLevel4
          }
        }
      }
    };
    const GET_REGISTERED_APPLICANT = gql`
      query info($codigo: ID!) {
        applicant(codigo: $codigo) {
          codigo
          nombre
          email
          nivel
          registering
          registeredSchedule {
            teacher
            group
            classroom
            chat
            sesiones
          }
          schedules {
            teacher
            group
            serialized(options: { teacher: true, group: true })
          }
        }
      }
    `;
    const variables = {
      codigo: "1234567890"
    };

    const database = new Database(db);
    registroAPI.get = jest.fn(url => {
      return database.get(url);
    });
    const dataSources = () => {
      return { registroAPI };
    };
    const context = () => {
      return { enviroment: "prod" };
    };
    const { query } = testServer(dataSources, context);
    const res = await query({
      query: GET_REGISTERED_APPLICANT,
      variables
    });
    expect(registroAPI.get).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(res.data.applicant.registering).toBe(false);
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
  });

  it("gets a schedule", async () => {
    const db = {
      prod: {
        schedules: {
          en: {
            level1: {
              "E1-1": {
                teacher: "GONZALO ROCHA",
                group: "E1-1",
                sesiones: "HTTP://URL_AQUI",
                chat: "HTTP://URL_AQUI",
                classroom: "HTTP://URL_AQUI"
              }
            }
          }
        }
      }
    };
    const GET_SCHEDULE = gql`
      query getSchedule($id: String!) {
        schedule(id: $id) {
          group
          teacher
          chat
          classroom
          sesiones
        }
      }
    `;
    const variables = {
      id: "E1-1"
    };
    const database = new Database(db);
    registroAPI.get = jest.fn(url => {
      return database.get(url);
    });
    const dataSources = () => {
      return { registroAPI };
    };
    const context = () => {
      return { enviroment: "prod" };
    };
    const { query } = testServer(dataSources, context);
    const res = await query({
      query: GET_SCHEDULE,
      variables
    });
    expect(registroAPI.get).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
  });

  it("saves levels registering", async () => {
    const SAVE_LEVELS_REGISTERING = gql`
      mutation saveLevels($levels: [String]!, $course: String!) {
        saveRegisteringLevels(levels: $levels, course: $course)
      }
    `;

    const variables = {
      levels: ["1", "2"],
      course: "en"
    };
    registroAPI.put = jest.fn();

    const dataSources = () => {
      return { registroAPI };
    };
    const context = () => {
      return { enviroment: "prod" };
    };
    const { query } = testServer(dataSources, context);
    const res = await query({
      query: SAVE_LEVELS_REGISTERING,
      variables
    });
    expect(registroAPI.put).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(
      registroAPI.put
    ).toHaveBeenCalledWith("prod/registeringLevels/en.json", ["1", "2"]);
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
  });

  it("registers a student", async () => {
    const db = {
      prod: {
        schedules: {
          en: {
            level4: schedulesLevel4
          }
        }
      }
    };
    const REGISTER_STUDENT = gql`
      mutation register(
        $codigo: ID!
        $nombre: String!
        $apellido_materno: String!
        $apellido_paterno: String!
        $genero: String!
        $carrera: String!
        $ciclo: String!
        $telefono: String!
        $email: String!
        $nivel: String!
        $curso: String!
        $externo: Boolean!
        $schedule: String!
      ) {
        registerStudent(
          input: {
            codigo: $codigo
            nombre: $nombre
            apellido_materno: $apellido_materno
            apellido_paterno: $apellido_paterno
            genero: $genero
            carrera: $carrera
            ciclo: $ciclo
            telefono: $telefono
            email: $email
            nivel: $nivel
            curso: $curso
            externo: $externo
            grupo: $schedule
          }
        ) {
          nombre
          schedule {
            group
            teacher
            chat
            classroom
            sesiones
          }
        }
      }
    `;
    const variables = {
      codigo: "1234567890",
      nombre: "Benito Antonio",
      apellido_materno: "Martinez",
      apellido_paterno: "Ocasio",
      genero: "M",
      carrera: "Abogado",
      ciclo: "2021A",
      telefono: "1234567890",
      email: "bad@bunny.pr",
      nivel: "4",
      curso: "en",
      externo: false,
      schedule: "E4-1"
    };
    const database = new Database(db);
    const registroAPI = new RegistroAPI();
    registroAPI.get = jest.fn(url => database.get(url));
    registroAPI.post = jest.fn((url, data) => Promise.resolve());

    const registroSheetsAPI = new SheetsAPI("id");
    registroSheetsAPI.append = jest.fn(() => Promise.resolve());

    const dataSources = () => {
      return {
        registroAPI: registroAPI,
        registroSheetsAPI: registroSheetsAPI
      };
    };

    const context = () => {
      return {
        enviroment: "prod"
      };
    };
    const { query } = testServer(dataSources, context);
    const res = await query({
      query: REGISTER_STUDENT,
      variables
    });
    expect(registroAPI.get).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(registroAPI.post).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(registroAPI.post).toHaveBeenCalledWith(
      "prod/availableGroups/en/level4/E4-1.json",
      "1"
    );
    if (res.errors) console.log(JSON.stringify(res.errors));
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
