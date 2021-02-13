import { gql } from "apollo-server";

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher: ID!) {
    teacher(id: $teacher) {
      name
      options {
        time
        day
        workshop
      }
      reservations {
        code
        name
        first_last_name
        second_last_name
        level
        group
        timestamp
        option {
          day
        }
      }
    }
  }
`;

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

export const GET_SELECTION_INFO = gql`
  query getSelectionInfo($code: ID!) {
    student(codigo: $code) {
      codigo
      nombre
      apellido_paterno
      apellido_materno
      nivel
      grupo
    }
    workshops {
      name
      description
      levels
      options {
        id
        day
        time
        teacher
        workshop
        url
        zoom_id
        available
      }
    }
  }
`;

export const SET_RESERVATION = gql`
  mutation setReservation($codigo: ID!, $option_id: ID!) {
    makeReservation(input: { codigo: $codigo, option_id: $option_id }) {
      id
      timestamp
      codigo
      nombre
      url
      zoom_id
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

export const GET_MEET_LINKS = gql`
  {
    meetLinks
  }
`;

export const GET_DEFAULT_SETTINGS = gql`
  query {
    isClosed
    meetLinks
  }
`;

export const UPDATE_LINKS = gql`
  mutation updateLinks($links: [String]!) {
    setMeetLinks(links: $links)
  }
`;
