import internal from "stream";

export { ServerContext } from "../../server";
type Nivel = "1" | "2" | "3" | "4" | "5" | "6";
type Curso = "en" | "fr";
type Genero = "M" | "F";
type Url = string;

export type ApplicantModel = {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: Genero;
  ciclo: string;
  carrera: string;
  telefono: string;
  email: string;
  externo: boolean;
  desertor: boolean;
  nivel: Nivel;
  curso: Curso;
};

export type ScheduleModel = {
  id: number;
  ciclo: string;
  name: string;
  time: string;
  aula: string;
  teacher_id: number;
  nivel: number;
  teacher: string;
};

type RgisteringLevelsEndpoint = {
  en: Nivel[];
  fr: Nivel[];
};

type LevelsString =
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "level5"
  | "level6";

export type SchedulesEndpoint = {
  //DB -> prod/scheduels.json
  en: {
    [key in LevelsString]: {
      [group: string]: ScheduleModel;
    };
  };
  fr?: {
    [key in LevelsString]?: {
      [group: string]: ScheduleModel;
    };
  };
};

type AlreadyRegisteredEndpoint = {
  [codigo: string]: string; //"E4-1"
};
