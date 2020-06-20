import React, { Fragment } from "react";
import { User_user as UserData } from "../../../lib/graphql";
import { Avatar, Card, Divider, Typography, Button } from "antd";

interface Props {
  user: UserData | null;
  viewerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const details = viewerIsUser ? (
    <Fragment>
      <Divider />
      <div className="user-profile__details">
        <Paragraph>
          Interested in becoming a host? Register with your Stripe account!
        </Paragraph>
        <Button type="primary" className="user-profile__details-cta">
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
