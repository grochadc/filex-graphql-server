import { StudentsAPI } from "../../StudentsAPI";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env.test",
});

import { PrismaClient } from "@prisma/client";


if (process.env.DOTENV_ENV !== "test") {
    console.log("Init prisma with url", process.env.HEROKU_POSTGRESQL_TEAL_URL);
    throw new Error(
      `Careful! If this script runs with a production db string reservations will be erased at the end!!/nCheck the file .env.test is being read by Jest instead of .env`
    );
}

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.HEROKU_POSTGRESQL_TEAL_URL,
      },
    },
});

const studentsAPI = new StudentsAPI({} as any, prisma);

test("works", async () => {
    const applicant = await studentsAPI.addApplicant({
        codigo: '1234509876',
        nombre: 'Miguel',
        apellido_paterno: 'Paramo',
        apellido_materno: 'San Juan',
        genero: 'M',
        carrera: 'MVZ',
        cicloIngreso: '2022A',
        telefono: '3412345678',
        email: 'miguel@lamedialuna.com',
        institucionalEmail: 'miguel.paramo@alumnos.udg.mx',
        externo: false
      })
    const result = await studentsAPI.addStudent({
        codigo: '1234509876',
        curso: 'en',
        cicloActual: '2022B',
        nivel: 4,
        grupo: 'E4-1',
    });

    expect(result).toBeDefined();
    console.log(result);
});