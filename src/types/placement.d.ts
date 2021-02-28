export declare interface Applicant {
  id: string;
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  telefono: string;
  email: string;
  externo: boolean;
  carrera: string;
  ciclo: string;
  curso: string;
  reubicacion: boolean;
  nivel_escrito: number;
  meetLink: string;
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
