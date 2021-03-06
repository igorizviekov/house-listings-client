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
import { Viewer } from "../../lib/types";
import { BookingIndex } from "./types";
import { wrappedBookingModal as BookingModal } from "./components/bookingModal";
//date types
import moment, { Moment } from "moment";
interface MatchParams {
  id: string;
}
interface Props {
  viewer: Viewer;
}
const { Content } = Layout;
const PAGE_LIMIT = 4;

export const ListingPage = ({
  match,
  viewer
}: Props & RouteComponentProps<MatchParams>) => {
  const [bookPage, setBookPage] = useState(1);

  const { data, loading, error, refetch } = useQuery<
    ListingData,
    ListingVariables
  >(LISTING, {
    variables: {
      id: match.params.id,
      limit: PAGE_LIMIT,
      bookingsPage: bookPage
    }
  });

  const handleListingRefetch = async () => await refetch();

  //confirmation modal
  const [modal, setModal] = useState(false);

  //dates for datePicker
  const [checkIn, setCheckIn] = useState<Moment | null>(null);
  const [checkOut, setCheckOut] = useState<Moment | null>(null);

  const bookingIndexJSON: BookingIndex = data
    ? JSON.parse(data.listing.bookingIndex)
    : null;

  const checkInHandler = (date: Moment | null) => {
    setCheckIn(date);
  };
  const checkOutHandler = (date: Moment | null) => {
    //verify if check out is after check in
    const isBeforeCheckIn = moment(date).isBefore(checkIn);
    if (isBeforeCheckIn) {
      return errorMessage("Please choose another checkout date");
    }
    //check if booking period contains another bookings
    let dateCursor = checkIn;
    while (moment(dateCursor).isBefore(checkOut, "days")) {
      dateCursor = moment(dateCursor).add(1, "days");
      const y = moment(dateCursor).year();
      const m = moment(dateCursor).month();
      const d = moment(dateCursor).date();
      if (
        bookingIndexJSON[y] &&
        bookingIndexJSON[y][m] &&
        bookingIndexJSON[y][m][d]
      ) {
        return errorMessage(
          "This dates  have been booked already. Please choose another period"
        );
      }
    }

    setCheckOut(date);
  };

  const toggleModal = (val: boolean) => {
    setModal(val);
  };
  const clearBookingData = () => {
    setModal(false);
    setCheckIn(null);
    setCheckOut(null);
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
  const modalProps = {
    id: data ? data.listing.id : null,
    modalState: modal,
    toggleModal,
    price: data?.listing.price,
    checkIn,
    checkOut,
    clearBookingData,
    handleListingRefetch
  };
  const createBookingProps = {
    viewer,
    bookingIndex: bookingIndexJSON,
    host: data?.listing.host.id,
    price: data ? data.listing.price : null,
    checkIn: checkIn,
    checkOut: checkOut,
    onCheckIn: checkInHandler,
    onCheckOut: checkOutHandler,
    toggleModal
  };

  let content = (
    <Fragment>
      <BookingModal {...modalProps} />
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
