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
  institucionalEmail?: Maybe<Scalars['String']>;
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
  institucionalEmail?: Maybe<Scalars['String']>;
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
  institucionalEmail?: Maybe<Scalars['String']>;
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
  situation: Scalars['String'];
};

export type HomePageMessage = {
  __typename?: 'HomePageMessage';
  active: Scalars['Boolean'];
  message: Scalars['String'];
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
  saveWrittenResults: MutationResponse;
  closeExam?: Maybe<CloseExamResponse>;
  setMeetLinks: Scalars['Int'];
  setMeetLink: Scalars['Int'];
  removeMeetLink: Scalars['Int'];
  setPlacementHomePageMessage: Scalars['Boolean'];
  databaseSet: Scalars['Int'];
  registerStudent: RegisterResponse;
  saveRegisteringLevels: Array<Scalars['String']>;
  saveApplicant: ApplicantResponse;
  toggleOpenWorkshops: Scalars['Boolean'];
  makeWorkshopReservation: StudentReservation;
  saveWorkshopsAttendance: Scalars['Boolean'];
  resetReservations: Scalars['Boolean'];
  setWorkshopLink: Scalars['Boolean'];
  addStudent: Student;
  editStudent: Student;
};


export type MutationSaveWrittenResultsArgs = {
  input?: Maybe<WrittenResultsInput>;
};


export type MutationSetMeetLinksArgs = {
  links: Array<MeetLinkInput>;
};


