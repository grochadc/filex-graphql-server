import { gql } from "apollo-server";
import * as utils from "../../utils";
import { MeetLink } from "../../types/index";
import { Resolvers } from "../../generated/graphql";
import { TestInput, TestResults } from "datasources/PlacementAPI";

const typeDefs = gql`
  extend type Query {
    carreras: [Carrera!]!
    isClosed: Boolean!
    placementHomePageMessage: HomePageMessage!
    testResults: [TestResults]!
  }


  type TestResults {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String!
    genero: String!
    ciclo: String!
    carrera: String!
    telefono: String!
    email: String!
    institutionalEmail: String
    nivel_escrito: Int!
    curso: String!
    externo: Boolean!
    reubicacion: Boolean!
    generated_id: String!
    meetlink: String
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

const resolvers: Resolvers = {
  Query: {
    carreras: (root, args, { dataSources }) =>
      dataSources.placementAPI.getCarreras(),
    isClosed: () => getIsClosed(),
    placementHomePageMessage: (root, args, { dataSources }) => {
      const msg = dataSources.placementAPI.getHomePageMessage();
      return msg;
    },
    testResults: async (root, args, { dataSources }) => {
      return dataSources.placementAPI.getTestResults();
    }
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

      const composeApplicant = (applicant: TestInput, meetLink: string) => {

        const makeExterno = (applicantd: TestInput): TestInput => ({
          ...applicant,
          carrera: "NA",
          ciclo: "NA",
          codigo: applicant.telefono,
        });
        const assignLink = (applicantd: TestInput): TestResults => ({
          ...applicant,
          meetLink: applicant.nivel_escrito > 2 ? meetLink : null,
          generated_id: utils.generateId(),
        });

        return assignLink(
          applicant.externo ? makeExterno(applicant) : applicant
        );
      };

      const meetLinksUnfiltered: MeetLink[] =
        await dataSources.placementAPI.getMeetLinks(enviroment);
      const meetLinks = meetLinksUnfiltered.filter((link) => link.active);

      function getCurrentLink(meetLinks: any[], carousel: any) {
        if(meetLinks.length < 1) throw new Error("No video links available");

        const lastIndex = meetLinks.length - 1;

        if (carousel.limit !== lastIndex) carousel.setNewLimit(lastIndex);

        const currentIndex = carousel.getNextIndex();

        return meetLinks[currentIndex].link;
      }

      const currentLink =
        args.input.curso === "fr"
          ? "http://meet.google.com/fwm-wqdb-ifw"
          : getCurrentLink(meetLinks, context.carousel);

      //change SheetsAPI.saveApplicant for PlacementAPI.postTestResults(results/applicant);
      const applicant = composeApplicant(args.input, currentLink);
      await dataSources.placementAPI.postTestResults(applicant);
  
      return {
        meetLink: applicant.meetLink,
        id: applicant.generated_id,
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
