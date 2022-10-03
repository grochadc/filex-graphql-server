import { expect, test, jest } from "@jest/globals";
import gql from "graphql-tag";

//Import dataSources to mock them in tests
import { StudentsAPI } from "../../../datasources/StudentsAPI";
jest.mock("../../../datasources/StudentsAPI");
import { WorkshopsAPI } from "../../../datasources/WorkshopsAPI";
jest.mock("../../../datasources/WorkshopsAPI");

import testServer from "../../../testUtils/testServer";

import getReservationsByOptionIdPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getReservationsByOptionIdPrismaMock";

import prisma from "../../../datasources/testutils/prisma/client";

const workshopsAPI = new WorkshopsAPI(prisma);

let server: ReturnType<typeof testServer>;
beforeAll(() => {
  server = testServer(() => ({ workshopsAPI }));
});

test("gets an attendance table by using an optionId", async () => {
  //@ts-ignore
  workshopsAPI.getReservationsByOptionId.mockResolvedValue(getReservationsByOptionIdPrismaMock);

  const result = await server.query({
    query: gql`
      query fetchReservationsByOptionId($optionId: ID!) {
        reservations(optionId: $optionId) {
          id
          student {
            id
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
    `,
    variables: { optionId: "opt_1" },
  });

  expect(result.errors).toBeUndefined();
  expect(workshopsAPI.getReservationsByOptionId).toHaveBeenCalledWith(1);
  const { reservations } = result.data;
  expect(reservations[0].id).toBe("res_1");
  expect(reservations[0].student.id).toBe("st_2");
  expect(reservations).toMatchSnapshot();

});
