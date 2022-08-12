import testServer from "../testUtils/testServer";
import { PlacementAPI } from "../datasources";
import { gql } from "apollo-server";
import { Filter } from "../generated/graphql";
import { PrismaClient } from "@prisma/client";
import Carousel from "../utils/Carousel";

describe("PlacementAPI Datasource", () => {
  let prisma;
  beforeAll(() => {
    prisma = new PrismaClient();
    //@ts-ignore
    prisma.testResults.update = jest.fn(Promise.resolve);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("saves written results", async () => {
    prisma.testResults.create = jest.fn(() => {
      return Promise.resolve({ id: 1 });
    });

    const placementDatasource = new PlacementAPI(prisma);

    placementDatasource.getMeetLinks = jest.fn(() => {
      return Promise.resolve([
        { id: "1", link: "meetLink", teacher: "gonzo", active: true },
      ]);
    });

    const server = testServer(
      () => ({
        placementAPI: placementDatasource,
      }),
      () => ({
        carousel: new Carousel(),
      })
    );

    const res = await server.mutate({
      mutation: gql`
        mutation PostResults(
          $codigo: String!
          $nombre: String!
          $apellido_paterno: String!
          $apellido_materno: String!
          $genero: String!
          $ciclo: String!
          $carrera: String!
          $telefono: String!
          $email: String!
          $institucionalEmail: String
          $externo: Boolean!
          $reubicacion: Boolean!
          $nivel_escrito: Int!
          $curso: String!
        ) {
          saveWrittenResults(
            input: {
              codigo: $codigo
              nombre: $nombre
              apellidoPaterno: $apellido_paterno
              apellidoMaterno: $apellido_materno
              genero: $genero
              ciclo: $ciclo
              carrera: $carrera
              telefono: $telefono
              email: $email
              institucionalEmail: $institucionalEmail
              externo: $externo
              reubicacion: $reubicacion
              nivelEscrito: $nivel_escrito
              curso: $curso
            }
          ) {
            id
            meetLink
          }
        }
      `,
      variables: {
        codigo: "1234567890",
        nombre: "Benito Antonio",
        apellido_paterno: "Martinez",
        apellido_materno: "Ocasio",
        genero: "M",
        ciclo: "2022A",
        carrera: "Abogado",
        telefono: "3121234567",
        email: "bad@bunny.pr",
        institucionalEmail: "benito.om@alumnos.cusur.udg.mx",
        externo: false,
        reubicacion: false,
        nivel_escrito: 4,
        curso: "en",
      },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data).toEqual({
      saveWrittenResults: { id: "1", meetLink: "meetLink" },
    });
    expect(prisma.testResults.create).toBeCalled();
  });

  test("calls prisma update on updateFinalResults", async () => {
    const server = testServer(() => ({
      placementAPI: new PlacementAPI(prisma),
    }));

    const res = await server.mutate({
      mutation: gql`
        mutation updateFinalResults(
          $id: ID!
          $nivelOral: Int!
          $nivelFinal: Int!
        ) {
          saveOralResults(
            input: { id: $id, nivelOral: $nivelOral, nivelFinal: $nivelFinal }
          )
        }
      `,
      variables: {
        id: 1,
        nivelOral: 4,
        nivelFinal: 4,
      },
    });
    expect(res.errors).toBeUndefined();
    expect(res.data).toEqual({ saveOralResults: true });
    expect(prisma.testResults.update).toBeCalledWith({
      where: { id: 1 },
      data: { nivelOral: 4, nivelFinal: 4 },
    });
    //close-test-update
  });

  it("gets unfiltered test results", async () => {
    prisma.testResults.findMany = jest.fn(() => {
      return Promise.resolve([
        { codigo: "1234567890", nombre: "Benito Antonio", nivelEscrito: 4 },
        {
          codigo: "0987654321",
          nombre: "Alberto",
          nivelEscrito: 4,
          nivelOral: 4,
          nivelFinal: 4,
        },
      ]);
    });

    const server = testServer(() => {
      return { placementAPI: new PlacementAPI(prisma) };
    });

    const res = await server.query({
      query: gql`
        query getTestResults {
          testResults {
            codigo
            nombre
            nivelEscrito
            nivelOral
            nivelFinal
          }
        }
      `,
    });

    expect(res.errors).toBeUndefined();
    expect(prisma.testResults.findMany).toHaveBeenCalled();
    expect(res.data).toMatchSnapshot();
  });

  it("gets nonassigned filtered results", async () => {
    prisma.testResults.findMany = jest.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          codigo: "1234567890",
          nombre: "Benito Antonio",
          apellidoPaterno: "Martinez",
          apellidoMaterno: "Ocasio",
          genero: "M",
          ciclo: "2022A",
          carrera: "Abogado",
          telefono: "34121234567",
          email: "bad@bunny.pr",
          institucionalEmail: null,
          curso: "en",
          externo: false,
          reubicacion: false,
          generated_id: "generated_id_1",
          meetLink: "meetLink1",
          nivelEscrito: 4,
        },
        {
          id: 2,
          codigo: "0987654321",
          nombre: "Alberto",
          apellidoPaterno: "Aguilera",
          apellidoMaterno: "Valadez",
          genero: "M",
          ciclo: "2022A",
          carrera: "Abogado",
          telefono: "34121234567",
          email: "juanga@elnoanoa.mx",
          institucionalEmail: null,
          curso: "en",
          externo: false,
          reubicacion: false,
          generated_id: "generated_id_2",
          meetLink: "meetLink2",
          nivelEscrito: 4,
        },
      ]);
    });

    const server = testServer(() => {
      return { placementAPI: new PlacementAPI(prisma) };
    });

    const res = await server.query({
      query: gql`
        query getTestResults($filter: Filter) {
          testResults(filter: $filter) {
            id
            codigo
            nombre
            apellidoPaterno
            apellidoMaterno
            genero
            ciclo
            carrera
            telefono
            email
            institutionalEmail
            curso
            externo
            reubicacion
            generated_id
            meetLink
            nivelEscrito
            nivelOral
            nivelFinal
          }
        }
      `,
      variables: {
        filter: Filter.Nonassigned,
      },
    });

    expect(res.errors).toBeUndefined();
    expect(prisma.testResults.findMany).toBeCalledWith({
      where: { nivelFinal: null },
    });
    expect(res.data).toMatchSnapshot();
  });

  it("gets assigned filtered results", async () => {
    prisma.testResults.findMany = jest.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          codigo: "1234567890",
          nombre: "Benito Antonio",
          apellidoPaterno: "Martinez",
          apellidoMaterno: "Ocasio",
          genero: "M",
          ciclo: "2022A",
          carrera: "Abogado",
          telefono: "34121234567",
          email: "bad@bunny.pr",
          institucionalEmail: null,
          curso: "en",
          externo: false,
          reubicacion: false,
          generated_id: "generated_id_1",
          meetLink: "meetLink1",
          nivelEscrito: 4,
          nivelOral: 4,
          nivelFinal: 4,
        },
        {
          id: 2,
          codigo: "0987654321",
          nombre: "Alberto",
          apellidoPaterno: "Aguilera",
          apellidoMaterno: "Valadez",
          genero: "M",
          ciclo: "2022A",
          carrera: "Abogado",
          telefono: "34121234567",
          email: "juanga@elnoanoa.mx",
          institucionalEmail: null,
          curso: "en",
          externo: false,
          reubicacion: false,
          generated_id: "generated_id_2",
          meetLink: "meetLink2",
          nivelEscrito: 4,
          nivelOral: 5,
          nivelFinal: 5,
        },
      ]);
    });

    const server = testServer(() => {
      return { placementAPI: new PlacementAPI(prisma) };
    });

    const res = await server.query({
      query: gql`
        query getTestResults($filter: Filter) {
          testResults(filter: $filter) {
            id
            codigo
            nombre
            apellidoPaterno
            apellidoMaterno
            genero
            ciclo
            carrera
            telefono
            email
            institutionalEmail
            curso
            externo
            reubicacion
            generated_id
            meetLink
            nivelEscrito
            nivelOral
            nivelFinal
          }
        }
      `,
      variables: {
        filter: Filter.Assigned,
      },
    });

    expect(res.errors).toBeUndefined();
    expect(prisma.testResults.findMany).toBeCalledWith({
      where: { nivelFinal: { not: null } },
    });
    expect(res.data).toMatchSnapshot();
  });
  //close-describe
});
