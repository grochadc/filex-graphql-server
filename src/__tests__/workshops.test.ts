import testServer from "../testUtils/testServer";
import { WorkshopsAPI, StudentsAPI } from "../datasources";
import {
  GET_RESERVATIONS,
  GET_SELECTION_INFO,
  SET_RESERVATION,
} from "./__data__/queries";
import {
  reservations,
  options,
  student,
  workshopOption,
} from "./__data__/mocks";
import db from "../datasources/db";
import MockDate from "mockdate";
import * as utils from "../utils";

const { workshops } = db;

test("serves reservations and teacher info", async () => {
  const workshopsAPI = new WorkshopsAPI();
  workshopsAPI.getReservations = jest.fn((teacher_id: string) => {
    return Promise.resolve(reservations);
  });
  //workshopsAPI.getOptionsByTeacherId = jest.fn((teacher_id: string) => options);

  const { query } = testServer(() => ({ workshopsAPI }));
  const res = await query({
    query: GET_RESERVATIONS,
    variables: { teacher: "sergio" },
  });
  if (res.errors) console.log(res.errors);
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchSnapshot();

  expect(workshopsAPI.getReservations).toHaveBeenCalledWith("sergio");
  expect(workshopsAPI.getOptionsByTeacherId).toHaveBeenCalledWith("sergio");
});

test("serves info for selection page", async () => {
  const studentsAPI = new StudentsAPI();
  const workshopsAPI = new WorkshopsAPI();

  studentsAPI.getStudent = jest.fn(() => Promise.resolve(student));
  workshopsAPI.getWorkshops = jest.fn(() => workshops);

  const { query } = testServer(() => ({ studentsAPI, workshopsAPI }));
  const res = await query({
    query: GET_SELECTION_INFO,
    variables: { code: "1234567890" },
  });
  if (res.errors) console.log(res.errors);
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchSnapshot();

  expect(studentsAPI.getStudent).toHaveBeenCalledWith("1234567890");
  expect(workshopsAPI.getWorkshops).toHaveBeenCalled();
});

test("saves a reservation", async () => {
  const studentsAPI = new StudentsAPI();
  const workshopsAPI = new WorkshopsAPI();

  studentsAPI.getStudent = jest.fn(() => Promise.resolve(student));
  workshopsAPI.getOptionById = jest.fn((option_id: string) => workshopOption);
  const spy = jest.spyOn(utils, "generateId").mockReturnValueOnce("w924pj");
  MockDate.set("2000-11-22");

  const { mutate } = testServer(() => ({ studentsAPI, workshopsAPI }));

  const res = await mutate({
    query: SET_RESERVATION,
    variables: { codigo: "1234567890", option_id: "gonzalojueves" },
  });

  if (res.errors) console.log(res.errors);
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchSnapshot();

  expect(spy).toHaveBeenCalled();
  expect(studentsAPI.getStudent).toHaveBeenCalledWith("1234567890");
  expect(workshopsAPI.getOptionById).toHaveBeenCalledWith("gonzalojueves");
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchSnapshot();
});
