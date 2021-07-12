import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    meetLinks: [meetLink]!
  }

  type meetLink {
    teacher: String!
    link: String!
    active: Boolean!
  }

  extend type Mutation {
    setMeetLinks(links: [MeetLinkInput]!): Int
  }

  input MeetLinkInput {
    teacher: String!
    link: String!
    active: Boolean!
  }
`;

const resolvers = {
  Query: {
    meetLinks: async (root, args, { dataSources }) => {
      return dataSources.placementAPI.getMeetLinks();
    },
  },

  Mutation: {
    setMeetLinks: async (root, args, { dataSources }) => {
      try {
        await dataSources.placementAPI.saveMeetLinks(args.links);
        return 200;
      } catch (e) {
        console.log(e.extensions.response.body);
        return 400;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
