import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import App from "./App";
import { StripeProvider } from "react-stripe-elements";

const client = new ApolloClient({
  uri: "http://localhost:8080/api",
  request: async operation => {
    const token = sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        "X-SCRF-TOKEN": token || ""
      }
    });
  }
});
render(
  <StripeProvider apiKey={process.env.REACT_APP_S_PUBLISHABLE as string}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StripeProvider>,
  document.getElementById("root")
);
