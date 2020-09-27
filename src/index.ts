const apollo = require("apollo-server");
const db = require("./db.js");
const { ApolloServer } = apollo;
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers, cors: true });

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
