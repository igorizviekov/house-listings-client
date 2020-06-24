import { gql } from "apollo-boost";
export const LISTINGS = gql`
  query Listings(
    $location: String
    $filter: ListingsFilter!
    $page: Int!
    $limit: Int!
  ) {
    listings(location: $location, filter: $filter, limit: $limit, page: $page) {
      region
      total
      result {
        id
        title
        image
        type
        address
        price
        numOfGuests
      }
    }
  }
`;
