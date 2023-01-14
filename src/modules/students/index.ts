import { ApolloError, gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const typeDefs = gql`
  extend type Query {
    student(codigo: ID!): Student!
    applicant(codigo: ID!): Applicant!
    masterlist(ciclo: String!): [Student!]!
  }

  type Applicant {
    id: ID!
    codigo: ID!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    genero: String!
    carrera: String!
    cicloIngreso: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    externo: Boolean!
  }

  input ApplicantInput {
    codigo: ID!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    genero: String!
    carrera: String!
    cicloIngreso: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    externo: Boolean!
  }

  type Student {
    id: ID!
    nivel: Int!
    curso: String!
    desertor: Boolean
    cicloActual: String!
    grupo: String!
    applicant: Applicant!
    group: String!
    groupObject: Group!
  }

  extend type Mutation {
    saveApplicant(codigo: String!, input: ApplicantInput!): Applicant!
    editStudent(codigo: ID!, changes: StudentChangesInput): Student!
  }

  input StudentInput {
    codigo: ID!
    curso: String!
    nivel: Int!
    grupo: String!
    cicloActual: String!
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
      const student = await dataSources.studentsAPI.getStudent(
        args.codigo,
        "2022B"
      );
      if (student === null)
        throw new ApolloError("Student not found on database", "404");
      return {
        ...student,
        ...student.applicant,
        id: student.id,
        ciclo: student.applicant.cicloIngreso,
        grupo: student.groupObject?.name,
      };
    },
    masterlist: async (root, args, { dataSources }) => {
      return dataSources.studentsAPI.getAllStudents(args.ciclo);
    },
  },
  Student: {
    id: (student, args, context) => {
      const hashId = (id: number) => `st_${id}`;
      return hashId(student.id);
    },
    grupo: (student, args, context) => {
      //@ts-ignore
      return student.groupObject.name;
    },
  },
  Mutation: {
    //@ts-ignore
    addStudent: async (root, args, { dataSources }) => {
      const res = await dataSources.studentsAPI.addStudent(args.student);
      return {
        ...res,
        reservationCount: 0,
        reservationLimit: 6,
        nivel: Number(res.nivel),
      };
    },
    editStudent: async (root, { codigo, changes }, { dataSources }) => {
      return dataSources.studentsAPI.editStudent(codigo, changes, "2022B");
    },
    /*
    saveApplicant: async (root, args, context) => {
      return context.dataSources.studentsAPI
    },
    */
  },
};
