import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { errorMessage } from "../../components/ui/notifications";
import { Layout } from "antd";
import mapBack from "../../assets/map.png";
import { HeroHome } from "./components/heroHome";
import { HomeCta } from "./components/homeCta";
import { HomeAny } from "./components/homeAny";
import { HomeListings } from "./components/homeListings";
import { HomeListingSkeleton } from "../../components/ui/skeleton";

import { useQuery } from "@apollo/react-hooks";
import {
  LISTINGS,
  Listings as ListingsData,
  ListingsVariables
} from "../../lib/graphql";
import { ListingsFilter } from "../../lib/graphql/globalTypes";

const { Content } = Layout;
const LIMIT = 4;
const PAGE = 1;

export const Home = ({ history }: RouteComponentProps) => {
  const { data, loading } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        filter: ListingsFilter.PRICE_HIGH_TO_LOW,
        // pagination
        limit: LIMIT,
        page: PAGE
      }
    }
  );
  //func for search input
  const onSearch = (val: string) => {
    const trimmedVal = val.trim();
    if (trimmedVal.length <= 2) {
      errorMessage("Please enter a valid search.");
    } else {
      history.push(`listings/${trimmedVal}`);
    }
  };

  //render listings
  const renderListings = () => {
    if (loading) {
      return <HomeListingSkeleton />;
    }
    if (data) {
      const listingsProps = {
        title: "Premium Listings",
        listings: data.listings.result
      };
      return <HomeListings {...listingsProps} />;
    }
    return null;
  };
  const heroProps = {
    onSearch: onSearch
  };

  return (
    <Content className="home" style={{ backgroundImage: `url(${mapBack})` }}>
      <HeroHome {...heroProps} />
      <HomeCta />
      {renderListings()}
      <HomeAny />
    </Content>
  );
};
