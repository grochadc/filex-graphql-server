import { gql } from "apollo-server";
const utils = require("../../utils");

export const typeDefs = gql`
  extend type Query {
    teacher(id: ID!): Teacher!
    student(codigo: ID!): Student!
    workshops: [Workshop]!
  }

  type Teacher {
    id: ID!
    name: String!
    options: [WorkshopOption]!
    reservations: [Reservation]!
  }

  type WorkshopOption {
    time: String!
    day: String!
    workshop: String!
  }

  type Reservation {
    id: ID!
    code: String!
    name: String!
    first_last_name: String!
    second_last_name: String!
    level: Int!
    group: String!
    timestamp: String!
    option: ReservationOption!
    option_id: String!
    url: String!
    zoom_id: String
  }

  type ReservationOption {
    id: ID!
    teacher: String!
    time: String!
    day: String!
    url: String!
    zoom_id: String
    workshop: String!
    available: Boolean!
  }

  type Student {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    genero: String!
    carrera: String!
    ciclo: String!
    telefono: String!
    email: String!
    nivel: String!
    curso: String!
    externo: Boolean!
    grupo: String!
  }

  type Workshop {
    name: String!
    description: String!
    levels: [String!]
    options: [Option!]
  }

  type Option {
    id: ID!
    day: String!
    time: String!
    teacher: String!
    workshop: String!
    url: String!
    zoom_id: String
    available: Boolean!
  }

  extend type Mutation {
    makeReservation(input: ReservationInput!): ReturnedReservation!
  }

  input ReservationInput {
    codigo: ID!
    option_id: ID!
  }

  type ReturnedReservation {
    id: ID!
    timestamp: String!
    codigo: ID!
    nombre: String!
    url: String!
    zoom_id: String
  }
`;

export const resolvers = {
  Teacher: {
    reservations: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getReservations(root.id);
    },
    options: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getOptionsByTeacherId(root.id);
    },
  },
  Reservation: {
    option: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getOption(root.option_id);
    },
  },
  Query: {
    teacher: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getTeacher(args.id);
    },
    student: (root, args, { dataSources }) => {
      return dataSources.studentsAPI.getStudent(args.codigo);
    },
    workshops: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getWorkshops();
    },
  },
  Mutation: {
    makeReservation: async (root, { input }, { dataSources }) => {
      const date = new Date();
      const student = await dataSources.studentsAPI.getStudent(input.codigo);
      const option = dataSources.workshopsAPI.getOptionById(input.option_id);
      return {
        id: utils.generateId(),
        timestamp: date.toJSON(),
        codigo: student.codigo,
        nombre: student.nombre,
        url: option.url,
        zoom_id: option.zoom_id ? option.zoom_id : null,
      };
    },
  },
};
