import { StudentsAPI } from "../index";
import mocks, { studentss, students, applicants } from "./mocks";
import { prismaMock } from "./testutils/singleton";

const api = new StudentsAPI(mocks.db, prismaMock);

test("gets a student", async () => {
  const mock = jest.spyOn(prismaMock.student, "findFirst");
  mock.mockResolvedValueOnce({
    ...students[0],
    applicant: applicants[0]
  } as any);

  const result = await api.getStudent("1234567890", "2022B");
  expect(prismaMock.student.findFirst).toHaveBeenCalledWith({
    include: {
      applicant: true,
      groupObject: true
    },
    where: {
      ciclo_actual: "2022B",
      codigo: "1234567890"
    }
  });
  expect(result).toMatchSnapshot();
});

test("gets an inexistent student", async () => {
  const result = api.getStudent("1234509876", "2022B");
  await expect(result).rejects.toThrow();
});
test("adds a student", async () => {
  const result = await api.addStudent(studentss[0]);
  expect(result).toMatchSnapshot();
});

test("edits a student", async () => {
  const result = await api.editStudent(
    "0987654321",
    { carrera: "Periodismo" },
    "2022B"
  );
  expect(result).toMatchSnapshot();
});
