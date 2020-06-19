import React from "react";
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  listing: {
    id: string;
    title: string;
    image: string;
    address?: string;
    numOfGuests: number;
    price: number;
  };
}

const { Text, Title } = Typography;

export const ListingCard = ({ listing }: Props) => {
  return (
    <Card
      hoverable
      cover={<div style={{ backgroundImage: `url(${listing.image})` }} />}
      className="listing-card__cover-img"
    >
      <div className="listing-card__details">
        <div className="listing-card__description">
          <Title level={4} className="listing-card__price">
            {listing.price}
          </Title>
          <Text strong ellipsis className="listing-card__title">
            {listing.title}
          </Text>
          <Text strong ellipsis className="listing-card__address">
            {listing.address}
          </Text>
        </div>
        <div className="listing-card__dimensions listing-card__dimensions--guests">
          <UserOutlined />
          <Text>{listing.numOfGuests} guests</Text>
        </div>
      </div>
    </Card>
  );
};
