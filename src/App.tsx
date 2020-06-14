import React from "react";
import { Listings } from "./components/listings/listings";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({ uri: "http://localhost:8080/api" });

function App() {
  return (
    <ApolloProvider client={client}>
      <Listings title="New Listing" />
    </ApolloProvider>
  );
}

export default App;
