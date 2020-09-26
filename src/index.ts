import apollo from "apollo-server";
import db from "./db.js";
const { ApolloServer, gql } = apollo;

const typeDefs = gql`
  type Workshop {
    name: String
    description: String
  }

  type Option {
    id: ID!
    teacher: String
    time: String
    day: String
    workshop: Workshop!
  }

  type Applicant {
    id: ID!
    code: String
    name: String
    option: Option!
  }

  type Query {
    workshops: [Workshop]
    options: [Option]
    option(id: ID!): Option
    applicants: [Applicant]
    applicant(id: ID!): Applicant
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    workshops: () => db.workshops,
    options: () => db.options,
    option: (_, args) =>
      db.options.filter((applicant) => {
        return applicant.id === args.id;
      })[0],
    applicants: () => db.applicants,
    applicant: (_, args) =>
      db.applicants.filter((applicant) => {
        return applicant.id === args.id;
      })[0],
  },
  Applicant: {
    option: (obj) => {
      return db.options.filter((option) => obj.option_id === option.id)[0];
    },
  },
  Option: {
    workshop: (obj) => {
      return db.workshops.filter((option) => obj.workshop_id === option.id)[0];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
