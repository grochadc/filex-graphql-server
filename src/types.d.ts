export interface Applicant {
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: string;
  curso: string;
  externo: boolean;
  nuevo_ingreso: boolean;
}
export interface Student {
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: string;
  curso: string;
  externo: boolean;
  nuevo_ingreso: boolean;
  grupo: string;
}

export interface RegisterResponse extends Student {
  schedule: {
    group: string;
    teacher: string;
    time?: string;
    serialized: string;
  };
}

export interface Schedule {
  group: string;
  teacher: string;
  time?: string;
  serialized: string;
}
