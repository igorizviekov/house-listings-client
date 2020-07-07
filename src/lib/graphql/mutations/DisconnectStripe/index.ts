import { gql } from "apollo-boost";

export const DISCONNECT_STRIPE = gql`
  mutation DisconnectStipe {
    disconnectStripe {
      hasWallet
    }
  }
`;
