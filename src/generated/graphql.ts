import { GraphQLResolveInfo } from 'graphql';
import { WorkshopOption, Teacher as TeacherModel, Workshop as WorkshopModel, Student as StudentModel } from '../../node_modules/.prisma/client';
import { Applicant as ApplicantModel, Group as GroupModel, Reservation as ReservationModel } from '../node_modules/.prisma/client';
import { ServerContext } from '../server';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  correct: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Applicant = {
  __typename?: 'Applicant';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  cicloIngreso: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  id: Scalars['ID'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type ApplicantInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  cicloIngreso: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  telefono: Scalars['String'];
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

export type EnrolledStudent = {
  __typename?: 'EnrolledStudent';
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
  group: Group;
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export enum Filter {
  All = 'ALL',
  Assigned = 'ASSIGNED',
  Nonassigned = 'NONASSIGNED'
}

export type Group = {
  __typename?: 'Group';
  aula: Scalars['String'];
  ciclo: Scalars['String'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
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
  registerStudent: RegisterResponse;
  removeMeetLink: Scalars['Int'];
  saveOralResults: Scalars['Boolean'];
  saveRegisteringLevels: Array<Scalars['String']>;
  saveWrittenResults: MutationResponse;
  setMeetLink: Scalars['Int'];
  setMeetLinks: Scalars['Int'];
  setPlacementHomePageMessage: Scalars['Boolean'];
};


export type MutationDatabaseSetArgs = {
  input?: Maybe<FirebaseInput>;
};


export type MutationRegisterStudentArgs = {
  groupId: Scalars['String'];
  input: StudentInput;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSaveOralResultsArgs = {
  input?: Maybe<OralResults>;
};


export type MutationSaveRegisteringLevelsArgs = {
  course: Scalars['String'];
  levels: Array<Scalars['String']>;
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

export type MutationResponse = {
  __typename?: 'MutationResponse';
  id: Scalars['String'];
  meetLink?: Maybe<Scalars['String']>;
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
  group: Group;
  groups: Array<Group>;
  isClosed: Scalars['Boolean'];
  masterlist: Array<EnrolledStudent>;
  meetLinks: Array<MeetLink>;
  placementHomePageMessage: HomePageMessage;
  registeringLevels: Array<Scalars['String']>;
  section: Section;
  testResults: Array<Maybe<TestResults>>;
  unenrolledStudent: UnenrolledStudent;
};


export type QueryApplicantArgs = {
  codigo: Scalars['ID'];
};


export type QueryDatabaseArgs = {
  ref: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryMasterlistArgs = {
  ciclo: Scalars['String'];
};


export type QueryRegisteringLevelsArgs = {
  course: Scalars['String'];
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};


export type QueryTestResultsArgs = {
  filter?: Maybe<Filter>;
};


export type QueryUnenrolledStudentArgs = {
  cicloActual: Scalars['String'];
  codigo: Scalars['ID'];
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

export type StudentInput = {
  cicloActual: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  grupo: Scalars['String'];
  nivel: Scalars['Int'];
};

export type TestResults = {
  __typename?: 'TestResults';
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
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

export type UnenrolledStudent = {
  __typename?: 'UnenrolledStudent';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  cicloIngreso: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  groups: Array<Maybe<Group>>;
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['Int'];
  nombre: Scalars['String'];
  registeredGroup?: Maybe<Group>;
  registering: Scalars['Boolean'];
  telefono: Scalars['String'];
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Carrera: ResolverTypeWrapper<Carrera>;
  CloseExamResponse: ResolverTypeWrapper<CloseExamResponse>;
  EnrolledStudent: ResolverTypeWrapper<EnrolledStudent>;
  Filter: Filter;
  Group: ResolverTypeWrapper<Group>;
  HomePageMessage: ResolverTypeWrapper<HomePageMessage>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  OralResults: OralResults;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PlacementHomePageMessageInput: PlacementHomePageMessageInput;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  Section: ResolverTypeWrapper<Section>;
  SerializedOptions: SerializedOptions;
  String: ResolverTypeWrapper<Scalars['String']>;
  StudentInput: StudentInput;
  TestResults: ResolverTypeWrapper<TestResults>;
  UnenrolledStudent: ResolverTypeWrapper<StudentModel>;
  WrittenResultsInput: WrittenResultsInput;
  firebaseInput: FirebaseInput;
  meetLink: ResolverTypeWrapper<MeetLink>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnswerOption: AnswerOption;
  Applicant: Applicant;
  ApplicantInput: ApplicantInput;
  Boolean: Scalars['Boolean'];
  Carrera: Carrera;
  CloseExamResponse: CloseExamResponse;
  EnrolledStudent: EnrolledStudent;
  Group: Group;
  HomePageMessage: HomePageMessage;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MeetLinkInput: MeetLinkInput;
  MeetLinkInputWithID: MeetLinkInputWithId;
  Mutation: {};
  MutationResponse: MutationResponse;
  OralResults: OralResults;
  PageInfo: PageInfo;
  PlacementHomePageMessageInput: PlacementHomePageMessageInput;
  Query: {};
  Question: Question;
  RegisterResponse: RegisterResponse;
  Section: Section;
  SerializedOptions: SerializedOptions;
  String: Scalars['String'];
  StudentInput: StudentInput;
  TestResults: TestResults;
  UnenrolledStudent: StudentModel;
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
  cicloIngreso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type EnrolledStudentResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['EnrolledStudent'] = ResolversParentTypes['EnrolledStudent']> = {
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
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  aula?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  registerStudent?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterStudentArgs, 'groupId' | 'input'>>;
  removeMeetLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationRemoveMeetLinkArgs, 'link'>>;
  saveOralResults?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveOralResultsArgs, never>>;
  saveRegisteringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSaveRegisteringLevelsArgs, 'course' | 'levels'>>;
  saveWrittenResults?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationSaveWrittenResultsArgs, never>>;
  setMeetLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSetMeetLinkArgs, 'link'>>;
  setMeetLinks?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSetMeetLinksArgs, 'links'>>;
  setPlacementHomePageMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetPlacementHomePageMessageArgs, 'input'>>;
};

export type MutationResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meetLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<QueryGroupArgs, 'id'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  masterlist?: Resolver<Array<ResolversTypes['EnrolledStudent']>, ParentType, ContextType, RequireFields<QueryMasterlistArgs, 'ciclo'>>;
  meetLinks?: Resolver<Array<ResolversTypes['meetLink']>, ParentType, ContextType>;
  placementHomePageMessage?: Resolver<ResolversTypes['HomePageMessage'], ParentType, ContextType>;
  registeringLevels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryRegisteringLevelsArgs, 'course'>>;
  section?: Resolver<ResolversTypes['Section'], ParentType, ContextType, RequireFields<QuerySectionArgs, 'course' | 'level'>>;
  testResults?: Resolver<Array<Maybe<ResolversTypes['TestResults']>>, ParentType, ContextType, RequireFields<QueryTestResultsArgs, never>>;
  unenrolledStudent?: Resolver<ResolversTypes['UnenrolledStudent'], ParentType, ContextType, RequireFields<QueryUnenrolledStudentArgs, 'cicloActual' | 'codigo'>>;
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

export type SectionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  course?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResultsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['TestResults'] = ResolversParentTypes['TestResults']> = {
  apellidoMaterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellidoPaterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ciclo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type UnenrolledStudentResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UnenrolledStudent'] = ResolversParentTypes['UnenrolledStudent']> = {
  apellido_materno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apellido_paterno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carrera?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cicloIngreso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codigo?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  curso?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desertor?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  genero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Array<Maybe<ResolversTypes['Group']>>, ParentType, ContextType>;
  institucionalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nivel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registeredGroup?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType>;
  registering?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  telefono?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  Carrera?: CarreraResolvers<ContextType>;
  CloseExamResponse?: CloseExamResponseResolvers<ContextType>;
  EnrolledStudent?: EnrolledStudentResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  HomePageMessage?: HomePageMessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  TestResults?: TestResultsResolvers<ContextType>;
  UnenrolledStudent?: UnenrolledStudentResolvers<ContextType>;
  meetLink?: MeetLinkResolvers<ContextType>;
};

