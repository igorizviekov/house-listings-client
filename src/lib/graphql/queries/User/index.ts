import { gql } from "apollo-boost";

export const USER = gql`
  query User($id: ID!, $listingsPage: Int!, $bookingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
      income

      listings(limit: $limit, page: $listingsPage) {
        result {
          id
          title
          image
          address
          price
          numOfGuests
        }
        total
      }

      bookings(limit: $limit, page: $bookingsPage) {
        result {
          id
          listing {
            id
            title
            image
            price
            numOfGuests
          }
          checkIn
          checkOut
        }
        total
      }
    }
  }
`;
