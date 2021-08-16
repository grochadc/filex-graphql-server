// START Grapqhl Codegen Types: https://www.graphql-code-generator.com/
//END Grapqhl Codegen Types

declare interface Applicant {
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: Level;
  curso: Course;
  externo: boolean;
  nuevo_ingreso: boolean;
}
declare interface Student {
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: Level;
  curso: Course;
  externo: boolean;
  grupo: string;
}

declare type Schedule = {
  chat?: string;
  classroom?: string;
  group: string;
  sesiones?: string;
  teacher: string;
  time?: string;
  serialized?: string;
};

declare interface RegisterResponse extends Student {
  schedule: Schedule;
}

declare type LevelsRegistering = Level[];

declare type SerializeOptions = {
  group?: boolean;
  teacher?: boolean;
  time?: boolean;
};

declare type Course = "en" | "fr";

declare type ClientEnv = "dev" | "prod";

declare type Level = "1" | "2" | "3" | "4" | "5" | "6";
