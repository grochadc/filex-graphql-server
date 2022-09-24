import { expect, jest, test } from "@jest/globals";
import { WorkshopsAPI } from "../../../datasources/WorkshopsAPI";
jest.mock("../../../datasources/WorkshopsAPI");

import testServer from "../../../testUtils/testServer";
import { gql } from "apollo-server";
import prisma from "../../../datasources/testutils/prisma/client";
import getReservationsByOptionIdPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getReservationsByOptionIdPrismaMock";

const workshopsAPI = new WorkshopsAPI(prisma);
let server: ReturnType<typeof testServer>;

beforeEach(() => {
  server = testServer(() => ({ workshopsAPI }));
});

test("reservations by optionId", async () => {
    //@ts-ignore
    workshopsAPI.getReservationsByOptionId.mockResolvedValue(getReservationsByOptionIdPrismaMock)
  const result = await server.query({
    query: gql`
      query getReservationById($optionId: ID!) {
        reservations(optionId: $optionId) {
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
    `, variables: { optionId: "1" }
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.reservations).toHaveLength(2);
  expect(result.data.reservations[0].student.grupo).toBe("E4-1");
  expect(result.data.reservations[0].student.codigo).toBe("0987654321");
  expect(result.data).toMatchSnapshot();
});
