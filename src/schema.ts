import { gql } from "apollo-server";

const typeDefs = gql`
  type Student {
    id: ID!
    code: String
    name: String
    first_last_name: String
    second_last_name: String
    telephone: String!
    email: String!
    level: Int!
    group: String!
  }

  type Workshop {
    id: ID!
    name: String!
    description: String!
    levels: [Int!]!
    options: [Option!]
  }

  type Option {
    id: ID!
    teacher: String!
    time: String!
    day: String!
    url: String!
    zoom_id: String
    workshop: String!
    available: Boolean!
  }

  type Teacher {
    id: ID!
    name: String!
    options: [Option!]
    reservations: [Reservation]!
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
    option: Option!
    option_id: String!
    url: String!
    zoom_id: String
  }

  type Query {
    workshops: [Workshop]
    workshop(id: ID!): Workshop
    options(workshop_id: String): [Option!]!
    option(id: ID!): Option
    reservations: [Reservation]
    reservation(id: ID!): Reservation
    teachers: [Teacher]
    teacher(id: ID!, name: String): Teacher
    students: [Student!]!
    student(code: String): Student!
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
    first_last_name: String!
    second_last_name: String!
    level: Int!
    group: String!
    option_id: String!
  }

  type ReturnedReservation {
    id: ID!
    code: String!
    name: String!
    timestamp: String!
    first_last_name: String!
    second_last_name: String!
    level: Int!
    group: String!
    option_id: String!
    url: String!
    zoom_id: String
  }

  input SavedReservation {
    attendance: Boolean!
    code: String!
    name: String
    timestamp: String
  }

  type Mutation {
    makeReservation(input: ReservationInput): ReturnedReservation
    saveAttendance(input: [AttendanceInput]): SaveAttendanceResponse
  }
  input AttendanceInput {
    attendance: Boolean!
    code: String!
    name: String!
    first_last_name: String!
    second_last_name: String!
    telephone: String!
    email: String!
    level: Int!
    group: String!
  }
  type SaveAttendanceResponse {
    status: Int!
    message: String
    error: String
  }
`;
export = typeDefs;
