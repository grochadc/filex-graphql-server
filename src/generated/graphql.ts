import { GraphQLResolveInfo } from 'graphql';
import { ApplicantModel, ScheduleModel } from '../modules/registro/models';
import { StudentModel, TeacherModel, StudentReservationModel } from '../modules/workshops/models';
import { ServerContext } from '../server';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  text: Scalars['String'];
  correct: Scalars['Boolean'];
};

export type Applicant = {
  __typename?: 'Applicant';
  codigo: Scalars['ID'];
  nombre: Scalars['String'];
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  genero: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  curso: Scalars['String'];
  externo: Scalars['Boolean'];
  desertor: Scalars['Boolean'];
  registering: Scalars['Boolean'];
  schedules: Array<Schedule>;
  registeredSchedule?: Maybe<Schedule>;
};

export type ApplicantInput = {
  codigo: Scalars['ID'];
  nombre: Scalars['String'];
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  genero: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  curso: Scalars['String'];
  externo: Scalars['Boolean'];
  desertor: Scalars['Boolean'];
};

export type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
  codigo: Scalars['ID'];
  nombre: Scalars['String'];
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  genero: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  curso: Scalars['String'];
  externo: Scalars['Boolean'];
  desertor: Scalars['Boolean'];
};

export type AttendingStudent = {
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  grupo: Scalars['String'];
  workshop: Scalars['String'];
  teacher: Scalars['String'];
  attended: Scalars['Boolean'];
};

