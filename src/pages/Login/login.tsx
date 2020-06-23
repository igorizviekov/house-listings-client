import React, { useRef, useEffect } from "react";
import { Redirect } from "react-router";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { LoginCard } from "./components/loginCard";
import { Layout, Spin } from "antd";
import { ErrorBanner } from "../../components/ui/error";
import {
  successMessage,
  errorMessage
} from "../../components/ui/notifications";
import { Viewer } from "../../lib/types";
import {
  AUTH_URL,
  LOG_IN,
  AuthUrl as AuthUrlData,
  Login as LoginData,
  LoginVariables
} from "../../lib/graphql";

//de-structure ant components
const { Content } = Layout;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();

  //data of logged user
  const [
    login,
    { data: loginData, loading: loginLoading, error: loginError }
  ] = useMutation<LoginData, LoginVariables>(LOG_IN, {
    //callback when user logged in
    onCompleted: data => {
      if (data && data.login && data.login.id && data.login.token) {
        setViewer(data.login);
        setCookie("viewer", data.login.id);
        sessionStorage.setItem("token", data.login.token);
        successMessage("You successfully logged in!");
      } else {
        sessionStorage.removeItem("token");
      }
    }
  });

  const setCookie = (name: string, val: string) => {
    const date = new Date();
    const value = val;
    // Set it expire in 7 days
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    // Set it
    document.cookie =
      name +
      "=" +
      value +
      "; expires=" +
      date.toUTCString() +
      "; sameSite=Strict; path=/";
  };

  const loginRef = useRef(login);
  //get the token data after redirecting back
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      loginRef.current({
        variables: {
          input: { code }
        }
      });
    }
  }, []);

  //redirect  to google sign in and  get  the token
  const handleAuth = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL
      });
      window.location.href = data.authUrl;
    } catch (err) {
      errorMessage(err);
    }
  };

  const loginCardProps = {
    onAuth: handleAuth
  };
  let loginCard = <LoginCard {...loginCardProps} />;

  if (loginLoading) {
    loginCard = <Spin size="large" tip="Logging you in..." />;
  }

  if (loginData && loginData.login) {
    const { id: viewerId } = loginData.login;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const errorNotification = loginError ? (
    <ErrorBanner message="Oops, something went wrong. please try again" />
  ) : null;

  return (
    <Content className="log-in">
      {errorNotification}
      {loginCard}
    </Content>
  );
};
