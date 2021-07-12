export type BasicStudent = {
  codigo: string,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  telefono: string,
  email: string,
  genero: "F" | "M",
  externo: boolean,
  ciclo: string,
  carrera: string,
}

type Nivel = "1" | "2" | "3" | "4" | "5" | "6";
type URL = string;
type MeetLink = {
  link: URL,
  teacher: string,
}

export type Applicant = BasicStudent & {
  id: string,
  reubicacion: boolean,
  curso: "en" | "fr",
  nivel_escrito: Nivel,
  meetLink: MeetLink,
};



export interface PlacementDataBase {
  applications: {
    applicationID: Applicant,
  },
  meetLinks: MeetLink[],
  online: number,
}


type Schedule = {
  group: string, //enum "E1-1" | "E1-2" etc.
  teacher: string, //Name Lastname
  time: string, // "14:00 - 15:00"
  registered: number,
}
export interface SchedulesDataBase {
  level1: Schedule[],
  level2: Schedule[],
  level3: Schedule[],
  level4: Schedule[],
  level5: Schedule[],
  level6: Schedule[],
}



interface Student {
  code: string;
  name: string;
  first_last_name: string;
  second_last_name: string;
  gender: string;
  ciclo: string;
  career: string;
  telephone: string;
  email: string;
  level: number;
  group: string;
  id: string;
}

type Reservation = {
  code: string;
  name: string;
  first_last_name: string;
  second_last_name: string;
  level: number;
  group: string;
  option_id: string;
};

type ReservationForDb = Reservation & {
  id: string;
  timestamp: string;
};

type Option = {
  id: string;
  teacher_id: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  url: string;
  workshop_id:
    | "conversation"
    | "toeflpreparation"
    | "basicreading"
    | "basicadvancedlistening"
    | "tutoring"
    | "advancedreading";
  zoom_id?: string;
};

type Teacher = {
  id: string;
  name: string;
  options: string[];
};
