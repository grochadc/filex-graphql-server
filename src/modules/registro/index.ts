import { gql } from "apollo-server";

export const typeDefs = gql`
  extend type Query {
    applicant(codigo: ID!): Applicant!
    registeringLevel: [Int]!
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
    nuevo_ingreso: Boolean!
  }

  type Schedule {
    group: String!
    teacher: String!
    time: String
    serialized: String!
  }

  extend type Mutation {
    registerStudent(input: StudentInput): RegisterResponse!
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
    registeringLevel: (root, args, { dataSources }) => {
      return dataSources.registroAPI.getLevelsRegistering();
    },
    schedules: async (root, args, { dataSources }) => {
      const currentLevel = args.level;
      const maxStudents = args.maxStudents | 25;
      const unavailable = await dataSources.registroAPI.getUnAvailableGroups(
        currentLevel,
        maxStudents
      );
      const allSchedules: Schedule[] = await dataSources.registroAPI.getSchedules(
        currentLevel
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
  Mutation: {
    registerStudent: async (root, args, { dataSources }) => {
      const student: Student = args.input;
      const registeredStudent: Promise<Student> = await dataSources.registroAPI.registerStudent(
        student,
        student.nivel,
        student.grupo
      );
      return registeredStudent;
    },
  },
  RegisterResponse: {
    schedule: async (root: RegisterResponse, args, { dataSources }) => {
      const schedule: Schedule = await dataSources.registroAPI.getSchedule(
        root.nivel,
        root.grupo
      );
      return schedule;
    },
  },
};
