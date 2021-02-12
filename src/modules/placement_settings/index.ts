import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    meetLinks: [String]!
  }

  extend type Mutation {
    setMeetLinks(links: [String]!): Int
  }
`;

const resolvers = {
  Query: {
    meetLinks: async (root, args, { dataSources }) => {
      const data = await dataSources.placementAPI.getMeetLinks();
      return data;
    },
  },

  Mutation: {
    setMeetLinks: async (root, args, { dataSources }) => {
      try {
        await dataSources.placementAPI.saveMeetLinks(args.links);
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
