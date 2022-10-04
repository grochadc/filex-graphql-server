import { gql, ApolloError } from "apollo-server";
import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../../generated/graphql";
import { unwindPrismaStudent, unhashId } from "./utils";

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
    reservations(optionId: ID!): [Reservation]!
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
    url: String
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
    url: String
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
      attendingStudents: [ReservationInput!]!
    ): Boolean!

    resetReservations: Boolean!
    setWorkshopLink(option_id: ID!, url: String!): Boolean!
  }

  input ReservationInput {
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
      const result = await dataSources.workshopsAPI.getAllOptions(max_students);
      return result;
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
      const result = await dataSources.workshopsAPI.getTeacher(
        unhashId(args.id)
      );
      return result;
    },
    teachers: async (root, args, { dataSources }) => {
      const res = await dataSources.workshopsAPI.getAllTeachers();
      return res;
    },
    reservations: async (root, args, { dataSources }) => {
      const hashId = (id: number): string => {
        return `res_${id}`;
      };

      const reservations =
        await dataSources.workshopsAPI.getReservationsByOptionId(
          unhashId(args.optionId)
        );
      const result = reservations.map((reservation) => {
        return {
          ...reservation,
          id: hashId(reservation.id),
        };
      });
      return result;
    },
  },
  Mutation: {
    toggleOpenWorkshops: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.toggleOpen(),
    makeWorkshopReservation: async (root, args, { dataSources }) => {
      if (args.student_id.indexOf("st_") < 0)
        throw new Error(
          `Got invalid argument for student_id. Recieved ${args.student_id}`
        );
      if (args.option_id.indexOf("opt_") < 0)
        throw new Error(
          `Got invalid argument for option_id. Recieved ${args.option_id}`
        );

      const reservation = await dataSources.workshopsAPI.getStudentReservation(
        unhashId(args.student_id)
      );
      if (reservation) {
        throw new ApolloError(
          "Student already has a reservation",
          "RESERVATION_FORBIDDEN"
        );
      }
      return dataSources.workshopsAPI.makeReservation(
        unhashId(args.student_id),
        unhashId(args.option_id)
      );
    },
    saveWorkshopsAttendance: async (
      root,
      { attendingStudents },
      { dataSources }
    ) => {
      const mapped = attendingStudents.map((student) => ({
        ...student,
        id: unhashId(student.id)
      }));
      return dataSources.workshopsAPI.saveAttendance(mapped);
    },
    resetReservations: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.resetReservations(),
    setWorkshopLink: (root, { option_id, url }, { dataSources }) => {
      if (option_id.indexOf("opt_") < 0)
        throw new Error(
          `Got invalid format on args.option_id. Got ${option_id}`
        );

      return dataSources.workshopsAPI.setWorkshopLink(option_id, url);
    },
  },
  Teacher: {
    id: (teacher, args, context) => `t_${teacher.id}`,
    options: async (teacher, args, { dataSources }) => {
      const options = await dataSources.workshopsAPI.getTeacherOptions(
        teacher.id
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
          student: unwindPrismaStudent(reservation.student),
        };
      });
      return finalResult;
    },
    id: (teacherOption, args, { dataSources }) => {
      return `opt_${teacherOption.id}`;
    },
    available: async (teacherOption, args, { dataSources }) => {
      const reservationCount =
        await dataSources.workshopsAPI.getOptionReservationCount(
          teacherOption.id
        );
      return Boolean(reservationCount < 30);
    },
    isTutorial: (teacherOption) => Boolean(teacherOption.workshop_id > 1),
  },
  Option: {
    id: (option) => {
      return `opt_${option.id}`;
    },
    available: async (option, args, { dataSources }) => {
      const reservationCount =
        await dataSources.workshopsAPI.getOptionReservationCount(option.id);
      return Boolean(reservationCount < 20);
    },
    isTutorial: (option, args, context) => {
      return Boolean(option.workshop_id > 1);
    },
  },
  Student: {
    reservation: async (student, args, { dataSources }) => {
      const reservation = await dataSources.workshopsAPI.getStudentReservation(
        student.id
      );
      return reservation;
    },
    reservationCount: async (student, args, { dataSources }) => {
      return dataSources.workshopsAPI.getReservationCount(student.id);
    },
    reservationLimit: (student, args, { dataSources }) => {
      return dataSources.workshopsAPI.getReservationLimit();
    },
  },
  Reservation: {
    student: (reservation, args, context) => {
      const { student } = reservation;
      //@ts-ignore
      const group = student.groupObject.name;

      // typescript dice que en student.applicant y student.groupObject no existen
      //pero el datasource regresa la reservation con include applicant y groupObject
      return {
        ...student,
        //@ts-ignore
        ...student.applicant,
        grupo: group.name,
      };
    },
  },
};
