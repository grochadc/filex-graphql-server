import { sortStudents } from "./index";

it("works", () => {
  const students = [{ nombre: "Benito" }, { nombre: "Adrian" }];
  expect(sortStudents(students)).toEqual([
    { nombre: "Adrian" },
    { nombre: "Benito" }
  ]);
});
