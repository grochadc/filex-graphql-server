import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    carrera(id: ID!): Carrera
    carreras: [Carrera]
  }

  type Carrera {
    id: ID!
    name: String!
  }

  extend type Mutation {
    saveWrittenResults(input: WrittenResultsInput): MutationResponse
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

  type MutationResponse {
    status: Int!
    message: String
    error: String
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

const resolvers = {
  Query: {
    carrera(_, { id }) {
      return {
        id,
        name: "Licenciatura en valer madre",
      };
    },
    carreras() {
      return [...carreras];
    },
  },

  Mutation: {
    saveWrittenResults: async (_, args, context) => {
      const reconstructApplicant = (applicant, meetLink) => {
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
            meetLink: applicant.nivel_escrito > 1 ? meetLink : null,
            id: generateId(applicant.nivel_escrito),
          };
        };
        return addExtraProps(
          applicant.externo ? makeExterno(applicant) : applicant
        );
      };
      const applicant = reconstructApplicant(
        args.input,
        meetLinks[meetLinkCounter(meetLinks.length - 1)]
      );

      context.dataSources.firebaseAPI.addApplicant(applicant);

      return {
        status: 200,
        message: "successful",
        meetLink: applicant.meetLink,
        id: applicant.id,
      };
    },
  },
};

const meetLinks = [
  "meetLink1memory",
  "meetLink2memory",
  "meetLink3memory",
  "meetLink4memory",
  "meetLink5memory",
];

let count = 0;
const meetLinkCounter = (max) => {
  if (count < max) {
    count++;
    return count;
  }
  count = 0;
  return count;
};

const generateId = (level: number) => {
  let str = Math.random().toString(36).substring(7);
  return str.substr(0, 3) + level + str.substr(3);
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
  { name: "Protección Civil y Emergencias" },
  { name: "Psicología" },
  { name: "Psicología con Orientación en Calidad de Vida y Salud" },
  { name: "Psicología con Orientación en Calidad de Vida y Salud" },
  { name: "Salud Pública" },
  { name: "Seguridad Laboral" },
  { name: "Tecnologías para el Aprendizaje" },
  { name: "Trabajo Social" },
];
module.exports = {
  typeDefs,
  resolvers,
};
