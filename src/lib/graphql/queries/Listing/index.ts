import { gql } from "apollo-boost";

export const LISTING = gql`
  query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
    listing(id: $id) {
      address
      id
      type
      title
      description
      image
      host {
        id
        name
        avatar
        hasWallet
      }
      city
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          checkIn
          checkOut
          id
          tenant {
            id
            name
            avatar
          }
        }
      }
      bookingIndex
      price
      numOfGuests
    }
  }
`;