export type Carrera = {
  __typename?: 'Carrera';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CloseExamResponse = {
  __typename?: 'CloseExamResponse';
  isClosed: Scalars['Boolean'];
};

export type Grades = {
  __typename?: 'Grades';
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno: Scalars['String'];
  carrera: Scalars['String'];
  email: Scalars['String'];
  midterm_grammar: Scalars['String'];
  midterm_oral: Scalars['String'];
  final_grammar: Scalars['String'];
  final_oral: Scalars['String'];
  workshops: Scalars['String'];
  cultural_task: Scalars['String'];
  mini_project: Scalars['String'];
  reading: Scalars['String'];
  listening: Scalars['String'];
  final: Scalars['String'];
};

export type MeetLinkInput = {
  id?: Maybe<Scalars['ID']>;
  teacher: Scalars['String'];
  link: Scalars['String'];
  active: Scalars['Boolean'];
};

export type MeetLinkInputWithId = {
  id: Scalars['ID'];
  teacher: Scalars['String'];
  link: Scalars['String'];
  active: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  saveWrittenResults?: Maybe<MutationResponse>;
  closeExam?: Maybe<CloseExamResponse>;
  setRows: Scalars['Boolean'];
  setMeetLinks?: Maybe<Scalars['Int']>;
  setMeetLink?: Maybe<Scalars['Int']>;
  removeMeetLink?: Maybe<Scalars['Int']>;
  databaseSet: Scalars['Int'];
  registerStudent: RegisterResponse;
  saveRegisteringLevels: Array<Scalars['String']>;
  saveApplicant: ApplicantResponse;
  makeWorkshopReservation: StudentReservation;
  saveWorkshopsAttendance: Scalars['Boolean'];
  resetReservations: Scalars['Boolean'];
  setWorkshopLink: Scalars['Boolean'];
};


export type MutationSaveWrittenResultsArgs = {
  input?: Maybe<WrittenResultsInput>;
};


export type MutationSetRowsArgs = {
  input?: Maybe<WrittenResultsInput>;
};


export type MutationSetMeetLinksArgs = {
  links: Array<Maybe<MeetLinkInput>>;
};


export type MutationSetMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationDatabaseSetArgs = {
  input?: Maybe<FirebaseInput>;
};


export type MutationRegisterStudentArgs = {
  input: StudentInput;
};


export type MutationSaveRegisteringLevelsArgs = {
  levels: Array<Scalars['String']>;
  course: Scalars['String'];
};


export type MutationSaveApplicantArgs = {
  codigo: Scalars['String'];
  input: ApplicantInput;
};


export type MutationMakeWorkshopReservationArgs = {
  codigo: Scalars['ID'];
  option_id: Scalars['ID'];
  teacher_id: Scalars['ID'];
};


export type MutationSaveWorkshopsAttendanceArgs = {
  input: Array<AttendingStudent>;
  option_id: Scalars['ID'];
  teacher_id: Scalars['ID'];
};


export type MutationSetWorkshopLinkArgs = {
  option_id: Scalars['ID'];
  url: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  status: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  meetLink?: Maybe<Scalars['String']>;
};

export type Option = {
  __typename?: 'Option';
  id: Scalars['ID'];
  day: Scalars['String'];
  time: Scalars['String'];
  teacher_name: Scalars['String'];
  teacher_id: Scalars['String'];
  workshop_name: Scalars['String'];
  workshop_id: Scalars['String'];
  url: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
  available: Scalars['Boolean'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  carreras?: Maybe<Array<Maybe<Carrera>>>;
  isClosed: Scalars['Boolean'];
  logIn: Scalars['Int'];
  logOut: Scalars['Int'];
  meetLinks: Array<Maybe<MeetLink>>;
  section?: Maybe<Section>;
  database?: Maybe<Array<Maybe<Scalars['String']>>>;
  registeringLevels: Array<Scalars['String']>;
  applicant: Applicant;
  schedule: Schedule;
  workshops: Array<Workshop>;
  student: Student;
  teacher: Teacher;
  getWorkshopsByCategory: Workshop;
  grades: Grades;
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};


export type QueryDatabaseArgs = {
  ref: Scalars['String'];
};


export type QueryRegisteringLevelsArgs = {
  course: Scalars['String'];
};


export type QueryApplicantArgs = {
  codigo: Scalars['ID'];
};


export type QueryScheduleArgs = {
  id: Scalars['String'];
};


export type QueryStudentArgs = {
  codigo: Scalars['ID'];
};


export type QueryTeacherArgs = {
  id: Scalars['ID'];
};


export type QueryGetWorkshopsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryGradesArgs = {
  codigo: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  title: Scalars['String'];
  options?: Maybe<Array<Maybe<AnswerOption>>>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  codigo: Scalars['ID'];
  nombre: Scalars['String'];
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  genero: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  grupo: Scalars['String'];
  schedule: Schedule;
};

export type Reservation = {
  __typename?: 'Reservation';
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  option_id: Scalars['String'];
  option_name: Scalars['String'];
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno: Scalars['String'];
  nivel: Scalars['String'];
  grupo: Scalars['String'];
};

export type Schedule = {
  __typename?: 'Schedule';
  group: Scalars['String'];
  teacher: Scalars['String'];
  entry: Scalars['String'];
  chat?: Maybe<Scalars['String']>;
  classroom?: Maybe<Scalars['String']>;
  sesiones?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  serialized: Scalars['String'];
};


export type ScheduleSerializedArgs = {
  options: SerializedOptions;
};

export type Section = {
  __typename?: 'Section';
  course: Scalars['String'];
  questions?: Maybe<Array<Maybe<Question>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SerializedOptions = {
  group?: Maybe<Scalars['Boolean']>;
  teacher?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['Boolean']>;
};

export type Student = {
  __typename?: 'Student';
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno: Scalars['String'];
  genero: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  curso: Scalars['String'];
  externo: Scalars['Boolean'];
  grupo: Scalars['String'];
  reservation?: Maybe<StudentReservation>;
};

export type StudentInput = {
  codigo: Scalars['ID'];
  nombre: Scalars['String'];
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  genero: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  grupo: Scalars['String'];
  externo: Scalars['Boolean'];
  curso: Scalars['String'];
};

export type StudentReservation = {
  __typename?: 'StudentReservation';
  id: Scalars['ID'];
  day: Scalars['String'];
  time: Scalars['String'];
  teacher_name: Scalars['String'];
  teacher_id: Scalars['ID'];
  workshop_name: Scalars['String'];
  workshop_id: Scalars['String'];
  url: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  name: Scalars['String'];
  options: Array<TeacherOption>;
};

export type TeacherOption = {
  __typename?: 'TeacherOption';
  id: Scalars['ID'];
  day: Scalars['String'];
  time: Scalars['String'];
  teacher_name: Scalars['String'];
  teacher_id: Scalars['String'];
  workshop_name: Scalars['String'];
  workshop_id: Scalars['String'];
  url: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
  reservations?: Maybe<Array<Reservation>>;
};

export type Workshop = {
  __typename?: 'Workshop';
  name: Scalars['String'];
  description: Scalars['String'];
  levels: Array<Scalars['String']>;
  options: Array<Option>;
};

export type WrittenResultsInput = {
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno?: Maybe<Scalars['String']>;
  genero: Scalars['String'];
  ciclo?: Maybe<Scalars['String']>;
  carrera?: Maybe<Scalars['String']>;
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel_escrito: Scalars['Int'];
  curso: Scalars['String'];
  externo: Scalars['Boolean'];
  reubicacion: Scalars['Boolean'];
};

export type FirebaseInput = {
  ref: Scalars['String'];
  data: Array<Maybe<Scalars['String']>>;
};

export type MeetLink = {
  __typename?: 'meetLink';
  id: Scalars['ID'];
  teacher: Scalars['String'];
  link: Scalars['String'];
  active: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnswerOption: ResolverTypeWrapper<AnswerOption>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Applicant: ResolverTypeWrapper<ApplicantModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ApplicantInput: ApplicantInput;
  ApplicantResponse: ResolverTypeWrapper<ApplicantResponse>;
  AttendingStudent: AttendingStudent;
  Carrera: ResolverTypeWrapper<Carrera>;
  CloseExamResponse: ResolverTypeWrapper<CloseExamResponse>;
  Grades: ResolverTypeWrapper<Grades>;
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Option: ResolverTypeWrapper<Option>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  RegisterResponse: ResolverTypeWrapper<Omit<RegisterResponse, 'schedule'> & { schedule: ResolversTypes['Schedule'] }>;
  Reservation: ResolverTypeWrapper<Reservation>;
  Schedule: ResolverTypeWrapper<ScheduleModel>;
  Section: ResolverTypeWrapper<Section>;
  SerializedOptions: SerializedOptions;
  Student: ResolverTypeWrapper<StudentModel>;
  StudentInput: StudentInput;
  StudentReservation: ResolverTypeWrapper<StudentReservationModel>;
  Teacher: ResolverTypeWrapper<TeacherModel>;
  TeacherOption: ResolverTypeWrapper<TeacherOption>;
  Workshop: ResolverTypeWrapper<Workshop>;
  WrittenResultsInput: WrittenResultsInput;
  firebaseInput: FirebaseInput;
  meetLink: ResolverTypeWrapper<MeetLink>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnswerOption: AnswerOption;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Applicant: ApplicantModel;
  ID: Scalars['ID'];
  ApplicantInput: ApplicantInput;
  ApplicantResponse: ApplicantResponse;
  AttendingStudent: AttendingStudent;
  Carrera: Carrera;
  CloseExamResponse: CloseExamResponse;
  Grades: Grades;
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: {};
  Int: Scalars['Int'];
  MutationResponse: MutationResponse;
  Option: Option;
  PageInfo: PageInfo;
  Query: {};
  Question: Question;
  RegisterResponse: Omit<RegisterResponse, 'schedule'> & { schedule: ResolversParentTypes['Schedule'] };
  Reservation: Reservation;
  Schedule: ScheduleModel;
  Section: Section;
  SerializedOptions: SerializedOptions;
  Student: StudentModel;
  StudentInput: StudentInput;
  StudentReservation: StudentReservationModel;
  Teacher: TeacherModel;
  TeacherOption: TeacherOption;
  Workshop: Workshop;
  WrittenResultsInput: WrittenResultsInput;
  firebaseInput: FirebaseInput;
  meetLink: MeetLink;
};

export type AnswerOptionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['AnswerOption'] = ResolversParentTypes['AnswerOption']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  correct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicantResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Applicant'] = ResolversParentTypes['Applicant']> = {
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  desertor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  registering?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schedules?: Resolver<Array<ResolversTypes['Schedule']>, ParentType, ContextType>;
  registeredSchedule?: Resolver<Maybe<ResolversTypes['Schedule']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicantResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ApplicantResponse'] = ResolversParentTypes['ApplicantResponse']> = {
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  desertor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CarreraResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Carrera'] = ResolversParentTypes['Carrera']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CloseExamResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['CloseExamResponse'] = ResolversParentTypes['CloseExamResponse']> = {
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GradesResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Grades'] = ResolversParentTypes['Grades']> = {
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  midterm_grammar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  midterm_oral?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  final_grammar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  final_oral?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshops?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cultural_task?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mini_project?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reading?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listening?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  final?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  saveWrittenResults?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationSaveWrittenResultsArgs, never>>;
  closeExam?: Resolver<Maybe<ResolversTypes['CloseExamResponse']>, ParentType, ContextType>;
  setRows?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetRowsArgs, never>>;
  setMeetLinks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationSetMeetLinksArgs, 'links'>>;
  setMeetLink?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationSetMeetLinkArgs, 'link'>>;
  removeMeetLink?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveMeetLinkArgs, 'link'>>;
  databaseSet?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDatabaseSetArgs, never>>;
  registerStudent?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterStudentArgs, 'input'>>;
  saveRegisteringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSaveRegisteringLevelsArgs, 'levels' | 'course'>>;
  saveApplicant?: Resolver<ResolversTypes['ApplicantResponse'], ParentType, ContextType, RequireFields<MutationSaveApplicantArgs, 'codigo' | 'input'>>;
  makeWorkshopReservation?: Resolver<ResolversTypes['StudentReservation'], ParentType, ContextType, RequireFields<MutationMakeWorkshopReservationArgs, 'codigo' | 'option_id' | 'teacher_id'>>;
  saveWorkshopsAttendance?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveWorkshopsAttendanceArgs, 'input' | 'option_id' | 'teacher_id'>>;
  resetReservations?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  setWorkshopLink?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetWorkshopLinkArgs, 'option_id' | 'url'>>;
};

export type MutationResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meetLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zoom_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  carreras?: Resolver<Maybe<Array<Maybe<ResolversTypes['Carrera']>>>, ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logOut?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  meetLinks?: Resolver<Array<Maybe<ResolversTypes['meetLink']>>, ParentType, ContextType>;
  section?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType, RequireFields<QuerySectionArgs, 'course' | 'level'>>;
  database?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, RequireFields<QueryDatabaseArgs, 'ref'>>;
  registeringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryRegisteringLevelsArgs, 'course'>>;
  applicant?: Resolver<ResolversTypes['Applicant'], ParentType, ContextType, RequireFields<QueryApplicantArgs, 'codigo'>>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<QueryScheduleArgs, 'id'>>;
  workshops?: Resolver<Array<ResolversTypes['Workshop']>, ParentType, ContextType>;
  student?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<QueryStudentArgs, 'codigo'>>;
  teacher?: Resolver<ResolversTypes['Teacher'], ParentType, ContextType, RequireFields<QueryTeacherArgs, 'id'>>;
  getWorkshopsByCategory?: Resolver<ResolversTypes['Workshop'], ParentType, ContextType, RequireFields<QueryGetWorkshopsByCategoryArgs, 'category'>>;
  grades?: Resolver<ResolversTypes['Grades'], ParentType, ContextType, RequireFields<QueryGradesArgs, 'codigo'>>;
};

export type QuestionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['AnswerOption']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grupo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReservationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Reservation'] = ResolversParentTypes['Reservation']> = {
  workshop_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grupo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = {
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entry?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classroom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sesiones?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serialized?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<ScheduleSerializedArgs, 'options'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  course?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  grupo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reservation?: Resolver<Maybe<ResolversTypes['StudentReservation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentReservationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['StudentReservation'] = ResolversParentTypes['StudentReservation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workshop_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zoom_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeacherResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Teacher'] = ResolversParentTypes['Teacher']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['TeacherOption']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeacherOptionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['TeacherOption'] = ResolversParentTypes['TeacherOption']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zoom_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reservations?: Resolver<Maybe<Array<ResolversTypes['Reservation']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkshopResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Workshop'] = ResolversParentTypes['Workshop']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  levels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeetLinkResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['meetLink'] = ResolversParentTypes['meetLink']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ServerContext> = {
  AnswerOption?: AnswerOptionResolvers<ContextType>;
  Applicant?: ApplicantResolvers<ContextType>;
  ApplicantResponse?: ApplicantResponseResolvers<ContextType>;
  Carrera?: CarreraResolvers<ContextType>;
  CloseExamResponse?: CloseExamResponseResolvers<ContextType>;
  Grades?: GradesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  StudentReservation?: StudentReservationResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
  TeacherOption?: TeacherOptionResolvers<ContextType>;
  Workshop?: WorkshopResolvers<ContextType>;
  meetLink?: MeetLinkResolvers<ContextType>;
};

