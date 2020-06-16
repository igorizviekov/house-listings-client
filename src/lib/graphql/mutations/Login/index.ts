import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
