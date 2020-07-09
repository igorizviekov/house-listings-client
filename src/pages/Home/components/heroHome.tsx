import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row, Typography } from "antd";
import torontoImg from "../../../assets/toronto.jpg";
import kievImg from "../../../assets/kiev.jpg";
import dubaiImg from "../../../assets/dubai.jpg";
import londonImg from "../../../assets/london.jpg";

interface Props {
  onSearch: (val: string) => void;
}

const { Title } = Typography;
const { Search } = Input;

export const HeroHome = ({ onSearch }: Props) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">
          Find a place you'll love to stay at
        </Title>
        <Search
          placeholder='Search "San Francisco"'
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={onSearch}
        />
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
          <Link to={`/listings/toronto`}>
            <Card cover={<img src={torontoImg} alt="Toronto" />}>Toronto</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to={`/listings/dubai`}>
            <Card cover={<img src={dubaiImg} alt="Dubai" />}>Dubai</Card>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to={`/listings/kyiv`}>
            <Card cover={<img src={kievImg} alt="Kiev" />}>Kyiv</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to={`/listings/london`}>
            <Card cover={<img src={londonImg} alt="London" />}>London</Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
