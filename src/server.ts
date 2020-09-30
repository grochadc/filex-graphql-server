const apollo = require("apollo-server");
const { ApolloServer } = apollo;
const FirebaseAPI = require("./datasources/firebaseREST");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      firebaseAPI: new FirebaseAPI(),
    };
  },
  cors: true,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
