import React from "react";
import {
  Listings,
  ListingPage,
  Home,
  Host,
  NotFound,
  User,
  Login
} from "../pages";
import { AppHeader } from "../components/ui/Header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Affix } from "antd";
import { Viewer } from "../lib/types";

interface Props {
  user: Viewer;
  loginLoading: boolean;
  setUser: (user: Viewer) => void;
}

export const Routes = (props: Props) => {
  const headerProps = {
    user: props.user,
    loginLoading: props.loginLoading,
    setUser: props.setUser
  };

  const loginProps = {
    setViewer: props.setUser
  };

  const userProps = {
    viewer: props.user
  };

  return (
    <Router>
      <Layout id="app">
        {/* affix to fix element on top */}
        <Affix offsetTop={0}>
          <AppHeader {...headerProps} />
        </Affix>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <Login {...loginProps} />}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={ListingPage} />
          {/* ? means it's optional */}
          <Route exact path="/listings/:location?" component={Listings} />
          <Route
            exact
            path="/user/:id"
            render={props => <User {...props} viewer={userProps.viewer} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};
