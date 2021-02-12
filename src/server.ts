import { ApolloServer } from "apollo-server";
require("dotenv").config();
import {
  FirebaseAPI,
  RegistroAPI,
  ExamAPI,
  WorkshopsAPI,
  StudentsAPI,
} from "./datasources";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

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
    };
  },
  cors: true,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
