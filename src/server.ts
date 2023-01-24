import { ApolloServer } from "apollo-server";
import db from "./datasources/database";
import Carousel from "./utils/Carousel";
import {
  FirebaseAPI,
  RegistroAPI,
  ExamAPI,
  StudentsAPI,
  PlacementAPI,
} from "./datasources";

import { PrismaClient } from "@prisma/client";

require("dotenv").config();

//add datasources both here and on server object
export type DataSourcesType = {
  firebaseAPI: FirebaseAPI;
  registroAPI: RegistroAPI;
  examAPI: ExamAPI;
  studentsAPI: StudentsAPI;
  placementAPI: PlacementAPI;
  //placementSheetsAPI: PlacementSheetsAPI;
  //registroSheetsAPI: SheetsAPI;
  //workshopsSheetsAPI: SheetsAPI;
  //databaseAPI: DatabaseAPI;
};

export type ServerContext = {
  dataSources: DataSourcesType;
  carousel: Carousel;
  enviroment: "dev" | "prod";
};

//carousel has to be constructed here because context rebuilds on every request
const carousel = new Carousel();
const prisma = new PrismaClient();

const server = new ApolloServer({
  modules: [
    require("./modules/placement_exam"),
    require("./modules/placement_settings"),
    require("./modules/test_questions"),
    require("./modules/firebase_api"),
    require("./modules/registro"),
  ],
  dataSources: () => {
    const result = {
      firebaseAPI: new FirebaseAPI(),
      registroAPI: new RegistroAPI(prisma, db),
      examAPI: new ExamAPI(),
      studentsAPI: new StudentsAPI(db, prisma),
      placementAPI: new PlacementAPI(prisma, db),
    };
    return result;
  },
  cors: true,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const clientEnviroment = req.headers["client-enviroment"];
    return { enviroment: clientEnviroment, carousel };
  },
});

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
