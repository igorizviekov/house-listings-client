import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../components/ui/listingCard";
import { User_user_listings as UserListingsData } from "../../../lib/graphql";

interface Props {
  listings: UserListingsData | null;
  listPage: number;
  limit: number;
  userName: string | null;
  setPage: (page: number) => void;
}

const { Paragraph, Title } = Typography;

export const UserListings = ({
  limit,
  listPage,
  listings,
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
      dataSource={listings?.result}
      //message if no data
      locale={{ emptyText: "User does  not have any listings yet." }}
      pagination={{
        position: "top",
        current: listPage,
        //num of  cards
        total: listings?.total,
        defaultPageSize: limit,
        //hide paginetion if less than limit
        hideOnSinglePage: true,
        showLessItems: true,
        //func when clicking a page number
        onChange: (page: number) => setPage(page)
      }}
      renderItem={item => (
        <List.Item>
          <ListingCard listing={item} />
        </List.Item>
      )}
    />
  );

  return (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Listings
      </Title>
      <Paragraph className="user-listings__description">
        This section highlights the listings{" "}
        {userName ? ` ${userName} ` : " this user "} currently hosts and has
        made available for bookings.
      </Paragraph>
      {userList}
    </div>
  );
};
