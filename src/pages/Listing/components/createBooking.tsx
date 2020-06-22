import React from "react";
import { Button, Card, Typography, Divider, DatePicker } from "antd";
import { formatPrice } from "../../../lib/utils";
import moment, { Moment } from "moment";

interface Props {
  price: number | null;
  checkIn: Moment | null;
  checkOut: Moment | null;
  onCheckIn: (date: Moment | null) => void;
  onCheckOut: (date: Moment | null) => void;
}
const { Paragraph, Title } = Typography;

export const CreateBooking = ({
  price,
  checkIn,
  checkOut,
  onCheckIn,
  onCheckOut
}: Props) => {
  //find the day before today to disable
  const disabledDateHandler = (today: Moment) => {
    if (today) {
      const beforeToday = today.isBefore(moment().endOf("day"));
      return beforeToday;
    } else {
      return false;
    }
  };

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
          className="listing-booking__card-cta"
          disabled={!checkOut || !checkIn}
        >
          Book now!
        </Button>
      </Card>
    </div>
  );
};
