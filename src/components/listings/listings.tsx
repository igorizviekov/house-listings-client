import React, { Fragment } from "react";
import { ListingItems } from "./listingItems";
import { Listings as ListingsData } from "./__generated__/Listings";
import { DeleteListing as DeleteListingData } from "./__generated__/DeleteListing";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
  const LISTINGS = gql`
    query Listings {
      listings {
        _id
        title
        address
        image
        rating
        numOfBeds
        numOfBaths
        price
      }
    }
  `;

  const DELETE_QUERY = gql`
    mutation DeleteListing($id: ID!) {
      deleteListing(id: $id) {
        title
      }
    }
  `;

  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteLoading, error: deleteError }
  ] = useMutation<DeleteListingData>(DELETE_QUERY);

  const deleteHandler = async (id: string) => {
    console.log(id);
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listingProps = {
    items: data ? data.listings : null,
    load: loading,
    deleting: deleteLoading,
    error: deleteError || error ? true : false,
    onDelete: deleteHandler
  };

  return (
    <Fragment>
      <h1>{props.title}</h1>
      <ListingItems {...listingProps} />
    </Fragment>
  );
};
