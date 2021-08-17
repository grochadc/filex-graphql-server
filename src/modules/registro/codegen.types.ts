export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  registeringLevels: Promise<Array<Maybe<Scalars["Int"]>>>;
  applicant: Applicant;
  schedule: Schedule;
};

export type QueryRegisteringLevelsArgs = {
  course: Scalars["String"];
};

export type QueryApplicantArgs = {
  codigo: Scalars["ID"];
};

export type QueryScheduleArgs = {
  id: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  registerStudent: RegisterResponse;
  saveRegisteringLevels: Array<Maybe<Scalars["String"]>>;
};

export type MutationRegisterStudentArgs = {
  input?: Maybe<StudentInput>;
};

export type MutationSaveRegisteringLevelsArgs = {
  levels: Array<Maybe<Level>>;
  course: Course;
};

export type Applicant = {
  __typename?: "Applicant";
  codigo: Scalars["ID"];
  nombre: Scalars["String"];
  apellido_materno: Scalars["String"];
  apellido_paterno: Scalars["String"];
  genero: Scalars["String"];
  carrera: Scalars["String"];
  ciclo: Scalars["String"];
  telefono: Scalars["String"];
  email: Scalars["String"];
  nivel: Level;
  curso: Course;
  externo: Scalars["Boolean"];
  registering: Scalars["Boolean"];
  schedules: Array<Maybe<Schedule>>;
  registeredSchedule: Maybe<Schedule>;
};

export type Schedule = {
  __typename?: "Schedule";
  group: Scalars["String"];
  teacher: Scalars["String"];
  chat?: Maybe<Scalars["String"]>;
  classroom?: Maybe<Scalars["String"]>;
  sesiones?: Maybe<Scalars["String"]>;
  serialized?: Scalars["String"];
};

export type ScheduleSerializedArgs = {
  options: SerializedOptions;
};

export type SerializedOptions = {
  group?: Maybe<Scalars["Boolean"]>;
  teacher?: Maybe<Scalars["Boolean"]>;
  time?: Maybe<Scalars["Boolean"]>;
};

export type StudentInput = {
  codigo: Scalars["ID"];
  nombre: Scalars["String"];
  apellido_materno: Scalars["String"];
  apellido_paterno: Scalars["String"];
  genero: Scalars["String"];
  carrera: Scalars["String"];
  ciclo: Scalars["String"];
  telefono: Scalars["String"];
  email: Scalars["String"];
  nivel: Level;
  grupo: Scalars["String"];
  externo: Scalars["Boolean"];
  curso: Course;
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  codigo: Scalars["ID"];
  nombre: Scalars["String"];
  apellido_materno: Scalars["String"];
  apellido_paterno: Scalars["String"];
  genero: Scalars["String"];
  carrera: Scalars["String"];
  ciclo: Scalars["String"];
  telefono: Scalars["String"];
  email: Scalars["String"];
  nivel: Level;
  grupo: Scalars["String"];
  schedule: Schedule;
};
