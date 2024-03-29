import { gql } from "apollo-server";

export const SAVE_LEVELS_REGISTERING = gql`
  mutation saveLevels($levels: [String]!, $course: String!) {
    saveRegisteringLevels(levels: $levels, course: $course)
  }
`;

export const GET_LEVELS_REGISTERING = gql`
  {
    english: registeringLevels(course: "en")
  }
`;

export const GET_APPLICANT = gql`
  query info($codigo: ID!) {
    applicant(codigo: $codigo) {
      codigo
      nombre
      apellido_materno
      apellido_paterno
      genero
      carrera
      ciclo
      telefono
      email
      nivel
      curso
      externo
      registering
      schedules {
        teacher
        group
        serialized(options: { teacher: true, group: true })
      }
    }
  }
`;

export const REGISTER_STUDENT = gql`
  mutation register(
    $codigo: ID!
    $nombre: String!
    $apellido_materno: String!
    $apellido_paterno: String!
    $genero: String!
    $carrera: String!
    $ciclo: String!
    $telefono: String!
    $email: String!
    $nivel: String!
    $curso: String!
    $externo: Boolean!
    $grupo: String!
  ) {
    registerStudent(
      input: {
        codigo: $codigo
        nombre: $nombre
        apellido_materno: $apellido_materno
        apellido_paterno: $apellido_paterno
        genero: $genero
        carrera: $carrera
        ciclo: $ciclo
        telefono: $telefono
        email: $email
        nivel: $nivel
        curso: $curso
        externo: $externo
        grupo: $grupo
      }
    ) {
      nombre
      schedule {
        group
        teacher
        chat
        classroom
        sesiones
      }
    }
  }
`;
