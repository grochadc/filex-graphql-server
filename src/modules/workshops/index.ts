import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const typeDefs = gql`
  extend type Query {
    workshops: [Workshop!]!
    student(codigo: ID!): Student!
    teacher(id: ID!): Teacher!
    getWorkshopsByCategory(category: String!): Workshop!
  }

  type Workshop {
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
    workshop_id: String!
    workshop_name: String!
    option_id: String!
    option_name: String!
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    nivel: String!
    grupo: String!
  }

  type Teacher {
    id: ID!
    name: String!
    options: [TeacherOption!]!
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
    reservation: StudentReservation
  }

  extend type Mutation {
    makeWorkshopReservation(
      codigo: ID!
      option_id: ID!
      teacher_id: ID!
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
    workshops: async (root, args, { dataSources }) => {
      const maxStudents = 30;
      const workshops = await dataSources.workshopsAPI.getWorkshops();
      const options = await dataSources.workshopsAPI.getOptions();
      const availableOptions = await dataSources.workshopsAPI.getAvailableOptions();
      const composedWorkshops = workshops.map(workshop => {
        return {
          ...workshop,
          options: workshop.option_ids.map(option_id => {
            return {
              ...options[option_id],
              available: availableOptions?.hasOwnProperty(option_id)
                ? Boolean(availableOptions[option_id] < maxStudents)
                : true
            };
          })
        };
      });
      return composedWorkshops;
    },
    teacher: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.getTeacher(args.id),
    student: async (root, args, { dataSources }) => {
      return dataSources.studentsAPI.getStudent(args.codigo);
    }
  },
  Teacher: {
    options: async (teacher, args, { dataSources }) => {
      const allOptionsById = await dataSources.workshopsAPI.getOptions();
      const result = teacher.option_ids.map(option_id => {
        const reservations =
          teacher.raw_reservations === undefined
            ? null
            : teacher.raw_reservations[option_id]
            ? Object.values(teacher.raw_reservations[option_id])
            : null;
        return {
          ...allOptionsById[option_id],
          reservations
        };
      });
      return result;
    }
  },
  Student: {
    reservation: async (student, args, { dataSources }) => {
      const reservation = await dataSources.workshopsAPI.getStudentReservation(
        student.codigo
      );
      if (reservation == null) return null;
      const option = await dataSources.workshopsAPI.getOptionById(
        reservation.option_id
      );
      return {
        ...option,
        option_id: reservation.option_id
      };
    }
  },
  Mutation: {
    makeWorkshopReservation: async (root, args, { dataSources }) => {
      return dataSources.workshopsAPI.makeReservation(
        args.codigo,
        args.teacher_id,
        args.option_id,
        args.tutorial_reason
      );
    },
    saveWorkshopsAttendance: (
      root,
      { input, teacher_id, option_id },
      { dataSources }
    ) => {
      dataSources.workshopsAPI.deleteReservations(teacher_id, option_id);
      return dataSources.workshopsAPI.saveAttendance(input);
    },
    resetReservations: (root, args, { dataSources }) =>
      dataSources.workshopsAPI.resetReservations(),
    setWorkshopLink: (root, { option_id, url }, { dataSources }) =>
      dataSources.workshopsAPI.setWorkshopLink(option_id, url)
  }
};
