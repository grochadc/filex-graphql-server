import { gql } from "apollo-server";

const typeDefs = gql`
  type Student {
    code: String
    name: String
    first_last_name: String
    second_last_name: String
    gender: String
    ciclo: String
    career: String
    telephone: String
    email: String
    level: Int
    group: String
    id: ID
  }

  type Workshop {
    name: String
    description: String
    options: [Option!]!
  }

  type Option {
    id: ID!
    teacher: String
    time: String
    day: String
    workshop: String!
    option_id: String!
  }

  type Teacher {
    id: ID!
    name: String
    options: [Option]
    reservations: [Reservation]
    reservations_by_day(day: String): [Reservation]
  }

  type Query {
    workshops: [Workshop]
    workshop(id: ID!): Workshop
    options: [Option]
    option(id: ID!): Option
    reservations: [Reservation]
    reservation(id: ID!): Reservation
    teachers: [Teacher]
    teacher(id: ID!, name: String): Teacher
    students: [Student]
    student(code: String): Student!
  }

  type Reservation {
    id: ID!
    code: String!
    name: String!
    timestamp: String!
    option: Option
    option_id: String!
    workshop_id: String
  }

  type Applicant {
    id: ID!
    code: String
    name: String
    option: Option!
  }

  input ReservationInput {
    code: String!
    name: String!
    timestamp: String!
    option_id: String!
    workshop_id: String
    teacher_id: String!
  }

  input SavedReservation {
    attendance: Boolean!
    code: String!
    name: String
    timestamp: String
  }

  type Mutation {
    makeReservation(
      code: String
      name: String
      option_id: String
      workshop_id: String
    ): Reservation
    saveAttendance(input: [AttendanceInput]): SaveAttendanceResponse
  }
  input AttendanceInput {
    attendance: Boolean!
    code: String!
    name: String!
  }
  type SaveAttendanceResponse {
    status: Int!
    message: String
    error: String
  }
`;
export = typeDefs;
