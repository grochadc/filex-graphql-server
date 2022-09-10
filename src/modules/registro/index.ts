import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";
import { ScheduleModel } from "./models";

export const typeDefs = gql`
  extend type Query {
    registeringLevels(course: String!, course: String!): [String!]!
    applicant(codigo: ID!): Applicant!
    schedule(id: String!): Schedule!
  }

  extend type Mutation {
    registerStudent(input: StudentInput!): RegisterResponse!
    saveRegisteringLevels(levels: [String!]!, course: String!): [String!]!
    saveApplicant(codigo: String!, input: ApplicantInput!): ApplicantResponse!
  }

  type Applicant {
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
    registering: Boolean!
    schedules: [Schedule!]!
    registeredSchedule: Schedule
  }

  input ApplicantInput {
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

  type ApplicantResponse {
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

  type Schedule {
    group: String!
    teacher: String!
    entry: String!
    chat: String
    classroom: String
    sesiones: String
    time: String
    serialized(options: SerializedOptions!): String!
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
    schedule: Schedule!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    //TODO: type returns string[] but resolver should return Int[] (check in db what is the type for level)
    registeringLevels: (root, args, { dataSources }) =>
      dataSources.registroAPI.getLevelsRegistering(args.course),
    applicant: (root, args, { dataSources }) =>
      dataSources.registroAPI.getApplicant(args.codigo),
    schedule: (root, args, { dataSources }) => {
      //args.id is a group string eg. E1-1
      const group = args.id;
      const course = group.substr(0, 1) === "E" ? "en" : "fr";
      const level = group.substr(1, 1);
      return dataSources.registroAPI.getSchedule(level, group, course) as any;
    },
  },
  Mutation: {
    registerStudent: async (root, args, { dataSources }) => {
      const student = args.input;
      const registeredStudent = await dataSources.registroAPI.registerStudent(
        student,
        student.curso
      );
      return registeredStudent as any;
    },
    saveRegisteringLevels: (root, args, { dataSources }) => {
      return dataSources.registroAPI.setLevelsRegistering(
        args.levels,
        args.course
      );
    },
    saveApplicant: (root, args, { dataSources }) =>
      dataSources.registroAPI.saveApplicant(args.codigo, args.input),
  },
  Applicant: {
    registering: async (root, args, { dataSources }) => {
      const registeringLevels =
        await dataSources.registroAPI.getLevelsRegistering(root.curso);
      return registeringLevels.includes(root.nivel);
    },
    schedules: async (root, args, { dataSources }) => {
      const course = root.curso;
      const currentLevel = root.nivel;
      const maxStudents = 35;
      const unavailable = await dataSources.registroAPI.getUnAvailableGroups(
        currentLevel,
        maxStudents,
        course
      );
      const allSchedules = await dataSources.registroAPI.getSchedules(
        currentLevel,
        course
      );

      if (allSchedules === null)
        throw new Error("No schedule data for that level exists");

      function availableSchedules(
        schedules: ScheduleModel[],
        unavailable: string[]
      ) {
        return schedules.filter(
          (schedule) => !unavailable.includes(schedule.group)
        );
      }

      return availableSchedules(allSchedules, unavailable) as any;
    },
    registeredSchedule: async (root, args, { dataSources }) => {
      const registeredGroup =
        await dataSources.registroAPI.getAlreadyRegistered(root.codigo);
      if (registeredGroup) {
        return dataSources.registroAPI.getSchedule(
          root.nivel,
          registeredGroup,
          root.curso
        ) as any;
      }
      return null;
    },
  },
  Schedule: {
    serialized: (root, args) => {
      const serialize = (options: typeof args.options, source: typeof root) => {
        return `${options.group ? source.group : ""} ${
          options.teacher ? source.teacher : ""
        } ${options.time ? source.time : ""}`;
      };
      return serialize(args.options, root);
    },
  },
};
