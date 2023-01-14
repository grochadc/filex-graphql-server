import { GradesAPI } from "../index";

import * as dotenv from "dotenv";
dotenv.config({
  path: ".env.test",
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.DOTENV_ENV !== "test") {
  console.log("Init prisma with url", process.env.HEROKU_POSTGRESQL_TEAL_URL);
  throw new Error(
    `Careful! If this script runs with a production db string reservations will be erased at the end!!/nCheck the file .env.test is being read by Jest instead of .env`
  );
}

const gradesAPI = new GradesAPI(prisma);

test("works", async () => {
  const data = await gradesAPI.postGrades(
    [
      { codigo: "1234567890", finalGrade: "100", situacion: "A" },
      { codigo: "0987654321", finalGrade: "90", situacion: "A" },
    ],
    "2022B",
    "en"
  );
  expect(data).toBeDefined();
  expect(data).toMatchSnapshot();
  console.log("data", data);
});

test("crashes as expected", async () => {
  await expect(
    gradesAPI.postGrades(
      [{ codigo: "1234509876", finalGrade: "60", situacion: "NA" }],
      "2022B",
      "en"
    )
  ).rejects.toThrow('Record to update not found.');
});
