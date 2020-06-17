import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Routes } from "./routes";
import "./styles/index.css";

function App() {
  const client = new ApolloClient({
    // credentials: "include",
    uri: "http://localhost:8080/api"
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
