import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Menu } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Viewer } from "../../../lib/types";
import { LOG_OUT, Logout as LogoutData } from "../../../lib/graphql";
import { useMutation } from "react-apollo";
import { successMessage, errorMessage } from "../notifications";

interface Props {
  user: Viewer;
  setUser: (user: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = (props: Props) => {
  const [logout] = useMutation<LogoutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logout) {
        props.setUser(data.logout);
        successMessage("You have successfully log out!");
      }
    },
    onError: () => {
      errorMessage(
        "Sorry! We were`t able to log you out. Please try again later!"
      );
    }
  });
  const history = useHistory();
  const logOutHandler = () => {
    //delete  cookie & token and redirect
    sessionStorage.removeItem("token");
    document.cookie = "viewer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/");
    logout();
  };

  //if user not logged in
  let loginLogout = (
    <Item>
      <NavLink to="/login">
        <Button type="primary">Sign In</Button>
      </NavLink>
    </Item>
  );

  //if  user logged in
  if (props.user.avatar) {
    loginLogout = (
      <SubMenu title={<Avatar src={props.user.avatar} />}>
        <Item key="/user">
          <NavLink to={`/user/${props.user.id}`}>
            <UserOutlined />
            Profile
          </NavLink>
        </Item>
        <Item key="/logout">
          <div onClick={logOutHandler}>
            <LogoutOutlined />
            Log Out
          </div>
        </Item>
      </SubMenu>
    );
  }

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <NavLink to="/host">
          <HomeOutlined />
          Host
        </NavLink>
      </Item>
      {loginLogout}
    </Menu>
  );
};
