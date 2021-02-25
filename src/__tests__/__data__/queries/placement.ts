import { gql } from "apollo-server";

export const SAVE_RESULTS_DB = gql`
  mutation Results(
    $code: String!
    $nombre: String!
    $apellido_paterno: String!
    $apellido_materno: String
    $genero: String!
    $ciclo: String
    $carrera: String
    $telefono: String!
    $email: String!
    $externo: Boolean!
    $reubicacion: Boolean!
    $nivel_escrito: Int!
    $curso: String!
  ) {
    saveWrittenResults(
      input: {
        codigo: $code
        nombre: $nombre
        apellido_paterno: $apellido_paterno
        apellido_materno: $apellido_materno
        genero: $genero
        ciclo: $ciclo
        carrera: $carrera
        telefono: $telefono
        email: $email
        externo: $externo
        reubicacion: $reubicacion
        nivel_escrito: $nivel_escrito
        curso: $curso
      }
    ) {
      status
      message
      id
      meetLink
    }
  }
`;

export const GET_CARRERAS = gql`
  query {
    carreras {
      name
    }
    isClosed
  }
`;

export const GET_DEFAULT_SETTINGS = gql`
  query {
    isClosed
    meetLinks {
      teacher
      link
    }
  }
`;

export const GET_MEET_LINKS = gql`
  {
    meetLinks {
      teacher
      link
    }
  }
`;

export const UPDATE_LINKS = gql`
  mutation updateLinks($links: [MeetLinkInput]!) {
    setMeetLinks(links: $links)
  }
`;
