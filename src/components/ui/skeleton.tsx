import React, { Fragment } from "react";
import { Skeleton, List, Card } from "antd";
export const ListingSkeleton = () => {
  return <Skeleton active paragraph={{ rows: 1 }} />;
};

export const HomeListingSkeleton = () => {
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
        dataSource={[{}, {}, {}, {}]}
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
