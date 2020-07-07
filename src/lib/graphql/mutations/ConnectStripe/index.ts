import { gql } from "apollo-boost";

export const CONNECT_STRIPE = gql`
  mutation ConnectStipe($input: StripeInput!) {
    connectStripe(input: $input) {
      hasWallet
    }
  }
`;
