/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings {
  __typename: "Listing";
  _id: string;
  title: string | null;
  address: string | null;
  image: string | null;
  rating: number | null;
  numOfBeds: number | null;
  numOfBaths: number | null;
  price: number | null;
}

export interface Listings {
  listings: Listings_listings[];
}
