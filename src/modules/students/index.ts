import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const typeDefs = gql`
  extend type Query {
    student(codigo: ID!): Student!
  }

  type Student {
    id: Int!
    codigo: ID!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    genero: String!
    carrera: String!
    ciclo: String!
    telefono: String!
    email: String!
    nivel: Int!
    curso: String!
    externo: Boolean!
    grupo: String!
  }

  extend type Mutation {
    addStudent(student: StudentInput!): Student!
    editStudent(codigo: ID!, changes: StudentChangesInput): Student!
  }

  input StudentInput {
    codigo: ID!
    nombre: String!
    apellido_materno: String!
    apellido_paterno: String!
    genero: String!
    carrera: String!
    ciclo: String!
    telefono: String!
    email: String!
    nivel: String!
    grupo: String!
    externo: Boolean!
    institucionalEmail: String
    curso: String!
  }

  input StudentChangesInput {
    codigo: String
    nombre: String
    apellido_paterno: String
    apellido_materno: String
    genero: String
    carrera: String
    ciclo: String
    telefono: String
    email: String
    nivel: String
    grupo: String
    externo: Boolean
    curso: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    student: async (root, args, { dataSources }) => {
      const res = await dataSources.studentsAPI.getStudent(
        args.codigo,
        "2022B"
      );
      return ({ 
        ...res,
        ciclo: res.ciclo_ingreso, 
        grupo: res.groupObject?.name,
      });
    },
  },
  Mutation: {
    //@ts-ignore
    addStudent: async (root, args, { dataSources }) => {
      const res = await dataSources.studentsAPI.addStudent(args.student);
      return {...res, reservationCount: 0, reservationLimit: 6, nivel: Number(res.nivel)};
    },
    editStudent: async (root, { codigo, changes }, { dataSources }) => {
      return dataSources.studentsAPI.editStudent(codigo, changes, "2022B");
    },
  },
};
