import React from "react";
import { Modal, Button, Divider, Typography } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { formatPrice } from "../../../lib/utils";
import moment, { Moment } from "moment";
import {
  errorMessage,
  successMessage
} from "../../../components/ui/notifications";
import {
  CardElement,
  injectStripe,
  ReactStripeElements
} from "react-stripe-elements";
import {
  CREATE_BOOKING,
  CreateBooking as CreateBookingData,
  CreateBookingVariables
} from "../../../lib/graphql";
import { useMutation } from "react-apollo";

interface Props {
  id: string | null;
  price: number | undefined;
  checkIn: Moment | null;
  checkOut: Moment | null;
  modalState: boolean;
  toggleModal: (val: boolean) => void;
  clearBookingData: () => void;
  handleListingRefetch: () => void;
}
const { Paragraph, Text, Title } = Typography;

export const BookingModal = ({
  id,
  toggleModal,
  modalState,
  price,
  checkIn,
  checkOut,
  stripe,
  clearBookingData,
  handleListingRefetch
}: Props & ReactStripeElements.InjectedStripeProps) => {
  const [createBooking, { loading }] = useMutation<
    CreateBookingData,
    CreateBookingVariables
  >(CREATE_BOOKING, {
    onCompleted: () => {
      clearBookingData();
      successMessage("You've successfully made a booking!");
      handleListingRefetch();
    },
    onError: () =>
      errorMessage(
        "Sorry! We weren't ably to make a booking! Please try again later."
      )
  });

  const checkInString = moment(checkIn).format("MMM Do YYYY");
  const checkOutString = moment(checkOut).format("MMM Do YYYY");
  const daysBooked = checkOut ? checkOut.diff(checkIn, "days") + 1 : 0;
  const listingPrice = price ? price * daysBooked : 0;

  const handleCreateBooking = async () => {
    if (!stripe) {
      return errorMessage("Sorry! We were not able to connect with Stripe!");
    }
    let { token: stripeToken, error } = await stripe.createToken();
    if (stripeToken && id) {
      createBooking({
        variables: {
          input: {
            id,
            source: stripeToken.id,
            checkIn: moment(checkIn).format("YYYY-MM-DD"),
            checkOut: moment(checkOut).format("YYYY-MM-DD")
          }
        }
      });
    } else {
      errorMessage(
        error
          ? (error.message as string)
          : "Sorry! we were not able to book a listing!"
      );
    }
  };
  return (
    <Modal
      visible={modalState}
      centered
      onCancel={() => toggleModal(false)}
      footer={null}
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-booking-modal__intro-title">
            <KeyOutlined />
          </Title>
          <Title level={3} className="listing-booking-modal__intro-title">
            Book your trip.
          </Title>
          <Paragraph>
            Enter your payment information to book the listings between
          </Paragraph>
          <Text mark strong>
            {checkInString}
          </Text>{" "}
          and{" "}
          <Text mark strong>
            {checkOutString}
          </Text>
        </div>
        <Divider />
        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {price ? formatPrice(price) : null} * {daysBooked} days =
            <Text strong> {formatPrice(listingPrice)}</Text>
          </Paragraph>
          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total = <Text mark>{formatPrice(listingPrice)}</Text>
          </Paragraph>
        </div>
        <Divider />
        <div className="listing-booking-modal__stripe-card-section">
          <CardElement
            hidePostalCode
            className="listing-booking-modal__stripe-card"
          />
          <Button
            type="primary"
            size="large"
            className="listing-booking-modal__cta"
            onClick={handleCreateBooking}
            loading={loading}
          >
            BOOK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const wrappedBookingModal = injectStripe(BookingModal);
