import React, { Fragment } from "react";
import { Skeleton } from "antd";

export const ListingSkeleton = () => {
  return <Skeleton active paragraph={{ rows: 1 }} />;
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
