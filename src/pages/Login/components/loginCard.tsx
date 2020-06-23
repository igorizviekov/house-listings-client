import React from "react";
import { Card, Typography } from "antd";
import googleLogo from "../../../assets/google.png";

interface Props {
  onAuth: () => Promise<void>;
}
const { Text, Title } = Typography;

export const LoginCard = ({ onAuth }: Props) => {
  return (
    <Card className="log-in-card">
      <div className="log-in-card__intro">
        <Title level={2} className="log-in-card__intro-title">
          <span role="img" aria-label="wave">
            👋
          </span>
        </Title>
        <Title level={3} className="log-in-card__intro-title">
          Log In to TinyHouse!
        </Title>
        <Text>Sign in with Google to start booking available rentals!</Text>
      </div>
      <button onClick={onAuth} className="log-in-card__google-button">
        <img
          src={googleLogo}
          alt="Google Logo"
          className="log-in-card__google-button-logo"
        />
        <span className="log-in-card__google-button-text">
          Sign in with Google
        </span>
      </button>
      <Text type="secondary">
        Note: By signing in, you'll redirected to the Google consent form to
        sign in with your Google account.
      </Text>
    </Card>
  );
};
