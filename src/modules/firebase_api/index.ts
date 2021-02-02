import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    database(ref: String!): [String]
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
      context: { dataSources: { firebaseAPI: any } }
    ) => {
      return context.dataSources.firebaseAPI.getRef(args.ref);
    },
  },
  Mutation: {
    databaseSet: async (root, args, context) => {
      try {
        await context.dataSources.firebaseAPI.setRef(
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
