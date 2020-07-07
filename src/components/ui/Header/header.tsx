import React, { useState } from "react";
import { MenuItems } from "./menu";
import { NavLink, useHistory } from "react-router-dom";
import { Layout, Input } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { errorMessage } from "../notifications";
import { Viewer } from "../../../lib/types";

interface Props {
  user: Viewer;
  setUser: (user: Viewer) => void;
  loginLoading: boolean;
}
const { Search } = Input;
const { Header } = Layout;
export const AppHeader = ({ user, setUser, loginLoading }: Props) => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const searchHandle = (val: string) => {
    const trimmedVal = val.trim();
    if (trimmedVal.length <= 2) {
      errorMessage("Please enter a valid search.");
      setSearch("");
    } else {
      history.push(`/listings/${trimmedVal}`);
      setSearch("");
    }
  };

  const menu = loginLoading ? null : (
    <MenuItems user={user} setUser={setUser} />
  );

  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <NavLink to="/">
            <UpOutlined style={{ fontSize: 30, marginTop: 25 }} />
          </NavLink>
        </div>
        <div className="app-header__search-input">
          <Search
            placeholder="Los Angeles"
            size="middle"
            enterButton
            onSearch={searchHandle}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="app-header__menu-section">{menu}</div>
    </Header>
  );
};
