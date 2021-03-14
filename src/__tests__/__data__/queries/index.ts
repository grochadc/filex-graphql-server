import { gql } from "apollo-server";
import {
  SAVE_LEVELS_REGISTERING,
  GET_LEVELS_REGISTERING,
  GET_APPLICANT,
  REGISTER_STUDENT,
} from "./registro";

import {
  GET_CARRERAS,
  GET_MEET_LINKS,
  GET_DEFAULT_SETTINGS,
  UPDATE_LINKS,
  SAVE_RESULTS_DB,
} from "./placement";

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
    makeWorkshopReservation(input: { codigo: $codigo, option_id: $option_id }) {
      id
      timestamp
      codigo
      nombre
      url
      zoom_id
    }
  }
`;

export {
  SAVE_LEVELS_REGISTERING,
  GET_LEVELS_REGISTERING,
  GET_APPLICANT,
  REGISTER_STUDENT,
  GET_CARRERAS,
  GET_MEET_LINKS,
  GET_DEFAULT_SETTINGS,
  UPDATE_LINKS,
  SAVE_RESULTS_DB,
};
