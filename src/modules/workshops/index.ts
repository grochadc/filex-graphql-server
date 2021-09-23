import { gql } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const typeDefs = gql`
  extend type Query {
    paramQuery(param: String): Boolean
    options: [Option!]!
    workshops: [Workshop!]!
    student(codigo: ID!): Student!
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
    options: [TeacherOption!]!
  }

  type Student {
    id: ID!
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
      const result = await dataSources.databaseAPI.getTeacher(args.id);
      return result;
    },
    teachers: (root, args, { dataSources }) => {
      return dataSources.databaseAPI.getAllTeachers();
    },
    student: async (root, args, { dataSources }) => {
      return dataSources.databaseAPI.getStudent(args.codigo);
    }
  },
  TeacherOption: {
    reservations: (teacherOption, args, { dataSources }) => {
      return dataSources.databaseAPI.getTeacherReservations(teacherOption.id);
    }
  },
  Student: {
    reservation: async (student, args, { dataSources }) => {
      const reservations = await dataSources.databaseAPI.getStudentReservation(
        student.id
      );
      if (reservations.length === 0) return null;
      return reservations[0];
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
      return result[0];
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
    resetReservations: (root, args, { dataSources }) =>
      dataSources.databaseAPI.resetReservations(),
    setWorkshopLink: (root, { option_id, url }, { dataSources }) =>
      dataSources.workshopsAPI.setWorkshopLink(option_id, url)
  }
};

const legacyMakeWorkshopReservationResolver = async (
  root,
  args,
  { dataSources }
) => {
  return dataSources.workshopsAPI.makeReservation(
    args.codigo,
    args.teacher_id,
    args.option_id,
    args.tutorial_reason
  );
};

const legacyWorkshopsResolver = async (root, args, { dataSources }) => {
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
};

const legacyTeacherResolver = {
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
};
