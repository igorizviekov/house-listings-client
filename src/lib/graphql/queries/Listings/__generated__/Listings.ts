/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingsFilter, ListingType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  type: ListingType | null;
  address: string;
  price: number;
  numOfGuests: number;
  city: string;
  country: string;
  admin: string;
}

export interface Listings_listings {
  __typename: "Listings";
  region: string | null;
  total: number;
  result: Listings_listings_result[];
}

export interface Listings {
  listings: Listings_listings;
}

export interface ListingsVariables {
  location?: string | null;
  filter: ListingsFilter;
  page: number;
  limit: number;
}