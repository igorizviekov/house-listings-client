import React, { Fragment } from "react";
import { Listings_listings_result } from "../../../lib/graphql";
import { List, Typography } from "antd";
import { ListingCard } from "../../../components/ui/listingCard";

interface Props {
  region: string | null;
  listings: Listings_listings_result[] | null;
}

const { Title } = Typography;
export const ListingsSection = ({ listings, region }: Props) => {
  const searchResults =
    region && listings ? (
      <Title level={3} className="listings__title">
        Results for "{region}"
      </Title>
    ) : null;
  return (
    <Fragment>
      {searchResults}
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={listings ? listings : []}
        renderItem={item => (
          <List.Item>
            <ListingCard listing={item} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
