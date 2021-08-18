import { gql } from "apollo-server";
import { ServerContext } from "../../server";
import {
  Applicant,
  MutationRegisterStudentArgs,
  MutationSaveRegisteringLevelsArgs,
  ScheduleSerializedArgs,
  Schedule
} from "./codegen.types";

export const typeDefs = gql`
  extend type Query {
    registeringLevels(course: String!, course: String!): [Int]!
    applicant(codigo: ID!): Applicant!
    schedule(id: String!): Schedule!
  }

  extend type Mutation {
    registerStudent(input: StudentInput): RegisterResponse!
    saveRegisteringLevels(levels: [String]!, course: String!): [String]!
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
    nivel: String!
    curso: String!
    externo: Boolean!
    registering: Boolean!
    schedules: [Schedule]!
    registeredSchedule: Schedule
  }

  type Schedule {
    group: String!
    teacher: String!
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
    curso: String!
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

export const resolvers = {
  Query: {
    //TODO: type returns string[] but resolver should return Int[] (check in db what is the type for level)
    registeringLevels: (
      root,
      args,
      { dataSources, enviroment }: ServerContext
    ) => dataSources.registroAPI.getLevelsRegistering(args.course, enviroment),
    applicant: (root, args, { dataSources, enviroment }: ServerContext) =>
      dataSources.registroAPI.getApplicant(args.codigo, enviroment),
    schedule: (root, args, { dataSources, enviroment }: ServerContext) => {
      //args.id is a group string eg. E1-1
      const group = args.id;
      const course = group.substr(0, 1) === "E" ? "en" : "fr";
      const level = group.substr(1, 1);
      return dataSources.registroAPI.getSchedule(
        level,
        group,
        course,
        enviroment
      );
    }
  },
  Mutation: {
    registerStudent: async (
      root,
      args: MutationRegisterStudentArgs,
      { dataSources, enviroment }: ServerContext
    ) => {
      const student = args.input;
      const registeredStudent = await dataSources.registroAPI.registerStudent(
        student,
        student.curso,
        enviroment
      );
      return registeredStudent;
    },
    saveRegisteringLevels: (
      root,
      args: MutationSaveRegisteringLevelsArgs,
      { dataSources, enviroment }: ServerContext
    ) => {
      return dataSources.registroAPI.setLevelsRegistering(
        args.levels,
        args.course,
        enviroment
      );
    }
  },
  Applicant: {
    registering: async (
      root: Applicant,
      args,
      { dataSources }: ServerContext
    ) => {
      const registeringLevels = await dataSources.registroAPI.getLevelsRegistering(
        root.curso
      );
      return registeringLevels.includes(root.nivel);
    },
    schedules: async (
      root: Applicant,
      args,
      { dataSources }: ServerContext
    ) => {
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
        schedules: Schedule[],
        unavailable: string[]
      ) {
        return schedules.filter(
          schedule => !unavailable.includes(schedule.group)
        );
      }

      return availableSchedules(allSchedules, unavailable);
    },
    registeredSchedule: async (
      root: Applicant,
      args,
      { dataSources, enviroment }: ServerContext
    ): Promise<Schedule | null> => {
      const registeredGroup = await dataSources.registroAPI.getAlreadyRegistered(
        root.codigo,
        enviroment
      );
      if (registeredGroup) {
        return dataSources.registroAPI.getSchedule(
          root.nivel,
          registeredGroup,
          root.curso,
          enviroment
        );
      }
      return null;
    }
  },
  Schedule: {
    serialized: (root: Schedule, args: ScheduleSerializedArgs) => {
      const serialize = (options: SerializeOptions, source: any) => {
        return `${options.group ? source.group : ""} ${
          options.teacher ? source.teacher : ""
        } ${options.time ? source.time : ""}`;
      };
      return serialize(args.options, root);
    }
  }
};
