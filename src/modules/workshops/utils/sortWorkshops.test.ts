import { sortWorkshops } from "./index";

it("works", () => {
  const links = [
    { id: "7", day: "Martes", time: "13:00-14:00" },
    { id: "20", day: "Lunes", time: "11:00-12:00" },
    { id: "28", day: "Martes", time: "12:00-13:00" }
  ];
  expect(sortWorkshops(links)).toStrictEqual([
    { id: "20", day: "Lunes", time: "11:00-12:00" },
    { id: "28", day: "Martes", time: "12:00-13:00" },
    { id: "7", day: "Martes", time: "13:00-14:00" }
  ]);
});
