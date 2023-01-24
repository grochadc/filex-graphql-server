import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";
import { serializeNumberId, deSeralizeNumberId } from "../../utils";

export const typeDefs = gql`
  extend type Query {
    applicant(codigo: ID!): Applicant!
    unenrolledStudent(codigo: ID!): UnenrolledStudent!
    registeringLevels(course: String!, course: String!): [String!]!
    groups: [Group!]!
    group(id: ID!): Group!
    masterlist(ciclo: String!): [EnrolledStudent!]!
  }

  extend type Mutation {
    registerStudent(input: StudentInput!, groupId: String!): RegisterResponse!
    saveRegisteringLevels(levels: [String!]!, course: String!): [String!]!
  }

  type UnenrolledStudent {
    codigo: ID!
    nombre: String!
    apellido_materno: String!
    apellido_paterno: String!
    genero: String!
    carrera: String!
    cicloIngreso: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    nivel: Int!
    curso: String!
    externo: Boolean!
    desertor: Boolean
    registering: Boolean!
    groups: [Group]!
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
    group: Group!
  }

  type Group {
    id: ID!
    ciclo: String!
    name: String!
    time: String!
    aula: String!
    teacher: String!
    message: String
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

  input StudentInput {
    codigo: ID!
    curso: String!
    nivel: Int!
    grupo: String!
    cicloActual: String!
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
`;

export const resolvers: Resolvers = {
  Query: {
    //TODO: type returns string[] but resolver should return Int[] (check in db what is the type for level)
    registeringLevels: (root, args, { dataSources }) =>
      dataSources.registroAPI.getLevelsRegistering(args.course),
    group: async (root, args, { dataSources }) => {
      const res = await dataSources.registroAPI.getSchedule(deSeralizeNumberId(args.id));
      return { ...res, teacher: res.teacher.nombre, id: serializeNumberId(res.id, 'group') };
    },
    unenrolledStudent: async (root, args, { dataSources }) => {
      const student = await dataSources.registroAPI.getUnenrolledStudent(args.codigo, "2023A");
      return {
        ...student,
        ...student.applicant
      }
    },
  },
  Mutation: {
    registerStudent: async (root, args, { dataSources }) => {
      const registeredStudent = await dataSources.registroAPI.registerStudent(
        args.input,
        deSeralizeNumberId(args.groupId)
      );

      const currentGroup = {
        ...registeredStudent.groupObject,
        id: serializeNumberId(registeredStudent.groupObject.id, 'grupo'),
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
  UnenrolledStudent: {
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
        maxStudents,
        root.ciclo_actual
      );
      return result.map((el) => ({ ...el, teacher: el.teacher.nombre, id: serializeNumberId(el.id, 'group'), }));
    },
    registeredGroup: async (root, args, { dataSources }) => {
      const res = await dataSources.registroAPI.getAlreadyRegistered(
        root.codigo,
        "2023A"
      );
      if(res==null) return null;
      return { ...res, teacher: res.teacher.nombre, id: serializeNumberId(res.id, 'group') };
    },
  },
};
