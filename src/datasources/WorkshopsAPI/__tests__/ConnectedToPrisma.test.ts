//import prisma from '../../testutils/prisma/client';
import { WorkshopsAPI } from "../../WorkshopsAPI";
import { StudentsAPI } from "../../StudentsAPI";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env.test",
});
import * as fs from "fs/promises";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

if (process.env.DOTENV_ENV !== "test") {
  console.log("Init prisma with url", process.env.HEROKU_POSTGRESQL_TEAL_URL);
  throw new Error(
    `Careful! If this script runs with a production db string reservations will be erased at the end!!/nCheck the file .env.test is being read by Jest instead of .env`
  );
}

const GENERATE_MOCKS = false;
const MOCKS_PATH = "../mocks";
function writeMock(filename: string, data: any) {
  fs.writeFile(
    path.join(__dirname, MOCKS_PATH, filename + ".js"),
    `module.exports = ${JSON.stringify(data, null, 2)};`
  )
    .then(() => console.log(`${filename} file written!`))
    .catch((e) => console.error(e));
}
if (GENERATE_MOCKS) console.log("Generating Mocks using Prisma Connection");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.HEROKU_POSTGRESQL_TEAL_URL,
    },
  },
});

const workshopsAPI = new WorkshopsAPI(prisma);
const studentsAPI = new StudentsAPI({} as any, prisma);

workshopsAPI.getOpenDate = jest.fn(() => {
  const openDate = new Date(2021, 8, 12);
  return Promise.resolve(openDate.toISOString());
});

test("gets a student with applicant info", async () => {
  const student = await studentsAPI.getStudent("1234567890", "2022B");
  expect(student.ciclo_actual).toBe("2022B");
  expect(student.codigo).toBe("1234567890");
  expect(student).toMatchSnapshot();

  if (GENERATE_MOCKS) {
    writeMock("getStudentPrismaMock", student);
  }
});

test("makes a reservation", async () => {
  workshopsAPI.getTodaysDate = jest.fn(() => new Date(2022, 8, 13));
  const studentId = "3";
  const optionId = "1";

  const reservation = await workshopsAPI.makeReservation(studentId, optionId);
  expect(reservation).toBeDefined();
  expect(reservation.option_id).toBe(1);
  expect(reservation.student.id).toBe(3);
  expect(reservation).toMatchSnapshot();

  if (GENERATE_MOCKS) {
    writeMock("makeReservationPrismaMock", reservation);
  }

  const studentReservation = await prisma.workshopReservation.findFirst({
    where: {
      student_id: Number(studentId),
      create_time: {
        gt: new Date(2000, 1, 1),
      },
    },
  });
  expect(studentReservation).toBeDefined();
  expect(String(studentReservation?.id)).toBe(reservation.id);
});

test("gets a students reservation", async () => {
  await prisma.workshopReservation.create({
    data: {
      student_id: 3,
      option_id: 1,
      attended: false,
    },
  });

  const reservation = await workshopsAPI.getStudentReservation("3");
  expect(reservation).not.toBeNull();
  expect(reservation?.student.codigo).toBe("1234567890");
  expect(reservation?.option.day).toBe("Lunes");
  expect(reservation?.option.workshop.name).toBe("Conversation");
  expect(reservation?.option.teacher.nombre).toBe("Gonzalo Rocha");

  if (GENERATE_MOCKS) {
    writeMock("getStudentReservationPrismaMock", reservation);
  }
});

test("gets a teacher reservation list", async (teacherId = "1") => {
  workshopsAPI.getTodaysDate = jest.fn(() => {
    return new Date(2022, 9, 21);
  });
  await prisma.workshopReservation.create({
    data: {
      student_id: 3,
      option_id: 1,
    },
  });
  const options = await workshopsAPI.getTeacherOptions(teacherId);
  const reservations = await workshopsAPI.getTeacherReservations(
    Number(teacherId),
    options[0].id
  );

  expect(reservations[0].student.applicant.nombre).toBe("Benito Antonio");
  expect(reservations[0].student.id).toBe(3);
  expect(reservations[0].option.id).toBe(options[0].id);

  if (GENERATE_MOCKS) {
    writeMock("getTeacherOptionsPrismaMock", options);
    writeMock("getTeacherReservationsPrismaMock", reservations);
  }
});

test("gets a teacher option with all reservations for attendance", async () => {
  await prisma.workshopReservation.create({
    data: {
      student_id: 2,
      option_id: 1,
    },
  });

  await prisma.workshopReservation.create({
    data: {
      student_id: 3,
      option_id: 1,
    },
  });

  const attendanceList = await workshopsAPI.getTeacherReservations(1, 1);
  expect(attendanceList[0].student.id).toBe(2);
  expect(attendanceList[0].student.applicant.nombre).toBe("Alberto");
  expect(attendanceList[0].student.groupObject?.name).toBe("E4-1");
  expect(attendanceList[0].option.day).toBe("Lunes");
  expect(attendanceList[0].attended).toBe(false);
  expect(attendanceList).toMatchSnapshot();

  if (GENERATE_MOCKS) writeMock("getTeacherReservationsMock", attendanceList);
});

test("api.getTeacher", async () => {
  const teacher = await workshopsAPI.getTeacher("1");
  expect(teacher).toBeDefined();
  expect(teacher?.nombre).toBe("Gonzalo Rocha");

  if (GENERATE_MOCKS) writeMock("getTeacherPrismaMock", teacher);
});

test("get all workshops", async () => {
  const allWorkshops = await workshopsAPI.getAllWorkshops(30);
  expect(allWorkshops).toHaveLength(1);
  expect(allWorkshops[0].options).toHaveLength(1);
  expect(allWorkshops[0].options[0].teacher).toBeDefined();

  if (GENERATE_MOCKS) writeMock("getAllWorkshopsPrismaMock", allWorkshops);
});

test("gets all teachers", async () => {
  const allTeachers = await workshopsAPI.getAllTeachers();
  expect(allTeachers).toHaveLength(1);
  expect(allTeachers[0].nombre).toBe("Gonzalo Rocha");
  expect(allTeachers[0].options).toHaveLength(1);
  expect(allTeachers[0].options[0].workshop.name).toBe("Conversation");
  if (GENERATE_MOCKS) writeMock("getAllTeachersPrismaMock", allTeachers);
});

afterEach(async () => {
  await prisma.workshopReservation.deleteMany({});
  await prisma.$executeRaw`
        ALTER SEQUENCE workshop_reservation_id_seq RESTART WITH 1
    `;
});

afterAll(async () => {
  await prisma.$disconnect();
});
