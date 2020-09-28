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
  }

  type Option {
    id: ID!
    teacher: String
    time: String
    day: String
    workshop: String!
  }

  type Applicant {
    id: ID!
    code: String
    name: String
    option: Option!
  }

  type Teacher {
    id: ID!
    name: String
    options: [Option]
    reservations: [Applicant]
    reservations_by_day(day: String): [Applicant]
  }

  type Query {
    workshops: [Workshop]
    workshop(id: ID!): Workshop
    options: [Option]
    option(id: ID!): Option
    applicants: [Applicant]
    applicant(id: ID!): Applicant
    teachers: [Teacher]
    teacher(id: ID!, name: String): Teacher
    students: [Student]
    student(code: String): Student!
  }

  type Reservation {
    code: String
    name: String
    option_id: String
    workshop_id: String
  }

  input ReservationInput {
    code: String
    name: String
    option_id: String
    workshop_id: String
  }

  type Mutation {
    makeReservation(
      code: String
      name: String
      option_id: String
      workshop_id: String
    ): Reservation
  }
`;
module.exports = typeDefs;
