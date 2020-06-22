/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Listing
// ====================================================

export interface Listing_listing_host {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  hasWallet: boolean;
}

export interface Listing_listing_bookings_result_tenant {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
}

export interface Listing_listing_bookings_result {
  __typename: "Booking";
  checkIn: string;
  checkOut: string;
  id: string;
  tenant: Listing_listing_bookings_result_tenant;
}

export interface Listing_listing_bookings {
  __typename: "Bookings";
  total: number;
  result: Listing_listing_bookings_result[];
}

export interface Listing_listing {
  __typename: "Listing";
  address: string;
  id: string;
  type: ListingType | null;
  title: string;
  description: string;
  image: string;
  host: Listing_listing_host;
  city: string;
  bookings: Listing_listing_bookings | null;
  bookingIndex: string;
  price: number;
  numOfGuests: number;
}

export interface Listing {
  listing: Listing_listing;
}

export interface ListingVariables {
  id: string;
  bookingsPage: number;
  limit: number;
}
