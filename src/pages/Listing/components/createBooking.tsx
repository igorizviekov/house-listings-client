import React from "react";
import { Button, Card, Typography, Divider, DatePicker } from "antd";
import { formatPrice } from "../../../lib/utils";
import moment, { Moment } from "moment";
import { Viewer } from "../../../lib/types";
import { BookingIndex } from "../types";

interface Props {
  viewer: Viewer;
  bookingIndex: BookingIndex;
  host: string | undefined;
  price: number | null;
  checkIn: Moment | null;
  checkOut: Moment | null;
  onCheckIn: (date: Moment | null) => void;
  onCheckOut: (date: Moment | null) => void;
  toggleModal: (val: boolean) => void;
}
const { Paragraph, Title, Text } = Typography;

export const CreateBooking = ({
  viewer,
  host,
  bookingIndex,
  price,
  checkIn,
  checkOut,
  onCheckIn,
  onCheckOut,
  toggleModal
}: Props) => {
  const dateIsBooked = (date: Moment) => {
    const y = moment(date).year();
    const m = moment(date).month();
    const d = moment(date).date();

    if (bookingIndex[y] && bookingIndex[y][m]) {
      return Boolean(bookingIndex[y][m][d]);
    } else {
      return false;
    }
  };

  const disabledDateHandler = (today: Moment) => {
    //find the day before today to disable
    if (today) {
      const beforeToday = today.isBefore(moment().endOf("day"));
      return beforeToday || dateIsBooked(today); //check for booked dates
    } else {
      return false;
    }
  };
  let message = "You won't be charged yet.";
  if (!viewer.id) {
    message = "You need to log in to make a booking.";
  }
  if (!viewer.hasWallet) {
    message = "You need to connect with Stripe to make payments.";
  }
  if (viewer.id === host) {
    message = "You can not book  your own listing.";
  }
  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {price ? formatPrice(price) : 0} <span> / day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkIn}
              disabled={!viewer.id || !viewer.hasWallet || viewer.id === host}
              onChange={date => onCheckIn(date)}
              //format of date
              format={"YYYY/MM/DD"}
              showToday={false}
              //disable date before today
              disabledDate={today => disabledDateHandler(today)}
              //set check out to null before check in is passed to  prevent bugs
              onOpenChange={() => onCheckOut(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOut}
              onChange={date => onCheckOut(date)}
              format={"YYYY/MM/DD"}
              showToday={false}
              disabledDate={today => disabledDateHandler(today)}
              //disable if no check in date
              disabled={!checkIn}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          onClick={() => toggleModal(true)}
          className="listing-booking__card-cta"
          disabled={
            !checkOut ||
            !checkIn ||
            !viewer.id ||
            !viewer.hasWallet ||
            viewer.id === host
          }
        >
          Book now!
        </Button>
        <Text type="secondary">{message}</Text>
      </Card>
    </div>
  );
};
