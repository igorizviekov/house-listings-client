import React from "react";
import { Listings_listings_result } from "../../../lib/graphql";
import { List, Typography } from "antd";
import { ListingCard } from "../../../components/ui/listingCard";
interface Props {
  title: string;
  listings: Listings_listings_result[];
}

const { Title } = Typography;

export const HomeListings = ({ listings, title }: Props) => {
  return (
    <div className="home__listings">
      <Title level={4} className="home__listings-title">
        {title}
      </Title>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={listings}
        renderItem={item => (
          <List.Item>
            <ListingCard listing={item} />
          </List.Item>
        )}
      />
    </div>
  );
};
