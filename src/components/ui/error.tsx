import React from "react";
import { Alert } from "antd";
interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({ message, description }: Props) => {
  return (
    <Alert
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};
