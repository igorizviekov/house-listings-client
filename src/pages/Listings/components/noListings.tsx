import React, { Fragment } from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
interface Props {
  search: string | null;
}
const { Paragraph, Title } = Typography;
export const NoListings = ({ search }: Props) => {
  return (
    <Fragment>
      <Title level={3} className="listings__title">
        Results for: "{search}"
      </Title>
      <Paragraph>There are no listings for {search}.</Paragraph>
      <Paragraph>
        Be the first person to create a{" "}
        <Link to="/host">listing in this area</Link>!
      </Paragraph>
    </Fragment>
  );
};
