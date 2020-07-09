import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
const { Text, Title } = Typography;
export const NotValidHost = () => {
  return (
    <div className="host__form-header">
      <Title level={4} className="host__form-title">
        You'll have to be signed in and connected with Stripe to host a listing.
      </Title>
      <Text type="secondary">
        We only allow users who've signed in to our application and have
        connected with Stripe to host new listings. You can sign in at the{" "}
        <Link to="/login">/login</Link> page and connect with Stripe shortly
        after.
      </Text>
    </div>
  );
};
