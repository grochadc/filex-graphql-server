import apollo from "apollo-server";
import db from "./db.js";
const { ApolloServer, gql } = apollo;

const getById = (key: string, id: string) =>
  db[key].filter((item) => item.id === id)[0];

const typeDefs = gql`
  type Workshop {
    name: String
    description: String
  }

  type Option {
    id: ID!
    teacher: String
    time: String
    day: String
    workshop: Workshop!
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
  }
`;

const resolvers = {
  Query: {
    workshops: () => db.workshops,
    workshop: (_, args) => getById("workshops", args.id),
    options: () => db.options,
    option: (_, args) => getById("options", args.id),
    applicants: () => db.applicants,
    applicant: (_, args) => getById("applicants", args.id),
    teachers: () => db.teachers,
    teacher: (_, args) => getById("teachers", args.id),
  },
  Applicant: {
    option: (obj) => getById("options", obj.option_id),
  },
  Option: {
    workshop: (obj) => getById("workshops", obj.workshop_id),
  },
  Teacher: {
    options: (obj) =>
      db.options.filter((option) => option.teacher_id === obj.id),
    reservations: (obj) =>
      db.applicants.filter((applicant) =>
        new RegExp(obj.id).test(applicant.option_id)
      ),
      reservations_by_day: (obj, args) => {
        const { day } = args;
        const teacher = obj.id;
        const regex = new RegExp(`${teacher}${day}`)
        return db.applicants.filter(applicant => regex.test(applicant.option_id))
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, cors: true });

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
