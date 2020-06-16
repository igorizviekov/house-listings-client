import { gql } from "apollo-boost";

export const LOG_OUT = gql`
  mutation Logout {
    logout {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
