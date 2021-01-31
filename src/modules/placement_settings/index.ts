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
      try {
        const data = await dataSources.firebaseClient.get(
          "placement/meetLinks/"
        );
        return data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  },

  Mutation: {
    setMeetLinks: async (root, args, { dataSources }) => {
      try {
        await dataSources.firebaseClient.post(
          "placement/meetLinks/",
          args.links
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
