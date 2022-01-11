import { gql } from "apollo-server";
import { MeetLink } from "../../types/index";
import { Resolvers } from "../../generated/graphql";

const typeDefs = gql`
  extend type Query {
    meetLinks: [meetLink!]!
  }

  type meetLink {
    id: ID!
    teacher: String!
    link: String!
    active: Boolean!
  }

  extend type Mutation {
    setMeetLinks(links: [MeetLinkInput!]!): Int!
    setMeetLink(link: MeetLinkInputWithID!): Int!
    removeMeetLink(link: MeetLinkInputWithID!): Int!
    setPlacementHomePageMessage(input: PlacementHomePageMessageInput!): Boolean!
  }

  input PlacementHomePageMessageInput {
    message: String!
    active: Boolean!
  }

  input MeetLinkInput {
    id: ID
    teacher: String!
    link: String!
    active: Boolean!
  }

  input MeetLinkInputWithID {
    id: ID!
    teacher: String!
    link: String!
    active: Boolean!
  }
`;

const resolvers: Resolvers = {
  Query: {
    meetLinks: async (root, args, { dataSources, enviroment }) =>
      dataSources.placementAPI.getMeetLinks(enviroment),
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
      await dataSources.placementAPI.saveSingleMeetLink(link, enviroment);
      return 200;
    },
    removeMeetLink: async (
      root,
      { link }: { link: MeetLink },
      { dataSources, enviroment }
    ) => {
      await dataSources.placementAPI.removeMeetLink(link, enviroment);
      return 200;
    },
    setPlacementHomePageMessage: (root, args, { dataSources }) => {
      return dataSources.placementAPI.setPlacementHomePageMessage(args.input);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
