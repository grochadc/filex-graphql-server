import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    database(ref: String!): String
  }

  extend type Mutation {
    databaseSet(input: firebaseInput): Int!
  }

  input firebaseInput {
    ref: String!
    data: [String]!
  }
`;

const resolvers = {
  Query: {
    database: async (
      root,
      args: { ref: string },
      context: { dataSources: { firebaseClient: { get: (arg0: any) => any } } }
    ) => {
      const data = await context.dataSources.firebaseClient.get(args.ref);
      return JSON.stringify(data);
    },
  },
  Mutation: {
    databaseSet: async (root, args, context) => {
      try {
        await context.dataSources.firebaseClient.post(
          args.input.ref,
          args.input.data
        );
        return 200;
      } catch (e) {
        return 400;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
