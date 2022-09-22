import { expect, test, jest } from "@jest/globals";

import { WorkshopsAPI } from "../../../datasources/WorkshopsAPI";
jest.mock("../../../datasources/WorkshopsAPI");

import testServer from "../../../testUtils/testServer";
import { gql } from "apollo-server";

import prisma from "../../../datasources/testutils/prisma/client";
import getAllTeachersPrismaMock from "../../../datasources/WorkshopsAPI/mocks/getAllTeachersPrismaMock";

const workshopsAPI = new WorkshopsAPI(prisma);

let server: ReturnType<typeof testServer>;
beforeAll(() => {
  server = testServer(() => ({ workshopsAPI }));
});

test("resets reservations correctly", async () => {
  const today = new Date(2022, 9, 19);
  //@ts-ignore
  workshopsAPI.getTodaysDate.mockResolvedValue(today);
  //@ts-ignore
  workshopsAPI.resetReservations.mockResolvedValue(true);
  const result = await server.mutate({
    mutation: gql`
      mutation reset {
        resetReservations
      }
    `,
  });

  expect(result.errors).toBeUndefined();
  expect(workshopsAPI.resetReservations).toHaveBeenCalled();
});

test("gest the dashboard information", async () => {
  //@ts-ignore
  workshopsAPI.getAllTeachers.mockResolvedValue(getAllTeachersPrismaMock);
  //@ts-ignore
  workshopsAPI.isOpen.mockResolvedValue(true);
  //@ts-ignore
  workshopsAPI.toggleOpen.mockResolvedValue(false);
  const result = await server.query({
    query: gql`
      query settings {
        isWorkshopsOpen
        teachers {
          id
          nombre
        }
      }
    `,
  });

  expect(result.errors).toBeUndefined();
});

test("toggles workshopOpen", async () => {
  //@ts-ignore
  workshopsAPI.isOpen.mockResolvedValue(true);
  //@ts-ignore
  workshopsAPI.toggleOpen.mockResolvedValue(false);
  const result = await server.mutate({
    mutation: gql`
      mutation toggle {
        toggleOpenWorkshops
      }
    `,
  });

  expect(result.errors).toBeUndefined();
  expect(workshopsAPI.toggleOpen).toHaveBeenCalled();
  expect(result.data.toggleOpenWorkshops).toBe(false);
});
