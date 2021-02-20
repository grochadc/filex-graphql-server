import { gql } from "apollo-server";
import * as utils from "../../utils";

const typeDefs = gql`
  extend type Query {
    carreras: [Carrera]
    isClosed: Boolean!
    logIn: Int!
    logOut: Int!
  }

  type Carrera {
    id: ID!
    name: String!
  }

  extend type Mutation {
    saveWrittenResults(input: WrittenResultsInput): MutationResponse
    closeExam: CloseExamResponse
    setRows(input: WrittenResultsInput): Boolean!
  }

  input WrittenResultsInput {
    codigo: String!
    nombre: String!
    apellido_paterno: String!
    apellido_materno: String
    genero: String!
    ciclo: String
    carrera: String
    telefono: String!
    email: String!
    nivel_escrito: Int!
    curso: String!
    externo: Boolean!
    reubicacion: Boolean!
  }

  type CloseExamResponse {
    isClosed: Boolean!
  }

  type MutationResponse {
    status: Int!
    message: String
    error: String
    id: String
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

const resolvers = {
  Query: {
    carreras: () => {
      return [...carreras];
    },
    isClosed: () => {
      return getIsClosed();
    },
    logIn: (root, args, { dataSources }) => {
      return dataSources.placementAPI.logInUser();
    },
    logOut: (root, args, { dataSources }) => {
      return dataSources.placementAPI.logOutUser();
    },
  },

  Mutation: {
    saveWrittenResults: async (_, args, context) => {
      const composeApplicant = (applicant, meetLink) => {
        const makeExterno = (applicant) => {
          return {
            ...applicant,
            carrera: "NA",
            ciclo: "NA",
            codigo: applicant.telefono,
          };
        };
        const addExtraProps = (applicant) => {
          return {
            ...applicant,
            meetLink: applicant.nivel_escrito > 2 ? meetLink : null,
            id: utils.generateId(),
          };
        };
        return addExtraProps(
          applicant.externo ? makeExterno(applicant) : applicant
        );
      };

      const meetLinks = await context.dataSources.placementAPI.getMeetLinks();
      const applicant = composeApplicant(
        args.input,
        meetLinks[meetLinkCounter(meetLinks.length - 1)]
      );

      return context.dataSources.sheetsAPI
        .saveApplicant(applicant)
        .then(() => {
          console.log("Saved applicant to sheets successfully");
          return {
            status: 200,
            message: "successful",
            meetLink: applicant.meetLink,
            id: applicant.id,
          };
        })
        .catch(({ errors }) => {
          console.log("There was an error:", errors[0].message);
          context.dataSources.placementAPI
            .addApplicant(applicant)
            .then(() =>
              console.log(
                "Saved the applicant in firebase because of a problem with sheets"
              )
            );
          return {
            status: 400,
            message: errors[0].message,
            error: errors[0].reason,
          };
        });
    },
    closeExam: (_, args) => {
      toggleIsClosed();
      return { isClosed: getIsClosed() };
    },
    setRows: (root, args, { dataSources }) => {
      dataSources.sheetsAPI.setRows(args.data);
      return true;
    },
  },
};

let count = 0;
const meetLinkCounter = (max) => {
  if (count < max) {
    count++;
    return count;
  }
  count = 0;
  return count;
};

let isClosed = true;
const getIsClosed = () => {
  return isClosed;
};
const toggleIsClosed = () => {
  isClosed = !isClosed;
};

const carreras = [
  { name: "Academico" },
  { name: "Administrativo" },
  { name: "Abogado" },
  { name: "Administración de Negocios" },
  { name: "Agrobiotecnología" },
  { name: "Agronegocios" },
  { name: "Carrera en Enfermería (ENFE)" },
  {
    name:
      "Ciencia del Comportamiento con Orientación en Alimentación y Nutrición",
  },
  {
    name:
      "Ciencia del Comportamiento con orientación en Alimentación y Nutrición",
  },
  { name: "Cultura Física y Deportes" },
  { name: "Derecho" },
  { name: "Desarrollo Turístico Sustentable" },
  { name: "Enfermería" },
  { name: "Enfermería Semiescolarizada" },
  { name: "Estudios Socioterritoriales" },
  { name: "Ingeniería en Geofísica" },
  { name: "Ingeniería en Sistemas Biológicos" },
  { name: "Ingeniería en Telemática" },
  { name: "Letras Hispánicas" },
  { name: "Médico Cirujano y Partero" },
  { name: "Médico Veterinario y Zootecnista" },
  { name: "Negocios Internacionales" },
  { name: "Nivelación en Licenciatura en Enfermería" },
  { name: "Nutrición" },
  { name: "Periodismo" },
  { name: "Seguridad Laboral, Protección Civil y Emergencias" },
  { name: "Psicología" },
  { name: "Psicología con Orientación en Calidad de Vida y Salud" },
  { name: "Psicología con Orientación en Calidad de Vida y Salud" },
  { name: "Salud Pública" },
  { name: "Tecnologías para el Aprendizaje" },
  { name: "Trabajo Social" },
  { name: "Cirujano Dentista" },
];
module.exports = {
  typeDefs,
  resolvers,
};
