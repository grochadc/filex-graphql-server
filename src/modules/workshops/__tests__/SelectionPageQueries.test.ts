import { expect, test, jest } from "@jest/globals";
import { StudentsAPI } from "../../../datasources/StudentsAPI";
jest.mock("../../../datasources/StudentsAPI");
import { WorkshopsAPI } from "../../../datasources/WorkshopsAPI";
jest.mock("../../../datasources/WorkshopsAPI");

import getStudentReservationPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getStudentReservationPrismaMock";
import getStudentPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getStudentPrismaMock";
import makeReservationPrismaMock from "../../../dataSources/WorkshopsAPI/mocks/makeReservationPrismaMock";
//import getAllWorkshopsPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getAl"

import testServer from "../../../testUtils/testServer";
import { gql } from "apollo-server";
import prisma from "../../../datasources/testutils/prisma/client";

const workshopsAPI = new WorkshopsAPI(prisma);
const studentsAPI = new StudentsAPI({} as any, prisma);

let server: ReturnType<typeof testServer>;

beforeEach(() => {
  server = testServer(() => ({
    workshopsAPI,
    studentsAPI,
  }));
});

test("gets selection info", async () => {
  //@ts-ignore
  workshopsAPI.isOpen.mockResolvedValue(true);
  //@ts-ignore
  studentsAPI.getStudent.mockResolvedValue(getStudentPrismaMock);
  //@ts-ignore
  workshopsAPI.getStudentReservation(getStudentReservationPrismaMock);
  //@ts-ignore
  workshopsAPI.getMaxStudentReservations.mockResolvedValue(30);
  //@ts-ignore
  workshopsAPI.getAllWorkshops.mockResolvedValue([{
    id: 1,
    name: "Conversation", 
    description: "Conversation club",
    levels: [1,2,3,4,5,6],
    options: [{}]
  }]);

  const result = await server.query({
    query: gql`
      query getSelectionInfo($code: ID!) {
        isWorkshopsOpen
        student(codigo: $code) {
          id
          codigo
          nombre
          nivel
          reservation {
            option {
              workshop {
                name
              }
              day
              time
              teacher {
                nombre
              }
              url
              isTutorial
            }
          }
        }
        workshops {
          id
          name
          description
          levels
          options {
            id
            day
            time
            teacher {
              nombre
            }
            url
            zoom_id
            available
            active
            isTutorial
          }
        }
      }
    `,
    variables: { code: "1234567890" },
  });

  expect(result.errors).toBeUndefined();
});

describe("Making reservations", () => {
  test("makes a reservation on time", async () => {
    //@ts-ignore
    workshopsAPI.makeReservation.mockResolvedValue(makeReservationPrismaMock);
    //@ts-ignore
    workshopsAPI.getStudentReservation.mockResolvedValue(null);

    const result = await server.mutate({
      mutation: gql`
        mutation setReservation($student_id: ID!, $option_id: ID!) {
          makeWorkshopReservation(
            student_id: $student_id
            option_id: $option_id
          ) {
            option {
              day
              time
              teacher {
                nombre
              }
              workshop {
                name
              }
              url
            }
          }
        }
      `,
      variables: { student_id: 3, option_id: 1 },
    });

    expect(result.errors).toBeUndefined();
  });

  test("tries to make a reservation when one already exists", async () => {
    //@ts-ignore
    workshopsAPI.getStudentReservation.mockResolvedValue(getStudentReservationPrismaMock);

    const result = await server.mutate({
      mutation: gql`
        mutation setReservation($student_id: ID!, $option_id: ID!) {
          makeWorkshopReservation(
            student_id: $student_id
            option_id: $option_id
          ) {
            option {
              day
              time
              teacher {
                nombre
              }
              workshop {
                name
              }
              url
            }
          }
        }
      `,
      variables: { student_id: 3, option_id: 1 },
    });

    expect(result.errors).toBeDefined();
    if (result.errors) {
      expect(result.errors[0].extensions?.code).toBe("RESERVATION_FORBIDDEN");
    }
  });
});
