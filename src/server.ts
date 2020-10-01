const apollo = require("apollo-server");
const { ApolloServer } = apollo;
const firebase = require("firebase/app");
require("firebase/database");
require("dotenv").config();
const FirebaseAPI = require("./datasources/firebaseREST");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const optionLoader = require("./loaders/OptionLoader");

const firebaseClient = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      firebaseAPI: new FirebaseAPI(),
    };
  },
  context: () => ({
    loaders: {
      optionLoader: optionLoader(),
    },
    firebase,
  }),
  cors: true,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
