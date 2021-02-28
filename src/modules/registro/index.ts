import { gql } from "apollo-server";

export const typeDefs = gql`
  extend type Query {
    registeringLevels(course: String!, course: String!): [Int]!
    applicant(codigo: ID!): Applicant!
    availableSchedules(level: Int!, maxStudents: Int): [Schedule]!
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
  }

  type Schedule {
    group: String!
    teacher: String!
    time: String
    serialized(options: SerializedOptions!): String!
  }

  input SerializedOptions {
    group: Boolean
    teacher: Boolean
    time: Boolean
  }

  extend type Mutation {
    registerStudent(input: StudentInput): RegisterResponse!
    saveRegisteringLevels(levels: [Int]!, course: String!): [Int]!
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
    applicant: async (root, args, { dataSources }) => {
      const applicant: Promise<Applicant> = await dataSources.registroAPI.getApplicant(
        args.codigo
      );
      return applicant;
    },
    registeringLevels: (root, args, { dataSources }) =>
      dataSources.registroAPI.getLevelsRegistering(args.course),
  },
  Mutation: {
    registerStudent: async (root, args, { dataSources }) => {
      const student: Student = args.input;
      const registeredStudent: Promise<Student> = await dataSources.registroAPI.registerStudent(
        student,
        student.curso
      );
      return registeredStudent;
    },
    saveRegisteringLevels: (root, args, { dataSources }) => {
      return dataSources.registroAPI.setLevelsRegistering(
        args.levels,
        args.course
      );
    },
  },
  RegisterResponse: {
    schedule: async (root: RegisterResponse, args, { dataSources }) => {
      const schedule: Schedule = await dataSources.registroAPI.getSchedule(
        root.nivel,
        root.grupo,
        root.curso
      );
      return schedule;
    },
  },
  Applicant: {
    registering: async (root, args, { dataSources }) => {
      const registeringLevels = await dataSources.registroAPI.getLevelsRegistering(
        root.curso
      );
      return registeringLevels.includes(Number(root.nivel));
    },
    schedules: async (root, args, { dataSources }) => {
      const course = root.curso;
      const currentLevel = root.nivel;
      const maxStudents = 25;
      const unavailable = await dataSources.registroAPI.getUnAvailableGroups(
        currentLevel,
        maxStudents,
        course
      );
      const allSchedules: Schedule[] = await dataSources.registroAPI.getSchedules(
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
          (schedule) => !unavailable.includes(schedule.group)
        );
      }

      return availableSchedules(allSchedules, unavailable);
    },
  },
  Schedule: {
    serialized: (root, args, context) => {
      type SerializeOptions = {
        group?: boolean;
        teacher?: boolean;
        time?: boolean;
      };
      const serialize = (options: SerializeOptions, source: any) => {
        return `${options.group ? source.group : ""} ${
          options.teacher ? source.teacher : ""
        } ${options.time ? source.time : ""}`;
      };
      return serialize(args.options, root);
    },
  },
};
