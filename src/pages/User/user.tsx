import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER, User as UserData, UserVariables } from "../../lib/graphql";
import { UserProfile } from "./components/userProfile";
import { UserListings } from "./components/userListings";
import { UserBookings } from "./components/userBookings";
import { Layout, Row, Col } from "antd";
import { ErrorBanner } from "../../components/ui/error";
import { Viewer } from "../../lib/types";
import { PageSkeleton } from "../../components/ui/skeleton";

//user id is passed with route with match params by react router
interface MatchParams {
  id: string;
}
//passing user props to compare id with user
interface Props {
  viewer: Viewer;
}
const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = ({
  viewer,
  match
}: Props & RouteComponentProps<MatchParams>) => {
  const [listPage, setListPage] = useState(1);
  const [bookPage, setBookPage] = useState(1);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      // pagination
      limit: PAGE_LIMIT,
      listingsPage: listPage,
      bookingsPage: bookPage
    }
  });

  const userProps = {
    user: data ? data.user : null,
    viewerIsUser: viewer.id === match.params.id ? true : false
  };

  const listingsProps = {
    listings: data ? data.user.listings : null,
    listPage: listPage,
    setPage: setListPage,
    userName: data ? data.user.name : null,
    limit: PAGE_LIMIT
  };

  const bookingsProps = {
    bookings: data ? data.user.bookings : null,
    bookingPage: bookPage,
    limit: PAGE_LIMIT,
    setPage: setBookPage,
    userName: data ? data.user.name : null
  };

  let content = (
    <Row gutter={12} justify="space-between">
      <Col flex={1} xs={24}>
        <UserProfile {...userProps} />
      </Col>
      <Col xs={24}>
        <UserListings {...listingsProps} />
        {data?.user.bookings ? <UserBookings {...bookingsProps} /> : null}
      </Col>
    </Row>
  );

  if (loading) {
    content = <PageSkeleton />;
  }

  if (error) {
    content = (
      <ErrorBanner message="Oops. Something went wrong. Try to reload the page" />
    );
  }
  return <Content className="user">{content}</Content>;
};
