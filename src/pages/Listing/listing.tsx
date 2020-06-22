import React, { useState, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
  LISTING,
  Listing as ListingData,
  ListingVariables
} from "../../lib/graphql";
import { Layout, Row, Col } from "antd";
import { ErrorBanner } from "../../components/ui/error";
import { errorMessage } from "../../components/ui/notifications";
import { PageSkeleton } from "../../components/ui/skeleton";
import { ListingDetails } from "./components/listingDetails";
import { ListingBookings } from "./components/listingBookings";
import { CreateBooking } from "./components/createBooking";
//date types
import moment, { Moment } from "moment";
interface MatchParams {
  id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const ListingPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookPage, setBookPage] = useState(1);

  const { data, loading, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: match.params.id,
        limit: PAGE_LIMIT,
        bookingsPage: bookPage
      }
    }
  );

  //dates for datePicker
  const [checkIn, setCheckIn] = useState<Moment | null>(null);
  const [checkOut, setCheckOut] = useState<Moment | null>(null);

  const checkInHandler = (date: Moment | null) => {
    setCheckIn(date);
  };
  const checkOutHandler = (date: Moment | null) => {
    //verify if check out is after check in
    const isBeforeCheckIn = moment(date).isBefore(checkIn);
    if (isBeforeCheckIn) {
      errorMessage("Please choose another checkout date");
    } else {
      setCheckOut(date);
    }
  };

  const listingDetailsProps = {
    listing: data ? data.listing : null
  };
  const listingBookingsProps = {
    bookings: data ? data.listing.bookings : null,
    page: bookPage,
    setPage: setBookPage,
    limit: PAGE_LIMIT
  };
  const createBookingProps = {
    price: data ? data.listing.price : null,
    checkIn: checkIn,
    checkOut: checkOut,
    onCheckIn: checkInHandler,
    onCheckOut: checkOutHandler
  };

  let content = (
    <Fragment>
      <Row gutter={24} justify="space-between">
        <Col flex={1} xs={24} lg={14}>
          {data ? <ListingDetails {...listingDetailsProps} /> : null}
          {data?.listing.bookings ? (
            <ListingBookings {...listingBookingsProps} />
          ) : null}
        </Col>
        <Col flex={1} xs={24} lg={10}>
          {data ? <CreateBooking {...createBookingProps} /> : null}
        </Col>
      </Row>
    </Fragment>
  );

  if (loading) {
    content = <PageSkeleton />;
  }

  if (error) {
    content = (
      <ErrorBanner message="This listing may not exist or we're encountered an error. Please try again later." />
    );
  }

  return <Content className="listings">{content}</Content>;
};
