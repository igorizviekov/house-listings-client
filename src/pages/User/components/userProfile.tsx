import React, { Fragment } from "react";
import { User_user as UserData } from "../../../lib/graphql";
import { Avatar, Card, Divider, Typography, Button, Tag } from "antd";
import { formatPrice } from "../../../lib/utils";
import {
  successMessage,
  errorMessage
} from "../../../components/ui/notifications";
import {
  DISCONNECT_STRIPE,
  DisconnectStipe as StripeData
} from "../../../lib/graphql";
import { useMutation } from "react-apollo";
import { Viewer } from "../../../lib/types";

interface Props {
  user: UserData | null;
  viewer: Viewer;
  refetch: () => void;
  setViewer: (viewer: Viewer) => void;
  viewerIsUser: boolean;
}

// https://stripe.com/docs/connect/standard-accounts#integrating-oauth
const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=read_write`;

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({
  user,
  viewer,
  viewerIsUser,
  setViewer,
  refetch
}: Props) => {
  const redirectToStripe = () => (window.location.href = stripeAuthUrl);

  const [disconnectStripe, { loading }] = useMutation<StripeData>(
    DISCONNECT_STRIPE,
    {
      onCompleted: data => {
        setViewer({ ...viewer, hasWallet: data.disconnectStripe.hasWallet });
        successMessage("You've successfully disconnected from stripe!");
        refetch();
      },
      onError: () => {
        errorMessage(
          "We  weren't able to disconnect you from Stripe. Please try again later."
        );
      }
    }
  );

  let details = viewerIsUser ? (
    <Fragment>
      <Divider />
      <div className="user-profile__details">
        <Paragraph>
          Interested in becoming a host? Register with your Stripe account!
        </Paragraph>
        <Button
          onClick={redirectToStripe}
          type="primary"
          className="user-profile__details-cta"
        >
          Connect with Stripe
        </Button>
        <Paragraph type="secondary">
          TinyHouse uses
          <a
            href="https://stripe.com/en-US/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" Stripe "}
          </a>
          to transfer your earnings in a secure manner.
        </Paragraph>
      </div>
    </Fragment>
  ) : null;

  if (user?.hasWallet) {
    details = viewerIsUser ? (
      <Fragment>
        <Divider />
        <div className="user-profile__details">
          <Paragraph>
            <Tag color="green">Stripe Registered</Tag>
          </Paragraph>
          <Paragraph>
            Income Earned:
            <Text strong> {user.income ? formatPrice(user.income) : "$0"}</Text>
          </Paragraph>
          <Button
            loading={loading}
            onClick={() => disconnectStripe()}
            type="primary"
            className="user-profile__details-cta"
          >
            Disconnect Stripe
          </Button>
          <Paragraph type="secondary">
            By disconnecting, you won't be able to receive{" "}
            <Text strong>any further payments</Text>. This will prevent users
            from booking listings that you might have already created.
          </Paragraph>
        </div>
      </Fragment>
    ) : null;
  }

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user?.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user?.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user?.contact}</Text>
          </Paragraph>
        </div>
        {details}
      </Card>
    </div>
  );
};
