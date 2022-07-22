const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Post {
    _id: ID!
    title: String!
    createdAt: String!
  }
  input PostType {
    title: String!
  }
  type RootQuery {
    posts: [Post!]
    post(_id: String!): Post!
  }
  type Mutation {
    createPost(post:PostType): Post,
    deletePost(_id: String): Post,
    updatePost(_id: String, title: String): String
  }
  schema {
    query: RootQuery
    mutation: Mutation
  }
`);
