import { gql } from "apollo-server";
import { ApolloError } from "apollo-server-errors";
import * as utils from "../../utils";
import db, { Option } from "../../datasources/db";

export const typeDefs = gql`
  extend type Query {
    teacher(id: ID!): Teacher!
    student(codigo: ID!): Student!
    workshops: [Workshop]!
    getWorkshopsByCategory(category: String!): Workshop!
    studentReservation(codigo: ID!): StudentReservation
  }

  type StudentReservation {
    id: ID!
    teacher_id: ID!
    time: String
    day: String
    workshopName: String!
    teacher: String!
    url: String!
    zoom_id: String
  }

  type Teacher {
    id: ID!
    name: String!
    options: [WorkshopOption]!
    reservations: [Reservation]!
  }

  type WorkshopOption {
    id: ID!
    time: String!
    day: String!
    workshop: String!
    teacher_id: String!
    url: String
  }

  type Reservation {
    id: ID!
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    nivel: Int!
    grupo: String!
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
    option_ids: [String!]
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
    makeWorkshopReservation(input: ReservationInput!): ReturnedReservation!
    saveWorkshopsAttendance(
      input: [AttendingStudent!]
      workshop: SavedAttendanceWorkshopInfo!
    ): saveWorkshopsAttendanceResponse!
    resetReservations: Boolean!
    setWorkshopLink(
      option_id: String!
      teacher_id: String!
      link: String!
    ): Boolean!
  }

  input SavedAttendanceWorkshopInfo {
    teacher: String!
    option_id: String!
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
    teacher: String!
    time: String!
    day: String!
    url: String!
    zoom_id: String
    alreadyRegistered: Boolean!
  }
  input AttendingStudent {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String
    nivel: Int!
    grupo: String!
    workshop: String!
    teacher: String!
    attended: Boolean!
  }

  type saveWorkshopsAttendanceResponse {
    success: Boolean!
  }
`;

export const resolvers = {
  Teacher: {
    reservations: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getReservations(root.id);
    },
    options: async (root, args, { dataSources }) =>
      dataSources.workshopsAPI.getOptionsByTeacherId(root.id),
  },
  Reservation: {
    option: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getOption(root.option.id);
    },
  },
  Workshop: {
    options: async (root, args, { dataSources }) => {
      const optionsWithoutTeacherName = await dataSources.workshopsAPI.mapOptionIds(
        root.option_ids
      );
      const options = optionsWithoutTeacherName.map((option) => {
        return {
          ...option,
          teacher: utils.getById(db, "teachers", option.teacher_id, null).name,
        };
      });
      return options;
    },
  },
  Option: {
    workshop: (root, args, context) => {
      return utils.getById(db, "workshops", root.workshop_id, null).name;
    },
    available: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.getRegistering(root.id),
  },
  Query: {
    teacher: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getTeacher(args.id);
    },
    student: async (root, args, { dataSources }) => {
      const student = await dataSources.studentsAPI.getStudent(args.codigo);
      if (student === null)
        throw new ApolloError(
          "No se encontró ese codigo de alumno en la base de datos.",
          "STUDENT_NOT_FOUND"
        );
      return student;
    },
    workshops: (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getWorkshops();
    },
    getWorkshopsByCategory: (root, { category }, { dataSources }) =>
      dataSources.workshopsAPI.getWorkshopsByCategory(category),
    studentReservation: (root, args, { dataSources, enviroment }) =>
      dataSources.workshopsAPI.getStudentReservation(args.codigo, enviroment),
  },
  Mutation: {
    makeWorkshopReservation: async (
      root,
      { input },
      { dataSources, enviroment }
    ) => {
      console.log("Looking for student", input.codigo);
      const date = new Date();
      const student = await dataSources.studentsAPI.getStudent(
        input.codigo,
        enviroment
      );
      console.log("Found student", student);
      const option: Option = dataSources.workshopsAPI.getOptionById(
        input.option_id
      );
      const generatedID = utils.generateId();
      const timestamp = date.toJSON();
      const alreadyRegistered = await dataSources.workshopsAPI.getAlreadyRegistered(
        student.codigo,
        option.teacher_id,
        option.id
      );
      const workshopLink = await dataSources.workshopsAPI.getSingleWorkshopLink(
        option.teacher_id,
        option.id
      );
      const partialResponse = {
        id: generatedID,
        timestamp,
        codigo: student.codigo,
        nombre: student.nombre,
        teacher: option.teacher_id,
        time: option.time,
        day: option.day,
        url: workshopLink,
        zoom_id: option.zoom_id ? option.zoom_id : null,
      };

      if (alreadyRegistered)
        return {
          ...partialResponse,
          alreadyRegistered: true,
        };
      console.log("first time registering");
      await dataSources.workshopsAPI.makeReservation(
        option.teacher_id,
        option.id,
        { id: generatedID, ...student, timestamp, option },
        enviroment
      );
      return {
        ...partialResponse,
        alreadyRegistered: false,
      };
    },
    saveWorkshopsAttendance: (root, { input, workshop }, { dataSources }) => {
      dataSources.workshopsAPI.deleteReservations(
        workshop.teacher,
        workshop.option_id
      );
      dataSources.workshopsAPI.saveAttendance(input);
      return { success: true };
    },
    resetReservations: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.resetReservations(),
    setWorkshopLink: (root, { option_id, teacher_id, link }, { dataSources }) =>
      dataSources.workshopsAPI.setWorkshopLink(option_id, teacher_id, link),
  },
};
