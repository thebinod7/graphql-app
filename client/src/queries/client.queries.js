import { gql } from "@apollo/client";

const FETCH_CLIENTS = gql`
  query list {
    listClients {
      id
      name
      email
      phone
    }
  }
`;

export { FETCH_CLIENTS };
