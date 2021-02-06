import { gql } from "apollo-server";
import testServer from "../testUtils/testServer";
const { RegistroAPI } = require("../datasources/registroAPI");
import { Student } from "../types";

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
      nuevo_ingreso
      schedules {
        group
        serialized
      }
    }
  }
`;

describe("Integration", () => {
  const applicantInfo = {
    code: "",
    nombre: "Iker",
    apellido_paterno: "Mamarre",
    apellido_materno: "Martinez",
    genero: "M",
    ciclo: "",
    carrera: "",
    telefono: "3411234567",
    email: "m@marre.com",
    externo: true,
    reubicacion: false,
    nivel_escrito: 4,
    curso: "en",
  };

  it("Returns an applicant by codigo ", async () => {
    const registroAPI = new RegistroAPI();
    registroAPI.getApplicant = jest.fn((codigo) => applicantInfo);
    const { query } = testServer(() => ({ registroAPI }));
    const res = await query({
      query: GET_APPLICANT,
      variables: { codigo: "1234567890" },
    });
    expect(registroAPI.getApplicant).toHaveBeenCalledWith("1234567890");
  });

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
      $nuevo_ingreso: Boolean!
      $grupo: String!
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
          nuevo_ingreso: $nuevo_ingreso
          grupo: $grupo
        }
      ) {
        nombre
        schedule {
          group
          teacher
          time
        }
      }
    }
  `;

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
    nuevo_ingreso: false,
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
    expect(registroAPI.registerStudent).toHaveBeenCalled();
  });
});

describe("E2E", () => {
  const GET_LEVELS_REGISTERING = gql`
    query {
      registeringLevel
    }
  `;
  it("Gets the levels that are registering", async () => {
    const registroAPI = new RegistroAPI();
    const { mutate } = testServer(() => ({ registroAPI }));
    const res = await mutate({
      mutation: GET_LEVELS_REGISTERING,
    });
    expect(res.data.registeringLevel).toMatchSnapshot();
  });
  it("gets an applicant by codigo", async () => {
    const registroAPI = new RegistroAPI();
    const { query } = testServer(() => ({ registroAPI }));
    const res = await query({
      query: GET_APPLICANT,
      variables: { codigo: "1234567890" },
    });
    expect(res.data.applicant).toEqual(
      expect.objectContaining({
        codigo: expect.any(String),
        nombre: expect.any(String),
        apellido_materno: expect.any(String),
        apellido_paterno: expect.any(String),
        genero: expect.any(String),
        carrera: expect.any(String),
        ciclo: expect.any(String),
        telefono: expect.any(String),
        email: expect.any(String),
        nivel: expect.any(String),
        curso: expect.any(String),
        externo: expect.any(Boolean),
        nuevo_ingreso: expect.any(Boolean),
        schedules: expect.arrayContaining([
          { group: expect.any(String), serialized: expect.any(String) },
        ]),
      })
    );
    return res;
  });
});
