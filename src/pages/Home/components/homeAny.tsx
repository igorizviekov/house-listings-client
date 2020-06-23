import React from "react";
import { Link } from "react-router-dom";
import { Typography, Col, Row } from "antd";
import hanoiImg from "../../../assets/hanoi.jpg";
import sfImg from "../../../assets/san-francisco.jpg";

const { Title } = Typography;
export const HomeAny = () => {
  return (
    <div className="home__listings">
      <Title level={2} className="home__listings-title">
        Listings of any kind
      </Title>
      <Row gutter={12}>
        <Col xs={24} sm={12}>
          <Link to="/listings/san%20francisco">
            <div className="home__listings-img-cover">
              <img
                src={sfImg}
                alt="San Francisco"
                className="home__listings-img"
              />
            </div>
          </Link>
        </Col>
        <Col xs={24} sm={12}>
          <Link to="/listings/hanoi">
            <div className="home__listings-img-cover">
              <img src={hanoiImg} alt="Hanoi" className="home__listings-img" />
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
