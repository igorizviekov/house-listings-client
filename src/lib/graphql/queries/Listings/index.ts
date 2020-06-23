import { gql } from "apollo-boost";
export const LISTINGS = gql`
  query Listings($filter: ListingsFilter!, $page: Int!, $limit: Int!) {
    listings(filter: $filter, limit: $limit, page: $page) {
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