export type MutationSetMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSetPlacementHomePageMessageArgs = {
  input: PlacementHomePageMessageInput;
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
  student_id: Scalars['ID'];
  option_id: Scalars['ID'];
  tutorial_reason?: Maybe<Scalars['String']>;
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


export type MutationAddStudentArgs = {
  student: StudentInput;
};


export type MutationEditStudentArgs = {
  codigo: Scalars['ID'];
  changes?: Maybe<StudentChangesInput>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  id: Scalars['String'];
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
  isTutorial: Scalars['Boolean'];
  available: Scalars['Boolean'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PlacementHomePageMessageInput = {
  message: Scalars['String'];
  active: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  carreras: Array<Carrera>;
  isClosed: Scalars['Boolean'];
  placementHomePageMessage: HomePageMessage;
  meetLinks: Array<MeetLink>;
  section: Section;
  database?: Maybe<Array<Maybe<Scalars['String']>>>;
  registeringLevels: Array<Scalars['String']>;
  applicant: Applicant;
  schedule: Schedule;
  paramQuery?: Maybe<Scalars['Boolean']>;
  options: Array<Option>;
  workshops: Array<Workshop>;
  teacher: Teacher;
  teachers: Array<Teacher>;
  getWorkshopsByCategory: Workshop;
  isWorkshopsOpen: Scalars['Boolean'];
  grades: Grades;
  student: Student;
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


export type QueryParamQueryArgs = {
  param?: Maybe<Scalars['String']>;
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


export type QueryStudentArgs = {
  codigo: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  title: Scalars['String'];
  options: Array<AnswerOption>;
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
  id: Scalars['ID'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  option_id: Scalars['String'];
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  nivel: Scalars['String'];
  grupo: Scalars['String'];
  tutorial_reason?: Maybe<Scalars['String']>;
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
  questions: Array<Question>;
  pageInfo?: Maybe<PageInfo>;
};

export type SerializedOptions = {
  group?: Maybe<Scalars['Boolean']>;
  teacher?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['Boolean']>;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
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

export type StudentChangesInput = {
  codigo?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  apellido_paterno?: Maybe<Scalars['String']>;
  apellido_materno?: Maybe<Scalars['String']>;
  genero?: Maybe<Scalars['String']>;
  carrera?: Maybe<Scalars['String']>;
  ciclo?: Maybe<Scalars['String']>;
  telefono?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['String']>;
  grupo?: Maybe<Scalars['String']>;
  externo?: Maybe<Scalars['Boolean']>;
  curso?: Maybe<Scalars['String']>;
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
  institucionalEmail?: Maybe<Scalars['String']>;
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


export type TeacherOptionsArgs = {
  sorted?: Maybe<Scalars['Boolean']>;
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
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  levels: Array<Scalars['String']>;
  options: Array<Option>;
};

export type WrittenResultsInput = {
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellido_paterno: Scalars['String'];
  apellido_materno: Scalars['String'];
  genero: Scalars['String'];
  ciclo: Scalars['String'];
  carrera: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
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
  HomePageMessage: ResolverTypeWrapper<HomePageMessage>;
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Option: ResolverTypeWrapper<Option>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PlacementHomePageMessageInput: PlacementHomePageMessageInput;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  RegisterResponse: ResolverTypeWrapper<Omit<RegisterResponse, 'schedule'> & { schedule: ResolversTypes['Schedule'] }>;
  Reservation: ResolverTypeWrapper<Reservation>;
  Schedule: ResolverTypeWrapper<ScheduleModel>;
  Section: ResolverTypeWrapper<Section>;
  SerializedOptions: SerializedOptions;
  Student: ResolverTypeWrapper<StudentModel>;
  StudentChangesInput: StudentChangesInput;
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
  HomePageMessage: HomePageMessage;
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: {};
  Int: Scalars['Int'];
  MutationResponse: MutationResponse;
  Option: Option;
  PageInfo: PageInfo;
  PlacementHomePageMessageInput: PlacementHomePageMessageInput;
  Query: {};
  Question: Question;
  RegisterResponse: Omit<RegisterResponse, 'schedule'> & { schedule: ResolversParentTypes['Schedule'] };
  Reservation: Reservation;
  Schedule: ScheduleModel;
  Section: Section;
  SerializedOptions: SerializedOptions;
  Student: StudentModel;
  StudentChangesInput: StudentChangesInput;
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
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  situation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePageMessageResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['HomePageMessage'] = ResolversParentTypes['HomePageMessage']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  saveWrittenResults?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSaveWrittenResultsArgs, never>>;
  closeExam?: Resolver<Maybe<ResolversTypes['CloseExamResponse']>, ParentType, ContextType>;
  setMeetLinks?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSetMeetLinksArgs, 'links'>>;
  setMeetLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSetMeetLinkArgs, 'link'>>;
  removeMeetLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationRemoveMeetLinkArgs, 'link'>>;
  setPlacementHomePageMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetPlacementHomePageMessageArgs, 'input'>>;
  databaseSet?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDatabaseSetArgs, never>>;
  registerStudent?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterStudentArgs, 'input'>>;
  saveRegisteringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSaveRegisteringLevelsArgs, 'levels' | 'course'>>;
  saveApplicant?: Resolver<ResolversTypes['ApplicantResponse'], ParentType, ContextType, RequireFields<MutationSaveApplicantArgs, 'codigo' | 'input'>>;
  toggleOpenWorkshops?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  makeWorkshopReservation?: Resolver<ResolversTypes['StudentReservation'], ParentType, ContextType, RequireFields<MutationMakeWorkshopReservationArgs, 'student_id' | 'option_id'>>;
  saveWorkshopsAttendance?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveWorkshopsAttendanceArgs, 'input' | 'option_id' | 'teacher_id'>>;
  resetReservations?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  setWorkshopLink?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetWorkshopLinkArgs, 'option_id' | 'url'>>;
  addStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationAddStudentArgs, 'student'>>;
  editStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationEditStudentArgs, 'codigo'>>;
};

export type MutationResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  isTutorial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  carreras?: Resolver<Array<ResolversTypes['Carrera']>, ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  placementHomePageMessage?: Resolver<ResolversTypes['HomePageMessage'], ParentType, ContextType>;
  meetLinks?: Resolver<Array<ResolversTypes['meetLink']>, ParentType, ContextType>;
  section?: Resolver<ResolversTypes['Section'], ParentType, ContextType, RequireFields<QuerySectionArgs, 'course' | 'level'>>;
  database?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, RequireFields<QueryDatabaseArgs, 'ref'>>;
  registeringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryRegisteringLevelsArgs, 'course'>>;
  applicant?: Resolver<ResolversTypes['Applicant'], ParentType, ContextType, RequireFields<QueryApplicantArgs, 'codigo'>>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<QueryScheduleArgs, 'id'>>;
  paramQuery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryParamQueryArgs, never>>;
  options?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType>;
  workshops?: Resolver<Array<ResolversTypes['Workshop']>, ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['Teacher'], ParentType, ContextType, RequireFields<QueryTeacherArgs, 'id'>>;
  teachers?: Resolver<Array<ResolversTypes['Teacher']>, ParentType, ContextType>;
  getWorkshopsByCategory?: Resolver<ResolversTypes['Workshop'], ParentType, ContextType, RequireFields<QueryGetWorkshopsByCategoryArgs, 'category'>>;
  isWorkshopsOpen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  grades?: Resolver<ResolversTypes['Grades'], ParentType, ContextType, RequireFields<QueryGradesArgs, 'codigo'>>;
  student?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<QueryStudentArgs, 'codigo'>>;
};

export type QuestionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['AnswerOption']>, ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workshop_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grupo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tutorial_reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
  options?: Resolver<Array<ResolversTypes['TeacherOption']>, ParentType, ContextType, RequireFields<TeacherOptionsArgs, never>>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
  HomePageMessage?: HomePageMessageResolvers<ContextType>;
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

