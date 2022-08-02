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

export { FETCH_PROJECTS };
