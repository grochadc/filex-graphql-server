import testServer from "../testUtils/testServer";
const { RegistroAPI } = require("../datasources/registroAPI");
import { Student, Applicant } from "../types";
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

  it("Returns an applicant by codigo", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.getApplicant = jest.fn(() => applicant);
    const { query } = testServer(() => ({ registroAPI }));
    const res = await query({
      query: GET_APPLICANT,
      variables: { codigo: "1234567890" },
    });
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
    expect(registroAPI.getApplicant).toHaveBeenCalledWith("1234567890");
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

  it("Correctly registers a student", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.registerStudent = jest.fn(
      (student: Student, nivel: string, grupo: string) => student
    );
    const { mutate } = testServer(() => ({ registroAPI }));
    const res = await mutate({
      mutation: REGISTER_STUDENT,
      variables: inputStudent,
    });
    if (res.errors) console.log(res.errors);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
    expect(registroAPI.registerStudent).toHaveBeenCalledWith(
      inputStudent,
      inputStudent.nivel,
      inputStudent.grupo
    );
  });

  it("Gets and sets registering levels", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.getLevelsRegistering = jest.fn(() => [1, 2]);
    registroAPI.setLevelsRegistering = jest.fn((levels) => levels);
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
