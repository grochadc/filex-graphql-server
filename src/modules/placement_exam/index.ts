import { gql } from "apollo-server";
import * as utils from "../../utils";
import { MeetLink } from "../../types/index";
import { Resolvers } from "../../generated/graphql";

const typeDefs = gql`
  extend type Query {
    carreras: [Carrera!]!
    isClosed: Boolean!
    placementHomePageMessage: HomePageMessage!
  }

  type HomePageMessage {
    active: Boolean!
    message: String!
  }

  type Carrera {
    id: ID!
    name: String!
  }

  extend type Mutation {
    saveWrittenResults(input: WrittenResultsInput): MutationResponse!
    closeExam: CloseExamResponse
  }

  input WrittenResultsInput {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    genero: String!
    ciclo: String!
    carrera: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    nivel_escrito: Int!
    curso: String!
    externo: Boolean!
    reubicacion: Boolean!
  }

  type CloseExamResponse {
    isClosed: Boolean!
  }

  type MutationResponse {
    id: String!
    meetLink: String
  }
`;

interface TestInput {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  ciclo: string;
  carrera: string;
  telefono: string;
  email: string;
  nivel_escrito: number;
  curso: string;
  externo: boolean;
  reubicacion: boolean;
}

const resolvers: Resolvers = {
  Query: {
    carreras: (root, args, { dataSources }) =>
      dataSources.placementAPI.getCarreras(),
    isClosed: () => getIsClosed(),
    placementHomePageMessage: (root, args, { dataSources }) => {
      const msg = dataSources.placementAPI.getHomePageMessage();
      return msg;
    },
  },

  Mutation: {
    saveWrittenResults: async (
      _,
      args,
      { dataSources, carousel, enviroment }
    ) => {
      const context = {
        carousel,
      };

      const composeApplicant = (applicant, meetLink) => {
        const makeExterno = (applicantd) => ({
          ...applicant,
          carrera: "NA",
          ciclo: "NA",
          codigo: applicant.telefono,
        });
        const addExtraProps = (applicantd) => ({
          ...applicant,
          meetLink: applicant.nivel_escrito > 2 ? meetLink : null,
          id: utils.generateId(),
        });
        return addExtraProps(
          applicant.externo ? makeExterno(applicant) : applicant
        );
      };

      const meetLinksUnfiltered: MeetLink[] =
        await dataSources.placementAPI.getMeetLinks(enviroment);
      const meetLinks = meetLinksUnfiltered.filter((link) => link.active);

      function getCurrentLink(meetLinks: any[], carousel: any) {
        const lastIndex = meetLinks.length - 1;

        if (carousel.limit !== lastIndex) carousel.setNewLimit(lastIndex);

        const currentIndex = carousel.getNextIndex();

        return meetLinks[currentIndex].link;
      }

      const currentLink =
        args.input.curso === "fr"
          ? "http://meet.google.com/fwm-wqdb-ifw"
          : getCurrentLink(meetLinks, context.carousel);

      const applicant = composeApplicant(args.input, currentLink);
      await dataSources.placementSheetsAPI.saveApplicant(applicant);

      return {
        meetLink: applicant.meetLink,
        id: applicant.id,
      };
    },
    closeExam: (_, args) => {
      toggleIsClosed();
      return { isClosed: getIsClosed() };
    },
  },
};

let isClosed = true;
const getIsClosed = () => isClosed;
const toggleIsClosed = () => {
  isClosed = !isClosed;
};

module.exports = {
  typeDefs,
  resolvers,
};
