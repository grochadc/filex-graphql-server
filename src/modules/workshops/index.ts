import { gql, ApolloError } from "apollo-server";
import { datastore } from "googleapis/build/src/apis/datastore";
import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../../generated/graphql";
import { sortWorkshops, sortStudents, unwindPrismaStudent } from "./utils";

export const typeDefs = gql`
  scalar Date

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
    id: Int!
    name: String!
    description: String!
    levels: [String!]!
    options: [Option!]!
  }

  type Option {
    id: ID!
    active: Boolean!
    day: String!
    time: String!
    teacher: Teacher!
    workshop: Workshop!
    url: String!
    zoom_id: String
    isTutorial: Boolean!
    available: Boolean!
  }

  type TeacherOption {
    id: ID!
    day: String!
    time: String!
    teacher: Teacher!
    workshop: Workshop!
    url: String!
    zoom_id: String
    isTutorial: Boolean!
    available: Boolean!
    reservations: [Reservation]!
  }

  type Reservation {
    id: ID!
    create_time: Date!
    student: Student!
    option: Option!
    tutorialReason: String
    attended: Boolean!
  }

  type Teacher {
    id: ID!
    nombre: String!
    options: [TeacherOption!]!
  }

  extend type Student {
    reservation: Reservation
    reservationCount: Int!
    reservationLimit: Int!
  }

  extend type Mutation {
    toggleOpenWorkshops: Boolean!

    makeWorkshopReservation(
      student_id: ID!
      option_id: ID!
      tutorial_reason: String
    ): Reservation!

    saveWorkshopsAttendance(
      attendingStudents: [AttendingStudent!]!
      option_id: ID!
      teacher_id: ID!
    ): Boolean!

    resetReservations: Boolean!
    setWorkshopLink(option_id: ID!, url: String!): Boolean!
  }

  input AttendingStudent {
    id: ID!
    attended: Boolean!
  }
`;

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type based on Javascript Date object",
  serialize(value) {
    return value.getTime();
  },
  parseValue(value: number) {
    return new Date(value);
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export const resolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    isWorkshopsOpen: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.isOpen(),
    paramQuery: async (root, args, { dataSources }) => {
      return true;
    },
    options: async (option, args, { dataSources }) => {
      const max_students =
        await dataSources.workshopsAPI.getMaxStudentReservations();
      const res = await dataSources.workshopsAPI.getAllOptions(max_students);
      return res;
    },
    workshops: async (root, args, { dataSources }) => {
      const max_students =
        await dataSources.workshopsAPI.getMaxStudentReservations();
      const allWorkshops = await dataSources.workshopsAPI.getAllWorkshops(
        max_students
      );
      return allWorkshops.map((workshop) => {
        const { options: _, ...workshopWithoutOptions } = workshop;
        return {
          ...workshop,
          options: workshop.options.map((option) => ({
            ...option,
            workshop: workshopWithoutOptions,
          })),
        };
      });
    },
    teacher: async (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.getTeacher(args.id);
    },
    teachers: async (root, args, { dataSources }) => {
      const res = await dataSources.workshopsAPI.getAllTeachers();
      return res;
    },
  },
  Teacher: {
    options: async (teacher, args, { dataSources }) => {
      const options = await dataSources.workshopsAPI.getTeacherOptions(
        String(teacher.id)
      );
      return options;
    },
  },
  TeacherOption: {
    reservations: async (teacherOption, args, { dataSources }) => {
      const res = await dataSources.workshopsAPI.getTeacherReservations(
        teacherOption.teacher_id,
        teacherOption.id
      );
      const finalResult = res.map((reservation) => {
        return {
          ...reservation,
          id: String(reservation.id),
          student: unwindPrismaStudent(reservation.student),
        };
      });
      return finalResult;
    },
    available: async (teacherOption, args, { dataSources }) => {
      const reservationCount =
        await dataSources.workshopsAPI.getOptionReservationCount(
          String(teacherOption.id)
        );
      return Boolean(reservationCount < 30);
    },
    isTutorial: (teacherOption) => Boolean(teacherOption.workshop_id > 1),
  },
  Option: {
    available: async (option, args, { dataSources }) => {
      const reservationCount =
        await dataSources.workshopsAPI.getOptionReservationCount(
          String(option.id)
        );
      console.log("reservationCOunt", reservationCount);
      return true;
    },
    isTutorial: (option, args, context) => {
      return Boolean(option.workshop_id > 1);
    },
  },
  Student: {
    reservation: async (student, args, { dataSources }) => {
      const reservation = await dataSources.workshopsAPI.getStudentReservation(
        String(student.id)
      );
      return reservation;
    },
    reservationCount: async (student, args, { dataSources }) => {
      return dataSources.workshopsAPI.getReservationCount(String(student.id));
    },
    reservationLimit: (student, args, { dataSources }) => {
      return dataSources.workshopsAPI.getReservationLimit();
    },
  },
  Mutation: {
    toggleOpenWorkshops: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.toggleOpen(),
    makeWorkshopReservation: async (root, args, { dataSources }) => {
      const reservation = await dataSources.workshopsAPI.getStudentReservation(
        args.student_id
      );
      if (reservation) {
        throw new ApolloError(
          "Student already has a reservation",
          "RESERVATION_FORBIDDEN"
        );
      }
      return dataSources.workshopsAPI.makeReservation(
        args.student_id,
        args.option_id
      );
    },
    saveWorkshopsAttendance: async (
      root,
      { attendingStudents, teacher_id, option_id },
      { dataSources }
    ) => {
      return dataSources.workshopsAPI.saveAttendance(attendingStudents);
    },
    resetReservations: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.resetReservations(),
    setWorkshopLink: (root, { option_id, url }, { dataSources }) =>
      dataSources.workshopsAPI.setWorkshopLink(option_id, url),
  },
};
