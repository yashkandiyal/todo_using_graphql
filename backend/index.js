// npm install @apollo/server graphql
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./schema/resolvers.js";
import typeDefs from "./schema/typeDefs.js";
import cors from "cors";
import mongoose from "mongoose";

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: {
    origin: "http://localhost:5173",
  },
});
mongoose
  .connect("mongodb://localhost:27017/todousingmerng")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

console.log(`🚀  Server ready at ${url}`);
