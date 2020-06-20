import React, { useState, useRef, useEffect } from "react";
import { Viewer } from "./lib/types";
import { useMutation } from "react-apollo";
import { LOG_IN, Login as LoginData, LoginVariables } from "./lib/graphql";
import { Routes } from "./routes";
import "./styles/index.css";

//un-logged user
const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [login, { loading }] = useMutation<LoginData, LoginVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.login) {
        setViewer(data.login);

        if (data.login.token) {
          sessionStorage.setItem("token", data.login.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
    onError: err => console.log(err)
  });

  //try  to log in with cookie
  const loginRef = useRef(login);
  useEffect(() => {
    const cookie = document.cookie.split("viewer=")[1];
    loginRef.current({
      variables: {
        input: { cookie }
      }
    });
  }, []);

  const routeProps = {
    user: viewer,
    loginLoading: loading,
    setUser: setViewer,
    setViewer: setViewer
  };

  return <Routes {...routeProps} />;
}

export default App;
