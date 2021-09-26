import { StudentsAPI } from "../index";
import mocks, { students } from "./mocks";

const api = new StudentsAPI(mocks.db);

test("gets a student", async () => {
  const result = await api.getStudent("0987654321");
  expect(result).toMatchSnapshot();
});
test("gets an inexistent student", async () => {
  const result = api.getStudent("1234509876");
  await expect(result).rejects.toThrow();
});
test("adds a student", async () => {
  const result = await api.addStudent(students[0]);
  expect(result).toMatchSnapshot();
});

test("edits a student", async () => {
  const result = await api.editStudent("0987654321", { carrera: "Periodismo" });
  expect(result).toMatchSnapshot();
});
