import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
export const HomeCta = () => {
  return (
    <div className="home__cta-section">
      <Title level={2} className="home__cta-section-title">
        Your guide for all things rental
      </Title>
      <Paragraph>
        Helping you make best decisions in renting your last minute locations.
      </Paragraph>
      <Link
        to="/listings/united%20states"
        className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
      >
        Popular listings in the United States
      </Link>
    </div>
  );
};
