import React, { Fragment } from "react";
import { Skeleton, List, Card } from "antd";
export const ListingSkeleton = () => {
  return <Skeleton active paragraph={{ rows: 1 }} />;
};

interface ListingsProps {
  numOfCards: number;
}
export const ListingsSkeleton = ({ numOfCards }: ListingsProps) => {
  const generateCard = (num: number): {}[] => {
    const array: {}[] = [];
    //fill array with empty objects based on number of cards need to be displayed
    for (let i = 0; i < num; i++) {
      array.push({});
    }
    return array;
  };
  return (
    <div className="home-listings-skeleton">
      <Skeleton paragraph={{ rows: 0 }} />
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={generateCard(numOfCards)}
        renderItem={item => (
          <List.Item>
            <Card
              loading
              cover={
                <div
                  style={{ backgroundColor: "gainsboro" }}
                  className="home-listings-skeleton__card-cover-img"
                />
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export const PageSkeleton = () => {
  const skeletonItem = (
    <Skeleton
      active
      paragraph={{ rows: 4 }}
      className="page-skeleton__paragraph"
    />
  );
  return (
    <Fragment>
      {skeletonItem}
      {skeletonItem}
    </Fragment>
  );
};
