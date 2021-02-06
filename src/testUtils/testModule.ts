import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    database(ref: String!): String!
  }
`;

const resolvers = {
  Query: {
    database: async (root, args, { dataSources }) => {
      dataSources.firebaseAPI.getRef(args.ref);
      return "somelaunch";
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
