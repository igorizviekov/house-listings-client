import React, { useState, useEffect, useRef, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
  LISTINGS,
  Listings as ListingsData,
  ListingsVariables
} from "../../lib/graphql";
import { ListingsFilter as FilterTypes } from "../../lib/graphql/globalTypes";
import { Layout } from "antd";
import { ListingsSection } from "./components/listingsSection";
import { ListingsFilter } from "./components/listingsFilter";
import { ListingsPagination } from "./components/listingsPagination";
import { ListingsSkeleton } from "../../components/ui/skeleton";
import { NoListings } from "./components/noListings";
import { ErrorBanner } from "../../components/ui/error";

interface MatchParams {
  location: string;
}
const PAGE_LIMIT = 8;
const { Content } = Layout;
export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
  const locationRef = useRef(match.params.location);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(FilterTypes.PRICE_LOW_TO_HIGH);
  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      //prevent  make request if page is not equal to 1
      skip: locationRef.current !== match.params.location && page !== 1,
      variables: {
        location: match.params.location,
        filter,
        // pagination
        limit: PAGE_LIMIT,
        page
      }
    }
  );

  //set the page back to 1 if there was a search from another page
  useEffect(() => {
    locationRef.current = match.params.location;
    setPage(1);
  }, [match.params.location]);

  const listingsProps = {
    region: data ? data.listings.region : null,
    listings: data ? data.listings.result : null
  };
  const noListingsProps = {
    search: data ? data.listings.region : null
  };
  const filterProps = {
    filter,
    setFilter
  };
  const paginationProps = {
    page,
    setPage,
    limit: PAGE_LIMIT,
    total: data ? data.listings.total : null
  };

  let listingsSection = (
    <Fragment>
      <ListingsPagination {...paginationProps} />
      {error ? null : <ListingsFilter {...filterProps} />}
      <ListingsSection {...listingsProps} />
    </Fragment>
  );
  if (data && data.listings.total < 1) {
    listingsSection = <NoListings {...noListingsProps} />;
  }
  if (loading) {
    listingsSection = (
      <Fragment>
        <ListingsSkeleton numOfCards={4} />
        <ListingsSkeleton numOfCards={4} />
      </Fragment>
    );
  }

  return (
    <Content className="listings">
      {error ? (
        <ErrorBanner message="Please provide a valid location." />
      ) : null}
      {listingsSection}
    </Content>
  );
};
