import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../components/ui/listingCard";
import { User_user_bookings as UserBookingsData } from "../../../lib/graphql";

interface Props {
  bookings: UserBookingsData | null;
  bookingPage: number;
  limit: number;
  userName: string | null;
  setPage: (page: number) => void;
}

const { Text, Title } = Typography;

export const UserBookings = ({
  limit,
  bookingPage,
  bookings,
  userName,
  setPage
}: Props) => {
  const userList = (
    <List
      grid={{
        //space between cards
        gutter: 8,
        //number of columns small to large definition
        xs: 1,
        sm: 2,
        lg: 4
      }}
      dataSource={bookings?.result}
      //message if no data
      locale={{ emptyText: "You do not have any  bookings." }}
      pagination={{
        position: "top",
        current: bookingPage,
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
          <div className="user-bookings__booking-history">
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
            <ListingCard listing={item.listing} />
          </List.Item>
        );
      }}
    />
  );

  return (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Bookings
      </Title>
      {userList}
    </div>
  );
};
