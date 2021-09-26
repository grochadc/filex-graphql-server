import DatabaseAPI from "./index";
import mocks from "./mocks";

const database = new DatabaseAPI(mocks.db);

test("getTeacher", async () => {
  const res = await database.getTeacher("4");
  expect(res).toMatchSnapshot();
});

test("works", async () => {
  const workshops = await database.getAllWorkshops(30);
  expect(workshops).toHaveLength(1);
});
