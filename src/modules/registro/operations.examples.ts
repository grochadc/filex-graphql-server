import { gql } from "apollo-server";

export const GET_LEVELS_REGISTERING = gql`
  query getLevelsRegistering($course: String!) {
    english: registeringLevels(course: $course)
  }
`;

const get_levels_vars = {
  variables: {
    course: "en"
  }
};

export const SAVE_LEVELS_REGISTERING = gql`
  mutation saveLevels($levels: [String]!, $course: String!) {
    saveRegisteringLevels(levels: $levels, course: $course)
  }
`;

const save_levels_vars = {
  variables: {
    levels: ["1", "2"],
    course: "en"
  }
};

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
      registeredSchedule {
        teacher
        group
        classroom
        chat
        sesiones
      }
      schedules {
        teacher
        group
        serialized(options: { teacher: true, group: true })
      }
    }
  }
`;

const get_applicant_vars = {
  variables: {
    codigo: "1234567890"
  }
};

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
    $schedule: String!
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
        grupo: $schedule
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

const register_vars = {
  variables: {
    codigo: "1234567890",
    nombre: "Benito Antonio",
    apellido_materno: "Martinez",
    apellido_paterno: "Ocasio",
    genero: "M",
    carrera: "Abogado",
    ciclo: "2021B",
    telefono: "",
    email: "bad@bunny.pr",
    nivel: "4",
    curso: "en",
    externo: false,
    schedule: "E4-1"
  }
};

export const GET_SCHEDULE = gql`
  query getSchedule($id: String!) {
    schedule(id: $id) {
      group
      teacher
      chat
      classroom
      sesiones
    }
  }
`;

const get_schedule_vars = {
  variables: {
    id: "E1-1"
  }
};
