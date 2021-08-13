import { gql } from "apollo-server";

import { MeetLink } from "../../types/index";

const typeDefs = gql`
  extend type Query {
    meetLinks: [meetLink]!
  }

  type meetLink {
    id: ID!
    teacher: String!
    link: String!
    active: Boolean!
  }

  extend type Mutation {
    setMeetLinks(links: [MeetLinkInput]!): Int
    setMeetLink(link: MeetLinkInput!): Int
  }

  input MeetLinkInput {
    id: ID
    teacher: String!
    link: String!
    active: Boolean!
  }
`;

const resolvers = {
  Query: {
    meetLinks: async (root, args, { dataSources, enviroment }) => {
      return dataSources.placementAPI.getMeetLinks(enviroment);
    },
  },

  Mutation: {
    setMeetLinks: async (root, args, { dataSources, enviroment }) => {
      try {
        await dataSources.placementAPI.saveMeetLinks(args.links, enviroment);
        return 200;
      } catch (e) {
        console.log(e.extensions.response.body);
        return 400;
      }
    },
    setMeetLink: async (
      root,
      { link }: { link: MeetLink },
      { dataSources, enviroment }
    ): Promise<number> => {
      console.log("Got link", link);
      await dataSources.placementAPI.saveSingleMeetLink(link, enviroment);
      return 200;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
