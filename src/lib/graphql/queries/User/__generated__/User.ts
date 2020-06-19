/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface User_user_listings {
  __typename: "Listings";
  result: User_user_listings_result[];
  total: number;
}

export interface User_user_bookings_result_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  price: number;
  numOfGuests: number;
}

export interface User_user_bookings_result {
  __typename: "Booking";
  id: string;
  listing: User_user_bookings_result_listing;
  checkIn: string;
  checkOut: string;
}

export interface User_user_bookings {
  __typename: "Bookings";
  result: User_user_bookings_result[];
  total: number;
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasWallet: boolean;
  income: number | null;
  listings: User_user_listings;
  bookings: User_user_bookings | null;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
  listingsPage: number;
  bookingsPage: number;
  limit: number;
}
