import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { WorkshopOption, Teacher, Workshop, Student } from '../../node_modules/.prisma/client';
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
  Date: any;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  correct: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Applicant = {
  __typename?: 'Applicant';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  groups: Array<Group>;
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['Int'];
  nombre: Scalars['String'];
  registeredGroup?: Maybe<Group>;
  registering: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type ApplicantInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type AttendingStudent = {
  attended: Scalars['Boolean'];
  id: Scalars['ID'];
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


export enum Filter {
  All = 'ALL',
  Assigned = 'ASSIGNED',
  Nonassigned = 'NONASSIGNED'
}

export type Grades = {
  __typename?: 'Grades';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  codigo: Scalars['String'];
  cultural_task: Scalars['String'];
  final: Scalars['String'];
  final_grammar: Scalars['String'];
  final_oral: Scalars['String'];
  listening: Scalars['String'];
  midterm_grammar: Scalars['String'];
  midterm_oral: Scalars['String'];
  mini_project: Scalars['String'];
  nombre: Scalars['String'];
  reading: Scalars['String'];
  situation: Scalars['String'];
  workshops: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  aula: Scalars['String'];
  ciclo: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  teacher: Scalars['String'];
  time: Scalars['String'];
};

export type HomePageMessage = {
  __typename?: 'HomePageMessage';
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type MeetLinkInput = {
  active: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type MeetLinkInputWithId = {
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  closeExam?: Maybe<CloseExamResponse>;
  databaseSet: Scalars['Int'];
  editStudent: Student;
  makeWorkshopReservation: Reservation;
  registerStudent: RegisterResponse;
  removeMeetLink: Scalars['Int'];
  resetReservations: Scalars['Boolean'];
  saveApplicant: ApplicantResponse;
  saveOralResults: Scalars['Boolean'];
  saveRegisteringLevels: Array<Scalars['String']>;
  saveWorkshopsAttendance: Scalars['Boolean'];
  saveWrittenResults: MutationResponse;
  setMeetLink: Scalars['Int'];
  setMeetLinks: Scalars['Int'];
  setPlacementHomePageMessage: Scalars['Boolean'];
  setWorkshopLink: Scalars['Boolean'];
  toggleOpenWorkshops: Scalars['Boolean'];
};


export type MutationDatabaseSetArgs = {
  input?: Maybe<FirebaseInput>;
};


export type MutationEditStudentArgs = {
  changes?: Maybe<StudentChangesInput>;
  codigo: Scalars['ID'];
};


export type MutationMakeWorkshopReservationArgs = {
  option_id: Scalars['ID'];
  student_id: Scalars['ID'];
  tutorial_reason?: Maybe<Scalars['String']>;
};


export type MutationRegisterStudentArgs = {
  groupId: Scalars['Int'];
  input: StudentInput;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSaveApplicantArgs = {
  codigo: Scalars['String'];
  input: ApplicantInput;
};


export type MutationSaveOralResultsArgs = {
  input?: Maybe<OralResults>;
};


export type MutationSaveRegisteringLevelsArgs = {
  course: Scalars['String'];
  levels: Array<Scalars['String']>;
};


export type MutationSaveWorkshopsAttendanceArgs = {
  attendingStudents: Array<AttendingStudent>;
  option_id: Scalars['ID'];
  teacher_id: Scalars['ID'];
};


export type MutationSaveWrittenResultsArgs = {
  input?: Maybe<WrittenResultsInput>;
};


export type MutationSetMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSetMeetLinksArgs = {
  links: Array<MeetLinkInput>;
};


export type MutationSetPlacementHomePageMessageArgs = {
  input: PlacementHomePageMessageInput;
};


export type MutationSetWorkshopLinkArgs = {
  option_id: Scalars['ID'];
  url: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  id: Scalars['String'];
  meetLink?: Maybe<Scalars['String']>;
};

export type Option = {
  __typename?: 'Option';
  active: Scalars['Boolean'];
  available: Scalars['Boolean'];
  day: Scalars['String'];
  id: Scalars['ID'];
  isTutorial: Scalars['Boolean'];
  teacher: Teacher;
  time: Scalars['String'];
  url: Scalars['String'];
  workshop: Workshop;
  zoom_id?: Maybe<Scalars['String']>;
};

export type OralResults = {
  id: Scalars['ID'];
  nivelFinal: Scalars['Int'];
  nivelOral: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PlacementHomePageMessageInput = {
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  applicant: Applicant;
  carreras: Array<Carrera>;
  database?: Maybe<Array<Maybe<Scalars['String']>>>;
  getWorkshopsByCategory: Workshop;
  grades: Grades;
  group: Group;
  groups: Array<Group>;
  isClosed: Scalars['Boolean'];
  isWorkshopsOpen: Scalars['Boolean'];
  masterlist: Array<Student>;
  meetLinks: Array<MeetLink>;
  options: Array<Option>;
  paramQuery?: Maybe<Scalars['Boolean']>;
  placementHomePageMessage: HomePageMessage;
  registeringLevels: Array<Scalars['String']>;
  section: Section;
  student: Student;
  teacher: Teacher;
  teachers: Array<Teacher>;
  testResults: Array<Maybe<TestResults>>;
  workshops: Array<Workshop>;
};


export type QueryApplicantArgs = {
  codigo: Scalars['ID'];
};


export type QueryDatabaseArgs = {
  ref: Scalars['String'];
};


export type QueryGetWorkshopsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryGradesArgs = {
  codigo: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['Int'];
};


export type QueryMasterlistArgs = {
  ciclo: Scalars['String'];
};


export type QueryParamQueryArgs = {
  param?: Maybe<Scalars['String']>;
};


export type QueryRegisteringLevelsArgs = {
  course: Scalars['String'];
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};


export type QueryStudentArgs = {
  codigo: Scalars['ID'];
};


export type QueryTeacherArgs = {
  id: Scalars['ID'];
};


export type QueryTestResultsArgs = {
  filter?: Maybe<Filter>;
};

export type Question = {
  __typename?: 'Question';
  options: Array<AnswerOption>;
  title: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  genero: Scalars['String'];
  group: Group;
  grupo: Scalars['String'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  attended: Scalars['Boolean'];
  create_time: Scalars['Date'];
  id: Scalars['ID'];
  option: Option;
  student: Student;
  tutorialReason?: Maybe<Scalars['String']>;
};

export type Section = {
  __typename?: 'Section';
  course: Scalars['String'];
  pageInfo?: Maybe<PageInfo>;
  questions: Array<Question>;
};

export type SerializedOptions = {
  group?: Maybe<Scalars['Boolean']>;
  teacher?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['Boolean']>;
};

export type Student = {
  __typename?: 'Student';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  id: Scalars['Int'];
  nivel: Scalars['Int'];
  nombre: Scalars['String'];
  reservation?: Maybe<Reservation>;
  reservationCount: Scalars['Int'];
  reservationLimit: Scalars['Int'];
  telefono: Scalars['String'];
};

export type StudentChangesInput = {
  apellido_materno?: Maybe<Scalars['String']>;
  apellido_paterno?: Maybe<Scalars['String']>;
  carrera?: Maybe<Scalars['String']>;
  ciclo?: Maybe<Scalars['String']>;
  codigo?: Maybe<Scalars['String']>;
  curso?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externo?: Maybe<Scalars['Boolean']>;
  genero?: Maybe<Scalars['String']>;
  grupo?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  telefono?: Maybe<Scalars['String']>;
};

export type StudentInput = {
  apellido_materno?: Maybe<Scalars['String']>;
  apellido_paterno?: Maybe<Scalars['String']>;
  carrera?: Maybe<Scalars['String']>;
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externo?: Maybe<Scalars['Boolean']>;
  genero?: Maybe<Scalars['String']>;
  grupo?: Maybe<Scalars['String']>;
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['Int']>;
  nombre?: Maybe<Scalars['String']>;
  telefono?: Maybe<Scalars['String']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  nombre: Scalars['String'];
  options: Array<TeacherOption>;
};

export type TeacherOption = {
  __typename?: 'TeacherOption';
  available: Scalars['Boolean'];
  day: Scalars['String'];
  id: Scalars['ID'];
  isTutorial: Scalars['Boolean'];
  reservations: Array<Maybe<Reservation>>;
  teacher: Teacher;
  time: Scalars['String'];
  url: Scalars['String'];
  workshop: Workshop;
  zoom_id?: Maybe<Scalars['String']>;
};

export type TestResults = {
  __typename?: 'TestResults';
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  generated_id: Scalars['String'];
  genero: Scalars['String'];
  id: Scalars['ID'];
  institutionalEmail?: Maybe<Scalars['String']>;
  meetLink?: Maybe<Scalars['String']>;
  nivelEscrito: Scalars['Int'];
  nivelFinal?: Maybe<Scalars['Int']>;
  nivelOral?: Maybe<Scalars['Int']>;
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type Workshop = {
  __typename?: 'Workshop';
  description: Scalars['String'];
  id: Scalars['Int'];
  levels: Array<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Option>;
};

export type WrittenResultsInput = {
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivelEscrito: Scalars['Int'];
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type FirebaseInput = {
  data: Array<Maybe<Scalars['String']>>;
  ref: Scalars['String'];
};

export type MeetLink = {
  __typename?: 'meetLink';
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  teacher: Scalars['String'];
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
  Applicant: ResolverTypeWrapper<Applicant>;
  ApplicantInput: ApplicantInput;
  ApplicantResponse: ResolverTypeWrapper<ApplicantResponse>;
  AttendingStudent: AttendingStudent;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Carrera: ResolverTypeWrapper<Carrera>;
  CloseExamResponse: ResolverTypeWrapper<CloseExamResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Filter: Filter;
  Grades: ResolverTypeWrapper<Grades>;
  Group: ResolverTypeWrapper<Group>;
  HomePageMessage: ResolverTypeWrapper<HomePageMessage>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Option: ResolverTypeWrapper<WorkshopOption>;
  OralResults: OralResults;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PlacementHomePageMessageInput: PlacementHomePageMessageInput;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  Reservation: ResolverTypeWrapper<Omit<Reservation, 'option' | 'student'> & { option: ResolversTypes['Option'], student: ResolversTypes['Student'] }>;
  Section: ResolverTypeWrapper<Section>;
  SerializedOptions: SerializedOptions;
  String: ResolverTypeWrapper<Scalars['String']>;
  Student: ResolverTypeWrapper<Student>;
  StudentChangesInput: StudentChangesInput;
  StudentInput: StudentInput;
  Teacher: ResolverTypeWrapper<Teacher>;
  TeacherOption: ResolverTypeWrapper<WorkshopOption>;
  TestResults: ResolverTypeWrapper<TestResults>;
  Workshop: ResolverTypeWrapper<Workshop>;
  WrittenResultsInput: WrittenResultsInput;
  firebaseInput: FirebaseInput;
  meetLink: ResolverTypeWrapper<MeetLink>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnswerOption: AnswerOption;
  Applicant: Applicant;
  ApplicantInput: ApplicantInput;
  ApplicantResponse: ApplicantResponse;
  AttendingStudent: AttendingStudent;
  Boolean: Scalars['Boolean'];
  Carrera: Carrera;
  CloseExamResponse: CloseExamResponse;
  Date: Scalars['Date'];
  Grades: Grades;
  Group: Group;
  HomePageMessage: HomePageMessage;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: {};
  MutationResponse: MutationResponse;
  Option: WorkshopOption;
  OralResults: OralResults;
  PageInfo: PageInfo;
  PlacementHomePageMessageInput: PlacementHomePageMessageInput;
  Query: {};
  Question: Question;
  RegisterResponse: RegisterResponse;
  Reservation: Omit<Reservation, 'option' | 'student'> & { option: ResolversParentTypes['Option'], student: ResolversParentTypes['Student'] };
  Section: Section;
  SerializedOptions: SerializedOptions;
  String: Scalars['String'];
  Student: Student;
  StudentChangesInput: StudentChangesInput;
  StudentInput: StudentInput;
  Teacher: Teacher;
  TeacherOption: WorkshopOption;
  TestResults: TestResults;
  Workshop: Workshop;
  WrittenResultsInput: WrittenResultsInput;
  firebaseInput: FirebaseInput;
  meetLink: MeetLink;
};

export type AnswerOptionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['AnswerOption'] = ResolversParentTypes['AnswerOption']> = {
  correct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicantResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Applicant'] = ResolversParentTypes['Applicant']> = {
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desertor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registeredGroup?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType>;
  registering?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicantResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ApplicantResponse'] = ResolversParentTypes['ApplicantResponse']> = {
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desertor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GradesResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Grades'] = ResolversParentTypes['Grades']> = {
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cultural_task?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  final?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  final_grammar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  final_oral?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listening?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  midterm_grammar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  midterm_oral?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mini_project?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reading?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  situation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshops?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  aula?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePageMessageResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['HomePageMessage'] = ResolversParentTypes['HomePageMessage']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  closeExam?: Resolver<Maybe<ResolversTypes['CloseExamResponse']>, ParentType, ContextType>;
  databaseSet?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDatabaseSetArgs, never>>;
  editStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationEditStudentArgs, 'codigo'>>;
  makeWorkshopReservation?: Resolver<ResolversTypes['Reservation'], ParentType, ContextType, RequireFields<MutationMakeWorkshopReservationArgs, 'option_id' | 'student_id'>>;
  registerStudent?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterStudentArgs, 'groupId' | 'input'>>;
  removeMeetLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationRemoveMeetLinkArgs, 'link'>>;
  resetReservations?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  saveApplicant?: Resolver<ResolversTypes['ApplicantResponse'], ParentType, ContextType, RequireFields<MutationSaveApplicantArgs, 'codigo' | 'input'>>;
  saveOralResults?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveOralResultsArgs, never>>;
  saveRegisteringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSaveRegisteringLevelsArgs, 'course' | 'levels'>>;
  saveWorkshopsAttendance?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveWorkshopsAttendanceArgs, 'attendingStudents' | 'option_id' | 'teacher_id'>>;
  saveWrittenResults?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSaveWrittenResultsArgs, never>>;
  setMeetLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSetMeetLinkArgs, 'link'>>;
  setMeetLinks?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSetMeetLinksArgs, 'links'>>;
  setPlacementHomePageMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetPlacementHomePageMessageArgs, 'input'>>;
  setWorkshopLink?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetWorkshopLinkArgs, 'option_id' | 'url'>>;
  toggleOpenWorkshops?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type MutationResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meetLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isTutorial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['Teacher'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop?: Resolver<ResolversTypes['Workshop'], ParentType, ContextType>;
  zoom_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  applicant?: Resolver<ResolversTypes['Applicant'], ParentType, ContextType, RequireFields<QueryApplicantArgs, 'codigo'>>;
  carreras?: Resolver<Array<ResolversTypes['Carrera']>, ParentType, ContextType>;
  database?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, RequireFields<QueryDatabaseArgs, 'ref'>>;
  getWorkshopsByCategory?: Resolver<ResolversTypes['Workshop'], ParentType, ContextType, RequireFields<QueryGetWorkshopsByCategoryArgs, 'category'>>;
  grades?: Resolver<ResolversTypes['Grades'], ParentType, ContextType, RequireFields<QueryGradesArgs, 'codigo'>>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<QueryGroupArgs, 'id'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isWorkshopsOpen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  masterlist?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryMasterlistArgs, 'ciclo'>>;
  meetLinks?: Resolver<Array<ResolversTypes['meetLink']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType>;
  paramQuery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryParamQueryArgs, never>>;
  placementHomePageMessage?: Resolver<ResolversTypes['HomePageMessage'], ParentType, ContextType>;
  registeringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryRegisteringLevelsArgs, 'course'>>;
  section?: Resolver<ResolversTypes['Section'], ParentType, ContextType, RequireFields<QuerySectionArgs, 'course' | 'level'>>;
  student?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<QueryStudentArgs, 'codigo'>>;
  teacher?: Resolver<ResolversTypes['Teacher'], ParentType, ContextType, RequireFields<QueryTeacherArgs, 'id'>>;
  teachers?: Resolver<Array<ResolversTypes['Teacher']>, ParentType, ContextType>;
  testResults?: Resolver<Array<Maybe<ResolversTypes['TestResults']>>, ParentType, ContextType, RequireFields<QueryTestResultsArgs, never>>;
  workshops?: Resolver<Array<ResolversTypes['Workshop']>, ParentType, ContextType>;
};

export type QuestionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  options?: Resolver<Array<ResolversTypes['AnswerOption']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  grupo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReservationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Reservation'] = ResolversParentTypes['Reservation']> = {
  attended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  create_time?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  option?: Resolver<ResolversTypes['Option'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['Student'], ParentType, ContextType>;
  tutorialReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  course?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grupo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reservation?: Resolver<Maybe<ResolversTypes['Reservation']>, ParentType, ContextType>;
  reservationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reservationLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeacherResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Teacher'] = ResolversParentTypes['Teacher']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['TeacherOption']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeacherOptionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['TeacherOption'] = ResolversParentTypes['TeacherOption']> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isTutorial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reservations?: Resolver<Array<Maybe<ResolversTypes['Reservation']>>, ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['Teacher'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workshop?: Resolver<ResolversTypes['Workshop'], ParentType, ContextType>;
  zoom_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResultsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['TestResults'] = ResolversParentTypes['TestResults']> = {
  apellidoMaterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellidoPaterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  generated_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institutionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meetLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nivelEscrito?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nivelFinal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nivelOral?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reubicacion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkshopResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Workshop'] = ResolversParentTypes['Workshop']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  levels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeetLinkResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['meetLink'] = ResolversParentTypes['meetLink']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ServerContext> = {
  AnswerOption?: AnswerOptionResolvers<ContextType>;
  Applicant?: ApplicantResolvers<ContextType>;
  ApplicantResponse?: ApplicantResponseResolvers<ContextType>;
  Carrera?: CarreraResolvers<ContextType>;
  CloseExamResponse?: CloseExamResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Grades?: GradesResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  HomePageMessage?: HomePageMessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
  TeacherOption?: TeacherOptionResolvers<ContextType>;
  TestResults?: TestResultsResolvers<ContextType>;
  Workshop?: WorkshopResolvers<ContextType>;
  meetLink?: MeetLinkResolvers<ContextType>;
};

