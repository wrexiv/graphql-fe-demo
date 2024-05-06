import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      name
    }
  }
`;

export { GET_USERS };
