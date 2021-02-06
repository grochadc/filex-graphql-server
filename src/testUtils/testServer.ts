import {
  createTestClient,
  ApolloServerTestClient,
} from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server";

export default function testServer(dataSources: any): ApolloServerTestClient {
  return createTestClient(
    new ApolloServer({
      modules: [
        require("../modules/placement_exam"),
        require("../modules/placement_settings"),
        require("../modules/registro"),
      ],
      dataSources,
    })
  );
}
