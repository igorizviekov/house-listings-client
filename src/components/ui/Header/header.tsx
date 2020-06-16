import React from "react";
import { MenuItems } from "./menu";
import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { Viewer } from "../../../lib/types";

interface Props {
  user: Viewer;
  setUser: (user: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = (props: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <NavLink to="/">
            <UpOutlined style={{ fontSize: 30, marginTop: 25 }} />
          </NavLink>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems user={props.user} setUser={props.setUser} />
      </div>
    </Header>
  );
};
