import testServer from "../testUtils/testServer";
const { RegistroAPI } = require("../datasources/registroAPI");
const { SheetsAPI } = require("../datasources/SheetsAPI");
import { Student, Applicant } from "../types.d";
import {
  SAVE_LEVELS_REGISTERING,
  GET_LEVELS_REGISTERING,
  GET_APPLICANT,
  REGISTER_STUDENT,
} from "./__data__/queries";

describe("Integration", () => {
  const applicant: Applicant = {
    codigo: "1234567890",
    nombre: "Iker",
    apellido_paterno: "Mamarre",
    apellido_materno: "Martinez",
    genero: "M",
    ciclo: "2021A",
    carrera: "Agronegocios",
    telefono: "3411234567",
    email: "m@marre.com",
    externo: true,
    nivel: "4",
    curso: "en",
  };

  it("returns an applicant by codigo", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.getApplicant = jest.fn(() => Promise.resolve(applicant));
    registroAPI.getLevelsRegistering = jest.fn(() => Promise.resolve([4]));
    registroAPI.getUnAvailableGroups = jest.fn(() => Promise.resolve([]));
    registroAPI.getSchedules = jest.fn(() =>
      Promise.resolve([{ group: "E4-2", teacher: "Gonzalo Rocha" }])
    );
    const { query } = testServer(() => ({ registroAPI }));
    const res = await query({
      query: GET_APPLICANT,
      variables: { codigo: "1234567890" },
    });
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
    expect(registroAPI.getApplicant).toHaveBeenCalledWith("1234567890");
  });

  it("throws an error when an applicant is not found", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.get = jest.fn(() => Promise.resolve(null));
    const { query } = testServer(() => ({ registroAPI }));
    const res = await query({
      query: GET_APPLICANT,
      variables: { codigo: "1234509876" },
    });
    expect(registroAPI.get).toHaveBeenCalledTimes(2);
    expect(registroAPI.get).toHaveBeenCalledWith("applicants/1234509876.json");
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0].extensions.code).toBe("APPLICANT_NOT_FOUND");
  });

  it("throws an error when applicant is already registered", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.get = jest.fn((url) => Promise.resolve("E4-1"));
    const { query } = testServer(() => ({ registroAPI }));
    const res = await query({
      query: GET_APPLICANT,
      variables: { codigo: "1234567890" },
    });
    expect(registroAPI.get).toHaveBeenCalledTimes(1);
    expect(registroAPI.get).toHaveBeenCalledWith(
      "system/alreadyRegistered/1234567890.json"
    );
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0].extensions.code).toBe("ALREADY_REGISTERED");
  });

  const inputStudent: Student = {
    codigo: "1234567890",
    nombre: "Juan",
    apellido_paterno: "Paramo",
    apellido_materno: "Preciado",
    genero: "M",
    carrera: "Agronegocios",
    ciclo: "1935B",
    telefono: "3412345678",
    email: "juan@lamedialuna.net",
    nivel: "4",
    curso: "en",
    externo: false,
    grupo: "E4-1",
  };

  const response = {
    nombre: "Pedro Paramo",
    schedule: {
      group: "E4-1",
      teacher: "Gonzalo Rocha",
      time: null,
    },
  };

  it("correctly registers a student", async () => {
    const registroAPI = new RegistroAPI();
    const spy = jest.spyOn(registroAPI, "registerStudent");
    registroAPI.get = jest.fn((url) => {
      if (url.includes("alreadyRegistered")) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve();
      }
    });
    registroAPI.post = jest.fn(() => Promise.resolve());
    registroAPI.put = jest.fn(() => Promise.resolve());
    registroAPI.getSchedule = jest.fn(() =>
      Promise.resolve({
        group: "E4-1",
        teacher: "Gonzalo Rocha",
        chat: "somechatlink",
        classroom: "someclassroomlink",
        sesiones: "somesesioneslink",
      })
    );

    const registroSheetsAPI = new SheetsAPI("someid");
    registroSheetsAPI.append = jest.fn(() => Promise.resolve());

    const { mutate } = testServer(() => ({ registroAPI, registroSheetsAPI }));
    const res = await mutate({
      mutation: REGISTER_STUDENT,
      variables: inputStudent,
    });
    expect(spy).toHaveBeenCalledWith(inputStudent, inputStudent.curso);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
    expect(registroAPI.post).toHaveBeenCalledWith(
      `system/availableGroups/${inputStudent.curso}/${inputStudent.nivel}/${inputStudent.grupo}.json`,
      "1"
    );
    expect(registroSheetsAPI.append).toHaveBeenCalled();
  });

  it("throws an error when an already registered student tries to register again", async () => {
    const registroAPI = new RegistroAPI();
    const spy = jest.spyOn(registroAPI, "registerStudent");
    registroAPI.get = jest.fn((url) => {
      if (url.includes("alreadyRegistered")) {
        return Promise.resolve("E3-1");
      } else {
        return Promise.resolve();
      }
    });
    registroAPI.post = jest.fn(() => Promise.resolve());
    registroAPI.put = jest.fn(() => Promise.resolve());
    registroAPI.getSchedule = jest.fn(() =>
      Promise.resolve({
        group: "E4-1",
        teacher: "Gonzalo Rocha",
        chat: "somechatlink",
        classroom: "someclassroomlink",
        sesiones: "somesesioneslink",
      })
    );

    const registroSheetsAPI = new SheetsAPI("someid");
    registroSheetsAPI.append = jest.fn(() => Promise.resolve());

    const { mutate } = testServer(() => ({ registroAPI, registroSheetsAPI }));
    const res = await mutate({
      mutation: REGISTER_STUDENT,
      variables: inputStudent,
    });
    expect(spy).toHaveBeenCalledWith(inputStudent, inputStudent.curso);
    expect(res.errors).toBe("[[GraphQLError: E3-1]]");
    expect(res.data).toMatchSnapshot();
    expect(registroAPI.post).toHaveBeenCalledWith(
      `system/availableGroups/${inputStudent.curso}/${inputStudent.nivel}/${inputStudent.grupo}.json`,
      "1"
    );
    expect(registroSheetsAPI.append).toHaveBeenCalled();
  });

  it("gets and sets registering levels", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.getLevelsRegistering = jest.fn(() => Promise.resolve([1, 2]));
    registroAPI.setLevelsRegistering = jest.fn((levels) =>
      Promise.resolve(levels)
    );
    const { query, mutate } = testServer(() => ({ registroAPI }));
    const queryRes = await query({
      query: GET_LEVELS_REGISTERING,
    });
    expect(queryRes.errors).toBe(undefined);
    expect(queryRes.data).toMatchSnapshot();
    expect(registroAPI.getLevelsRegistering).toHaveBeenCalledWith("en");

    const levels = [1, 2];
    const course = "en";
    const mutationRes = await mutate({
      mutation: SAVE_LEVELS_REGISTERING,
      variables: { levels, course },
    });

    expect(mutationRes.errors).toBe(undefined);
    expect(mutationRes.data).toMatchSnapshot();
    expect(registroAPI.setLevelsRegistering).toHaveBeenCalledWith(
      levels,
      course
    );
  });
});
