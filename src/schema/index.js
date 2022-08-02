const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const {
  getClient,
  listClients,
  createClient,
  deleteClient,
} = require("../resolvers");

const {
  createProject,
  listProjects,
  deleteProject,
  updateProject,
  getProject,
} = require("../resolvers/project");

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

// Project type blueprint
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return getClient(parent.client);
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
    listProjects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return listProjects();
      },
    },
    getProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getProject(args.id);
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
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              not_started: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        client: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return createProject(args);
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return deleteProject(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectUpdateStatus",
            values: {
              not_started: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        client: { type: GraphQLID },
      },
      resolve(parent, args) {
        return updateProject(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
