import React from "react";
import { Pagination } from "antd";

interface Props {
  total: number | null;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}
export const ListingsPagination = ({ page, setPage, total, limit }: Props) => {
  return (
    <Pagination
      current={page}
      total={total ? total : 0}
      defaultPageSize={limit}
      hideOnSinglePage
      showLessItems
      onChange={page => setPage(page)}
      className="listings-pagination"
    />
  );
};
