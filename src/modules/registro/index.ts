import { gql } from "apollo-server";

export interface Applicant {
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: string;
  curso: string;
  externo: boolean;
  nuevo_ingreso: boolean;
}
export interface Student {
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: string;
  curso: string;
  externo: boolean;
  nuevo_ingreso: boolean;
  grupo: string;
}

export interface RegisterResponse extends Student {
  schedule: {
    group: string;
    teacher: string;
    time?: string;
    serialized: string;
  };
}

export interface Schedule {
  group: string;
  teacher: string;
  time?: string;
  serialized: string;
}

export const typeDefs = gql`
  extend type Query {
    registeringLevel: [Int]!
    applicant(codigo: ID!): Applicant!
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
    schedules: [Schedule]!
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
    curso: String!
    externo: Boolean!
    nuevo_ingreso: Boolean!
    grupo: String!
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
    curso: String!
    externo: Boolean!
    nuevo_ingreso: Boolean!
    grupo: String!
    schedule: Schedule!
  }
`;

export const resolvers = {
  Query: {
    applicant: async (root, args, { dataSources }) => {
      const data: Promise<Applicant> = await dataSources.registroAPI.getApplicant(
        args.codigo
      );
      return data;
    },
    registeringLevel: (root, args, { dataSources }) =>
      dataSources.registroAPI.getLevelsRegistering(),
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
  Applicant: {
    schedules: async (root, args, { dataSources }) => {
      const currentLevel = root.nivel;
      const maxStudents = 25;
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
        allSchedules: Schedule[],
        unavailable: string[]
      ) {
        return allSchedules.filter((item) => !unavailable.includes(item.group));
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
};
