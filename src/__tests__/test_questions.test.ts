import { gql } from "apollo-server";
import testServer from "../testUtils/testServer";
import { ExamAPI } from "../datasources/ExamAPI";
import { Student } from "../types";

const GET_TEST_SECTION = gql`
  query($course: String!, $level: Int!) {
    section(course: $course, level: $level) {
      questions {
        title
        options {
          text
          correct
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

describe("Integration", () => {
  it("gets English level 1 questions", async () => {
    const examAPI = new ExamAPI();
    const { query } = testServer(() => ({ examAPI }));
    const res = await query({
      query: GET_TEST_SECTION,
      variables: {
        course: "en",
        level: 1,
      },
    });
    if (res.errors) console.log(res.errors);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });
});
