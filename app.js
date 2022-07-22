const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const config = require("config");

const graphQlSchema = require("./src/schema");
const graphQlResolvers = require("./src/resolvers");

const DB_URL = config.get("app.db_url");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(DB_URL, options)
  .then(() => app.listen(4000, console.log("Server is listening on 4000")))
  .catch((error) => {
    throw error;
  });
