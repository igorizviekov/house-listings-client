import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Divider, List, Typography } from "antd";
import { Listing_listing_bookings as ListingBookingsData } from "../../../lib/graphql";

interface Props {
  bookings: ListingBookingsData | null;
  page: number;
  setPage: (page: number) => void;
  limit: number;
}

const { Text, Title } = Typography;

export const ListingBookings = ({ limit, page, bookings, setPage }: Props) => {
  const bookingsList = (
    <List
      grid={{
        //space between cards
        gutter: 8,
        //number of columns small to large definition
        xs: 1,
        sm: 2,
        lg: 3
      }}
      dataSource={bookings?.result}
      //message if no data
      locale={{ emptyText: "No bookings have been made  yet." }}
      pagination={{
        current: page,
        //num of  cards
        total: bookings?.total,
        defaultPageSize: limit,
        //hide paginetion if less than limit
        hideOnSinglePage: true,
        showLessItems: true,
        //func when clicking a page number
        onChange: (page: number) => setPage(page)
      }}
      renderItem={item => {
        const bookingHistory = (
          <div className="listing-bookings__history">
            <div>
              Check in: <Text strong> {item.checkIn}</Text>
            </div>
            <div>
              Check out: <Text strong> {item.checkOut}</Text>
            </div>
          </div>
        );

        return (
          <List.Item>
            {bookingHistory}
            <Link to={`/user/${item.tenant.id}`}>
              <Avatar src={item.tenant.avatar} size={64} shape="square" />
            </Link>
          </List.Item>
        );
      }}
    />
  );

  return (
    <div className="listing-bookings">
      <Divider />
      <div className="listing-bookings__section">
        <Title level={4}>Bookings</Title>
        {bookingsList}
      </div>
    </div>
  );
};
