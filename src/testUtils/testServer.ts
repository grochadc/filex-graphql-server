import {
  createTestClient,
  ApolloServerTestClient
} from "apollo-server-testing";
import { ApolloServer } from "apollo-server";

export default function testServer(
  dataSources?: () => any,
  context?: () => any
): ApolloServerTestClient {
  return createTestClient(
    new ApolloServer({
      modules: [
        require("../modules/placement_exam"),
        require("../modules/placement_settings"),
        require("../modules/registro"),
        require("../modules/workshops"),
        require("../modules/test_questions")
      ],
      dataSources,
      context
    })
  );
}
