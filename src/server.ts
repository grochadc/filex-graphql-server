import { ApolloServer } from "apollo-server";
require("dotenv").config();
import {
  FirebaseAPI,
  RegistroAPI,
  ExamAPI,
  WorkshopsAPI,
  StudentsAPI,
  PlacementAPI,
  PlacementSheetsAPI,
  SheetsAPI,
} from "./datasources";

const server = new ApolloServer({
  modules: [
    require("./modules/placement_exam"),
    require("./modules/placement_settings"),
    require("./modules/test_questions"),
    require("./modules/firebase_api"),
    require("./modules/registro"),
    require("./modules/workshops"),
    require("./modules/grades"),
  ],
  dataSources: () => {
    return {
      firebaseAPI: new FirebaseAPI(),
      registroAPI: new RegistroAPI(),
      examAPI: new ExamAPI(),
      workshopsAPI: new WorkshopsAPI(),
      studentsAPI: new StudentsAPI(),
      placementAPI: new PlacementAPI(),
      placementSheetsAPI: new PlacementSheetsAPI(
        "1wwQwKIHwQV2lJGweCXscO6Z6YiK4CKwNvzF0S6Z7eAE"
      ),
      registroSheetsAPI: new SheetsAPI(
        "1p7likU0aa7n7EiRxTHtdvfpd-uMg3QM8VY3Kz4ld5og"
      ),
      workshopsSheetsAPI: new SheetsAPI(
        "1AezhkIpOJ-rWg88jGbZb89DI2aSRtRTD4hlQcVF2thQ"
      ),
    };
  },
  cors: true,
  introspection: true,
  playground: true,
  context: ({req}) => {
    const clientEnviroment = req.headers['client-enviroment']
    return {enviroment: clientEnviroment};
  },
});

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
