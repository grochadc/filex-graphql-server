import { expect, jest, test } from "@jest/globals";
import { StudentsAPI } from "../../../datasources/StudentsAPI";
jest.mock("../../../datasources/StudentsAPI");
import { WorkshopsAPI } from "../../../datasources/WorkshopsAPI";
jest.mock("../../../datasources/WorkshopsAPI");

import testServer from "../../../testUtils/testServer";
import { gql } from "apollo-server";
import getStudentReservationMock from "../../../datasources/WorkshopsAPI/mocks/getStudentReservationPrismaMock";
import getStudentMock from "../../../datasources/WorkshopsAPI/mocks/studentPrismaMock";
import prisma from "../../../datasources/testutils/prisma/client";

const studentsAPI = new StudentsAPI({} as any, prisma);
const workshopsAPI = new WorkshopsAPI(prisma);
let server: ReturnType<typeof testServer>;
beforeEach(() => {
  //@ts-ignore
  studentsAPI.getStudent.mockResolvedValue(getStudentMock);
  //@ts-ignore
  workshopsAPI.getStudentReservation.mockResolvedValue(
    getStudentReservationMock
  );
  //@ts-ignore
  workshopsAPI.getReservationCount.mockResolvedValue(0);
  //@ts-ignore
  workshopsAPI.getReservationLimit.mockResolvedValue(5);

  server = testServer(() => {
    return {
      studentsAPI,
      workshopsAPI,
    };
  });
});

describe("[Unit Tests] Gets a student", () => {
  it("full info", async () => {
    const result = await server.query({
      query: gql`
        query getStudent($codigo: ID!) {
          student(codigo: $codigo) {
            id
            codigo
            nombre
            apellido_paterno
            apellido_materno
            ciclo
            email
            telefono
            nivel
          }
        }
      `,
      variables: { codigo: "1234567890" },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.student.id).toBe(3);
    expect(result.data).toMatchSnapshot();
  });

  it("reservation", async () => {
    const result = await server.query({
      query: gql`
        query getStudentReservation($codigo: ID!) {
          student(codigo: $codigo) {
            reservation {
              option {
                workshop {
                  name
                }
                day
                time
                url
                teacher {
                  nombre
                }
              }
            }
          }
        }
      `,
      variables: { codigo: "1234567890" },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toMatchSnapshot();
  });

  it("reservationCount and reservationLimit", async () => {
    const result = await server.query({
      query: gql`
        query countStudentReservations($codigo: ID!) {
          student(codigo: $codigo) {
            reservationCount
            reservationLimit
          }
        }
      `,
      variables: { codigo: "1234567890" },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toMatchSnapshot();
  });
});

test("[Integration Test] gets a student profile", async () => {
  const result = await server.query({
    query: gql`
      query getStudentProfile($code: ID!) {
        student(codigo: $code) {
          id
          codigo
          nombre
          apellido_paterno
          apellido_materno
          email
          telefono
          nivel
          reservation {
            option {
              workshop {
                name
              }
              day
              time
              url
              teacher {
                nombre
              }
            }
          }
          reservationCount
          reservationLimit
        }
      }
    `,
    variables: { code: "1234567890" },
  });

  expect(WorkshopsAPI).toHaveBeenCalled();
  expect(workshopsAPI.getStudentReservation).toBeCalled();
  expect(workshopsAPI.getReservationCount).toHaveBeenCalled();
  expect(workshopsAPI.getReservationLimit).toHaveBeenCalled();
  expect(result.errors).toBeUndefined();
  expect(result.data).toMatchSnapshot();
});
