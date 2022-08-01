const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { clients, projects } = require("./sampleData");

const {
  getClient,
  listClients,
  createClient,
  deleteClient,
} = require("../resolvers");

// Client type blueprint
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return "abc"; // getClient(parent.client)
      },
    },
  }),
});

// List of query commands i.e. READ
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getClient: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getClient(args.id);
      },
    },
    listClients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return listClients();
      },
    },
    getProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((f) => f.id === args.id);
      },
    },
  },
});

// List of mutation commands i.e. WRITE
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return createClient(args);
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return deleteClient(args.id);
      },
    },
    updateClient: {},
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
