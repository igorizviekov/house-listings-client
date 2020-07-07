import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Layout, Spin } from "antd";
import { useMutation } from "react-apollo";
import {
  CONNECT_STRIPE,
  ConnectStipe as StripeData,
  ConnectStipeVariables
} from "../../lib/graphql";
import { Viewer } from "../../lib/types";
import {
  successMessage,
  errorMessage
} from "../../components/ui/notifications";
interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
const { Content } = Layout;

export const Stripe = ({ viewer, setViewer }: Props) => {
  const [connectStripe, { data, loading, error }] = useMutation<
    StripeData,
    ConnectStipeVariables
  >(CONNECT_STRIPE, {
    onCompleted: data => {
      setViewer({ ...viewer, hasWallet: data.connectStripe.hasWallet });
      successMessage(
        "You've successfully connected to stripe account.",
        "You can now create listings on the Host page!"
      );
    },
    onError: err => {
      errorMessage(err.message);
    }
  });

  const stripeRef = useRef(connectStripe);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      stripeRef.current({
        variables: {
          input: { code }
        }
      });
    }
  }, []);

  if (loading) {
    return (
      <Content className="stripe">
        <Spin size="large" tip="Connecting  your stripe account..." />
      </Content>
    );
  }
  if (error) {
    return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
  }
  //redirect if successful
  if (data) {
    return <Redirect to={`/user/${viewer.id}`} />;
  }
  return null;
};
