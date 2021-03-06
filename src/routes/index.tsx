import React from "react";
import {
  Listings,
  ListingPage,
  Home,
  Host,
  NotFound,
  User,
  Stripe,
  Login
} from "../pages";
import { AppHeader } from "../components/ui/Header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { Viewer } from "../lib/types";
import { ScrollToTop } from "../components/ui/scrollToTop";
import { Elements } from "react-stripe-elements";

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
  const listingProps = {
    viewer: props.user
  };
  const stripeProps = {
    viewer: props.user,
    setViewer: props.setUser
  };
  const userProps = {
    viewer: props.user,
    setViewer: props.setUser
  };
  const hostProps = {
    viewer: props.user,
    loginLoading: props.loginLoading
  };
  return (
    <Router>
      <ScrollToTop />
      <Layout id="app">
        {/* affix to fix element on top */}
        <AppHeader {...headerProps} />
        <Switch>
          <Route exact path="/login" render={() => <Login {...loginProps} />} />
          <Route
            exact
            path="/stripe"
            render={() => <Stripe {...stripeProps} />}
          />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/listing/:id"
            render={props => (
              <Elements>
                <ListingPage {...props} {...listingProps} />
              </Elements>
            )}
          />
          <Route exact path="/host" render={() => <Host {...hostProps} />} />
          {/* ? means it's optional */}
          <Route exact path="/listings/:location?" component={Listings} />
          <Route
            exact
            path="/user/:id"
            render={props => (
              <User
                {...props}
                viewer={userProps.viewer}
                setViewer={userProps.setViewer}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};
