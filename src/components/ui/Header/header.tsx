import React from "react";
import { MenuItems } from "./menu";
import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { Viewer } from "../../../lib/types";

interface Props {
  user: Viewer;
  setUser: (user: Viewer) => void;
  loginLoading: boolean;
}

const { Header } = Layout;

export const AppHeader = (props: Props) => {
  const menu = props.loginLoading ? null : (
    <MenuItems user={props.user} setUser={props.setUser} />
  );

  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <NavLink to="/">
            <UpOutlined style={{ fontSize: 30, marginTop: 25 }} />
          </NavLink>
        </div>
      </div>
      <div className="app-header__menu-section">{menu}</div>
    </Header>
  );
};
