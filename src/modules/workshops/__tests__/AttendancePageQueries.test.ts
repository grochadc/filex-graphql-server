import { expect, it, jest, test } from "@jest/globals";

import { WorkshopsAPI } from "../../../datasources";
jest.mock("../../../datasources");

import testServer from "../../../testUtils/testServer";
import { gql } from "apollo-server";
import prisma from "../../../datasources/testutils/prisma/client";

import getTeacherOptionsPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getTeacherOptionsPrismaMock";
import getTeacherReservationsPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getTeacherReservationsPrismaMock";
import getReservationsByOptionIdPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getReservationsByOptionIdPrismaMock";

const workshopsAPI = new WorkshopsAPI(prisma);

let server: ReturnType<typeof testServer>;
beforeAll(() => {
  server = testServer(() => {
    return {
      workshopsAPI,
    };
  });
});

test("gets attendance list", async () => {
  //@ts-ignore
  workshopsAPI.getTeacher.mockResolvedValue({
    id: 1,
    nombre: "Gonzalo Rocha",
  });
  //@ts-ignore
  workshopsAPI.getTeacherOptions.mockResolvedValue(getTeacherOptionsPrismaMock);
  //@ts-ignore
  workshopsAPI.getTeacherReservations.mockResolvedValue(
    getTeacherReservationsPrismaMock
  );

  const result = await server.query({
    query: gql`
      query attendance($teacher_id: ID!) {
        teacher(id: $teacher_id) {
          id
          nombre
          options {
            id
            day
            time
            url
            workshop {
              name
              id
            }
            reservations {
              id
              student {
                codigo
                nombre
                apellido_paterno
                apellido_materno
                email
                telefono
                nivel
                grupo
              }
              tutorialReason
              attended
            }
          }
        }
      }
    `,
    variables: { teacher_id: "t_1" },
  });

  expect(WorkshopsAPI).toHaveBeenCalled();
  expect(workshopsAPI.getTeacher).toHaveBeenCalled();
  expect(workshopsAPI.getTeacherOptions).toHaveBeenCalled();
  expect(workshopsAPI.getTeacherReservations).toHaveBeenCalled();
  expect(result.errors).toBeUndefined();
  expect(result.data.teacher.options[0].id).toBe("opt_1");
  expect(result.data).toMatchSnapshot();
});

test("gets attendance list by option", async () => {
  //@ts-ignore
  workshopsAPI.getReservationsByOptionId.mockResolvedValue(
    getReservationsByOptionIdPrismaMock
  );

  const result = await server.query({
    query: gql`
      query getReservations($optionId: ID!) {
        reservations(optionId: $optionId) {
          id
          attended
          student {
            codigo
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
            nivel
            grupo
          }
        }
      }
    `,
    variables: { optionId: "opt_1" },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.reservations[0].id).toBe("res_1");
  expect(result.data).toMatchSnapshot();
  expect(workshopsAPI.getReservationsByOptionId).toHaveBeenCalledWith(1);
});

test("saves attendance correctly", async () => {
  //@ts-ignore
  workshopsAPI.saveAttendance.mockResolvedValue(true);

  const attendingStudents = [
    { id: "res_1", attended: true },
    { id: "res_2", attended: false },
  ];

  const result = await server.query({
    query: gql`
      mutation saveAttendance($attendingStudents: [ReservationInput!]!) {
        saveWorkshopsAttendance(attendingStudents: $attendingStudents)
      }
    `,
    variables: { attendingStudents },
  });

  console.log(JSON.stringify(result.errors, null, 2));
  expect(result.errors).toBeUndefined();
  expect(workshopsAPI.saveAttendance).toHaveBeenCalledWith([
    { id: 1, attended: true },
    { id: 2, attended: false },
  ]);
  expect(result.data.saveWorkshopsAttendance).toBe(true);
});
