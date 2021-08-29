export type DatabaseModel = {
  workshops: {
    [workshop_id: string]: WorkshopModel;
  };
  options: {
    [option_id: string]: OptionModel;
  };
  teachers: {
    [teacher_id: string]: TeacherModel;
  };
  studentsReservations: {
    [codigo: string]: StudentReservationModel;
  };
  students: {
    [codigo: string]: StudentModel;
  };
  availableOptions?: {
    [option_id: string]: number;
  };
};

export type StudentsDBModel = {
  [codigo: string]: StudentModel;
};

export type WorkshopModel = {
  name: string;
  description: string;
  levels: string[];
  option_ids: string[];
};

export interface OptionModel {
  id: string;
  day: string;
  time: string;
  teacher_id: string;
  teacher_name: string;
  workshop_id: string;
  workshop_name: string;
  url: string;
}

export type TeacherModel = {
  id: string;
  name: string;
  option_ids: string[];
  raw_reservations?: {
    [option_id: string]: {
      [random: string]: TeacherReservationModel;
    };
  };
};

export type TeacherReservationModel = {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nivel: string;
  grupo: string;
  workshop_id: string;
  workshop_name: string;
  option_id: string;
  option_name: string;
};

export type StudentReservationModel = {
  option_id: string;
};

export type StudentModel = {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: string;
  curso: string;
  externo: boolean;
  grupo: string;
};
