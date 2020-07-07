/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StripeInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: ConnectStipe
// ====================================================

export interface ConnectStipe_connectStripe {
  __typename: "Viewer";
  hasWallet: boolean | null;
}

export interface ConnectStipe {
  connectStripe: ConnectStipe_connectStripe;
}

export interface ConnectStipeVariables {
  input: StripeInput;
}
