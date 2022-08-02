import { gql } from "@apollo/client";

const FETCH_PROJECTS = gql`
  query fetchProjects {
    listProjects {
      id
      name
      status
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { FETCH_PROJECTS, GET_PROJECT };
