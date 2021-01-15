import { gql } from "apollo-server";
import db from "./db";

export const typeDefs = gql`
  extend type Query {
    section(course: String!, level: Int!): Section
  }

  type Section {
    questions: [Question]
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type Question {
    title: String!
    options: [Option]
  }

  type Option {
    text: String!
    correct: Boolean!
  }
`;

export const resolvers = {
  Query: {
    section: (_, { course, level }) => {
      return {
        questions: [...db.sections[level - 1].questions],
        pageInfo: {
          hasNextPage: Boolean(level < db.sections.length),
          hasPreviousPage: false,
        },
      };
    },
  },
};
