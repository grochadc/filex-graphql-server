import { gql } from "apollo-server";
import * as utils from "../../utils";
import { MeetLink } from "../../types/index";
import { Resolvers } from "../../generated/graphql";
import { WrittenResultsInput, TestResults } from "../../generated/graphql";

export interface ApplicantWithMeetLink extends WrittenResultsInput {
  meetLink: string;
  generated_id: string;
  nivelEscrito: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

const typeDefs = gql`
  extend type Query {
    carreras: [Carrera!]!
    isClosed: Boolean!
    placementHomePageMessage: HomePageMessage!
    testResults(filter: Filter): [TestResults]!
  }

  enum Filter {
    ASSIGNED
    NONASSIGNED
    ALL
  }

  type TestResults {
    id: ID!
    codigo: String!
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    genero: String!
    ciclo: String!
    carrera: String!
    telefono: String!
    email: String!
    institutionalEmail: String
    nivelEscrito: Int!
    curso: String!
    externo: Boolean!
    reubicacion: Boolean!
    generated_id: String!
    meetLink: String
    nivelOral: Int
    nivelFinal: Int
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
    saveOralResults(input: OralResults): Boolean!
  }

  input OralResults {
    id: ID!
    nivelOral: Int!
    nivelFinal: Int!
  }

  input WrittenResultsInput {
    codigo: String!
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    genero: String!
    ciclo: String!
    carrera: String!
    telefono: String!
    email: String!
    institucionalEmail: String
    nivelEscrito: Int!
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
      return dataSources.placementAPI.getTestResults(args.filter);
    },
  },

  Mutation: {
    saveOralResults: async (root, { input }, { dataSources }) => {
      const { id, nivelOral, nivelFinal } = input;
      dataSources.placementAPI.updateFinalResults({
        id: Number(id),
        nivelOral,
        nivelFinal,
      });
      return true;
    },
    saveWrittenResults: async (
      _,
      args,
      { dataSources, carousel, enviroment }
    ) => {
      const context = {
        carousel,
      };

      const composeApplicant = (
        applicant: WrittenResultsInput,
        meetLink: string
      ): ApplicantWithMeetLink => {
        const makeExterno = (
          applicantd: WrittenResultsInput
        ): WrittenResultsInput => ({
          ...applicant,
          carrera: "NA",
          ciclo: "NA",
          codigo: applicant.telefono,
        });
        const assignLink = (
          applicantd: WrittenResultsInput
        ): ApplicantWithMeetLink => ({
          ...applicant,
          meetLink: applicant.nivelEscrito > 2 ? meetLink : null,
          generated_id: utils.generateId(),
        });

        const linkAssigned = assignLink(
          applicant.externo ? makeExterno(applicant) : applicant
        );
        return linkAssigned;
      };

      const meetLinksUnfiltered: MeetLink[] =
        await dataSources.placementAPI.getMeetLinks(enviroment);
      const meetLinks = meetLinksUnfiltered.filter((link) => link.active);

      function getCurrentLink(meetLinks: any[], carousel: any) {
        if (meetLinks.length < 1) throw new Error("No video links available");

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
      const createdId = await dataSources.placementAPI.postTestResults(
        applicant
      );

      return {
        meetLink: applicant.meetLink,
        generated_id: applicant.generated_id,
        id: createdId,
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
