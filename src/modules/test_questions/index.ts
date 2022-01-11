import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    section(course: String!, level: Int!): Section!
  }

  type Section {
    course: String!
    questions: [Question!]!
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type Question {
    title: String!
    options: [AnswerOption!]!
  }

  type AnswerOption {
    text: String!
    correct: Boolean!
  }
`;

export const resolvers = {
  Query: {
    section: (_, { course, level }, { dataSources }) => {
      const { questions, totalSections } = dataSources.examAPI.getSection(
        course,
        level,
      );
      return {
        course,
        questions,
        pageInfo: {
          hasNextPage: Boolean(level < totalSections),
          hasPreviousPage: false,
        },
      };
    },
  },
};
