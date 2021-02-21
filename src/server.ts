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
} from "./datasources";

const server = new ApolloServer({
  modules: [
    require("./modules/placement_exam"),
    require("./modules/placement_settings"),
    require("./modules/test_questions"),
    require("./modules/firebase_api"),
    require("./modules/registro"),
    require("./modules/workshops"),
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
    };
  },
  cors: true,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
