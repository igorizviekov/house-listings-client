import React from "react";
import { ListingsFilter as FilterTypes } from "../../../lib/graphql/globalTypes";
import { Select } from "antd";
interface Props {
  filter: FilterTypes;
  setFilter: (filter: FilterTypes) => void;
}
const { Option } = Select;
export const ListingsFilter = ({ filter, setFilter }: Props) => {
  return (
    <div className="listings-filters">
      <span>Filter by price</span>
      <Select value={filter} onChange={filter => setFilter(filter)}>
        <Option value={FilterTypes.PRICE_LOW_TO_HIGH}>Lowest first</Option>
        <Option value={FilterTypes.PRICE_HIGH_TO_LOW}>Highest first</Option>
      </Select>
    </div>
  );
};
