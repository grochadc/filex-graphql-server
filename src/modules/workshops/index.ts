import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";
import { sortWorkshops } from "./utils";

export const typeDefs = gql`
  extend type Query {
    paramQuery(param: String): Boolean
    options: [Option!]!
    workshops: [Workshop!]!
    teacher(id: ID!): Teacher!
    teachers: [Teacher!]!
    getWorkshopsByCategory(category: String!): Workshop!
    isWorkshopsOpen: Boolean!
  }

  type Workshop {
    id: ID!
    name: String!
    description: String!
    levels: [String!]!
    options: [Option!]!
  }

  type Option {
    id: ID!
    day: String!
    time: String!
    teacher_name: String!
    teacher_id: String!
    workshop_name: String!
    workshop_id: String!
    url: String!
    zoom_id: String
    isTutorial: Boolean!
    available: Boolean!
  }

  type StudentReservation {
    id: ID!
    day: String!
    time: String!
    teacher_name: String!
    teacher_id: ID!
    workshop_name: String!
    workshop_id: String!
    url: String!
    zoom_id: String
  }

  type TeacherOption {
    id: ID!
    day: String!
    time: String!
    teacher_name: String!
    teacher_id: String!
    workshop_name: String!
    workshop_id: String!
    url: String!
    zoom_id: String
    reservations: [Reservation!]
  }

  type Reservation {
    id: ID!
    workshop_id: String!
    workshop_name: String!
    option_id: String!
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    telefono: String!
    email: String!
    nivel: String!
    grupo: String!
    tutorial_reason: String
  }

  type Teacher {
    id: ID!
    name: String!
    options(sorted: Boolean): [TeacherOption!]!
  }

  extend type Student {
    reservation: StudentReservation
  }

  extend type Mutation {
    toggleOpenWorkshops: Boolean!

    makeWorkshopReservation(
      student_id: ID!
      option_id: ID!
      tutorial_reason: String
    ): StudentReservation!

    saveWorkshopsAttendance(
      input: [AttendingStudent!]!
      option_id: ID!
      teacher_id: ID!
    ): Boolean!

    resetReservations: Boolean!
    setWorkshopLink(option_id: ID!, url: String!): Boolean!
  }

  input AttendingStudent {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String
    nivel: String!
    grupo: String!
    workshop: String!
    teacher: String!
    attended: Boolean!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    isWorkshopsOpen: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.isOpen(),
    paramQuery: async (root, args, { dataSources }) => {
      return true;
    },
    options: async (option, args, { dataSources }) => {
      const max_students = await dataSources.workshopsAPI.getMaxStudentReservations();
      return dataSources.databaseAPI.getAllOptions(max_students);
    },
    workshops: async (root, args, { dataSources }) => {
      const max_students = await dataSources.workshopsAPI.getMaxStudentReservations();
      const allWorkshops = await dataSources.databaseAPI.getAllWorkshops(
        max_students
      );
      return allWorkshops;
    },
    teacher: async (root, args, { dataSources }) => {
      const teacher = await dataSources.databaseAPI.getTeacher(args.id);
      return teacher;
    },
    teachers: (root, args, { dataSources }) => {
      return dataSources.databaseAPI.getAllTeachers();
    }
  },
  Teacher: {
    options: (root, args, context) => {
      if (args.sorted) {
        //@ts-ignore
        return sortWorkshops(root.options);
      }
      //@ts-ignore
      return root.options;
    }
  },
  TeacherOption: {
    reservations: (teacherOption, args, { dataSources }) => {
      const result = dataSources.databaseAPI.getTeacherReservations(
        teacherOption.id
      );
      return result;
    }
  },
  Student: {
    reservation: async (student, args, { dataSources }) => {
      const reservations = await dataSources.databaseAPI.getStudentReservation(
        student.id
      );
      return reservations;
    }
  },
  Mutation: {
    toggleOpenWorkshops: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.toggleOpen(),
    makeWorkshopReservation: async (root, args, { dataSources }) => {
      const result = await dataSources.databaseAPI.makeReservation(
        Number(args.student_id),
        Number(args.option_id),
        args.tutorial_reason
      );
      return result;
    },
    saveWorkshopsAttendance: async (
      root,
      { input, teacher_id, option_id },
      { dataSources }
    ) => {
      const result = await dataSources.workshopsAPI.saveAttendance(input);
      dataSources.databaseAPI.deleteOptionReservations(option_id);
      return result;
    },
    editStudent: () => {
      return {
        id: 1,
        codigo: "1234567890",
        nombre: "Benito Antonio",
        apellido_paterno: "Martinez",
        apellido_materno: "Ocasio",
        genero: "M",
        carrera: "Abogado",
        ciclo: "2021A",
        telefono: "1234567890",
        email: "bad@bunny.pr",
        nivel: "4",
        curso: "en",
        grupo: "E4-1",
        externo: false
      };
    },
    resetReservations: (root, args, { dataSources }) =>
      dataSources.databaseAPI.resetReservations(),
    setWorkshopLink: (root, { option_id, url }, { dataSources }) =>
      dataSources.workshopsAPI.setWorkshopLink(option_id, url)
  }
};
