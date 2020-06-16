import React, { useState } from "react";
import { Listings, Listing, Home, Host, NotFound, User, Login } from "./pages";
import { AppHeader } from "./components/ui/Header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./styles/index.css";
import { Layout, Affix } from "antd";
import { Viewer } from "./lib/types";

const client = new ApolloClient({ uri: "http://localhost:8080/api" });

//unlogged user
const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const loginProps = {
    user: viewer,
    setUser: setViewer
  };

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
