import React, { useState, useRef, useEffect } from "react";
import { Listings, Listing, Home, Host, NotFound, User, Login } from "../pages";
import { AppHeader } from "../components/ui/Header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Affix } from "antd";
import { Viewer } from "../lib/types";
import { useMutation } from "react-apollo";

import { LOG_IN, Login as LoginData, LoginVariables } from "../lib/graphql";

//unlogged user
const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

export const Routes = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [login, { error }] = useMutation<LoginData, LoginVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.login.id) {
        setViewer(data.login);
      }
    },
    onError: err => console.log(err)
  });

  const loginRef = useRef(login);
  useEffect(() => {
    const fetchData = async () => {
      const data = await loginRef.current();
      console.log(data);
      console.log(document.cookie);
    };
    fetchData();
  }, []);

  const loginProps = {
    user: viewer,
    setUser: setViewer
  };

  return (
    <Router>
      <Layout id="app">
        {/* affix to fix element on top */}
        <Affix offsetTop={0}>
          <AppHeader {...loginProps} />
        </Affix>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          {/* ? means it's optional */}
          <Route exact path="/listings/:location?" component={Listings} />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};
