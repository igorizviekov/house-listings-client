import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { Routes } from "./routes";
import "./styles/index.css";

function App() {
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

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
