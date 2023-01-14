import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const typeDefs = gql`
  extend type Query {
    registeringLevels(course: String!, course: String!): [String!]!
    unenrolledStudent(codigo: ID!): UnenrolledStudent!
    group(id: Int!): Group!
    groups: [Group!]!
  }

  extend type Mutation {
    registerStudent(input: StudentInput!, groupId: Int!): RegisterResponse!
    saveRegisteringLevels(levels: [String!]!, course: String!): [String!]!
  }

  type UnenrolledStudent {
    codigo: ID!
    nombre: String!
    apellido_materno: String!
    apellido_paterno: String!
    genero: String!
    carrera: String!
    ciclo: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    nivel: Int!
    curso: String!
    externo: Boolean!
    desertor: Boolean!
    registering: Boolean!
    groups: [Group!]!
    registeredGroup: Group
  }

  type EnrolledStudent {
    codigo: ID!
    nombre: String!
    apellido_materno: String!
    apellido_paterno: String!
    genero: String!
    carrera: String!
    ciclo: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    nivel: String!
    curso: String!
    externo: Boolean!
    desertor: Boolean!
  }

  type Group {
    id: Int!
    ciclo: String!
    name: String!
    time: String!
    aula: String!
    teacher: String!
  }

  input SerializedOptions {
    group: Boolean
    teacher: Boolean
    time: Boolean
  }

  type RegisterResponse {
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
    group: Group!
  }

  extend type Applicant {
    registering: Boolean!
    groups: [Group]!
    registeredGroup: Group
    curso: String!
    nivel: Int!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    //TODO: type returns string[] but resolver should return Int[] (check in db what is the type for level)
    registeringLevels: (root, args, { dataSources }) =>
      dataSources.registroAPI.getLevelsRegistering(args.course),
    //@ts-ignore
    applicant: (root, args, { dataSources }) =>
      dataSources.registroAPI.getApplicant(args.codigo, "2022B"),
    group: async (root, args, { dataSources }) => {
      const res = await dataSources.registroAPI.getSchedule(args.id);
      return { ...res, teacher: res.teacher.nombre };
    },
  },
  Mutation: {
    registerStudent: async (root, args, { dataSources }) => {
      const registeredStudent = await dataSources.registroAPI.registerStudent(
        args.input,
        args.groupId
      );
      const currentGroup = {
        ...registeredStudent.groupObject,
        teacher: registeredStudent.groupObject.teacher.nombre,
      };
      return {
        ...registeredStudent,
        ...registeredStudent.applicant,
        grupo: registeredStudent.groupObject.name,
        group: currentGroup,
        nivel: String(registeredStudent.nivel),
        ciclo: registeredStudent.ciclo_actual
      };
    },
    saveRegisteringLevels: (root, args, { dataSources }) => {
      return dataSources.registroAPI.setLevelsRegistering(
        args.levels,
        args.course
      );
    },
    /*saveApplicant: (root, args, { dataSources }) =>
      dataSources.registroAPI.saveApplicant(args.codigo, args.input),
      */
  },
  Applicant: {
    registering: async (root, args, { dataSources }) => {
      const registeringLevels =
        await dataSources.registroAPI.getLevelsRegistering(root.curso);
      return registeringLevels.includes(String(root.nivel));
    },
    groups: async (root, args, { dataSources }) => {
      const course = root.curso;
      const currentLevel = root.nivel;
      const maxStudents = 35;
      const result = await dataSources.registroAPI.getSchedules(
        currentLevel,
        course,
        maxStudents
      );
      return result.map((el) => ({ ...el, teacher: el.teacher.nombre }));
    },
    registeredGroup: async (root, args, { dataSources }) => {
      const res = await dataSources.registroAPI.getAlreadyRegistered(
        root.codigo,
        "2022B"
      );
      if(res==null) return null;
      return { ...res, teacher: res.teacher.nombre };
    },
  },
};
