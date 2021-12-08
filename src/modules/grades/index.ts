import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    grades(codigo: String!): Grades!
  }

  type Grades {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    midterm_grammar: String!
    midterm_oral: String!
    final_grammar: String!
    final_oral: String!
    workshops: String!
    cultural_task: String!
    mini_project: String!
    reading: String!
    listening: String!
    final: String!
    situation: String!
  }
`;

const resolvers = {
  Query: {
    grades: async (
      root,
      args: { codigo: string },
      context: { dataSources: { firebaseAPI: any } }
    ) => context.dataSources.firebaseAPI.getRef(`grades/${args.codigo}`)
  }
};

module.exports = {
  typeDefs,
  resolvers
};
