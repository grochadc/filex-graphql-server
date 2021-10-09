import testServer from "testUtils/testServer";
import { gql } from "apollo-server";
import mocks from "datasources/DatabaseAPI/mocks";
import DatabaseAPI from "datasources/DatabaseAPI";

const databaseAPI = new DatabaseAPI(mocks.db);

const dataSources = () => {
  return {
    databaseAPI: databaseAPI
  };
};

const context = () => {
  return {
    enviroment: "prod"
  };
};

const { query } = testServer(dataSources, context);

test("teacher options are sorted", async () => {
  const GET_SORTED_OPTIONS = gql`
    query getSortedOptions($teacher_id: ID!) {
      teacher(id: $teacher_id) {
        options(sorted: true) {
          id
          day
          time
        }
      }
    }
  `;
  const res = await query({
    query: GET_SORTED_OPTIONS,
    variables: { teacher_id: 1 }
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.teacher.options).toEqual([
    { id: "22", day: "Martes", time: "13:00 - 14:00" },
    { id: "7", day: "Miercoles", time: "13:00 - 14:00" },
    { id: "8", day: "Jueves", time: "13:00 - 14:00" }
  ]);
  //expect(res.data).toMatchSnapshot();
});
