import React from "react";
import { Link } from "react-router-dom";
import { Listing_listing as ListingItem } from "../../../lib/graphql";
import { Avatar, Divider, Tag, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

interface Props {
  listing: ListingItem | null;
}
const { Title, Paragraph } = Typography;

export const ListingDetails = (props: Props) => {
  if (!props.listing) {
    return null;
  }
  const {
    title,
    description,
    image,
    type,
    address,
    city,
    numOfGuests,
    host
  } = props.listing;

  return (
    <div className="listing-details">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="listing-details__image"
      />
      <div className="listing-details__information">
        <Paragraph
          type="secondary"
          ellipsis
          className="listing-details__city-address"
        >
          <Link to={"/listings/" + city.toLowerCase()}>
            <EnvironmentOutlined />
            <Divider type="vertical" />
            {city}
          </Link>
          <Divider type="vertical" />
          {address}
        </Paragraph>
        <Title level={3} className="listing-details__title">
          {title}
        </Title>
        <Divider />
        <div className="listing-details__section">
          <Link to={"/user/" + host.id}>
            <Avatar src={host.avatar} size={64} />
            <Title level={2} className="listing-details__host-name">
              {host.name}
            </Title>
          </Link>
        </div>
        <div className="listing-details__section">
          <Title level={4}>About this space</Title>
          <div className="listing-details__about-items">
            <Tag color="magenta">{type}</Tag>
            <Tag color="magenta">{numOfGuests} Guests</Tag>
          </div>
          <Paragraph ellipsis={{ rows: 3, expandable: true }}>
            {description}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
