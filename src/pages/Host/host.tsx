import React, { useState } from "react";
import {
  errorMessage,
  successMessage
} from "../../components/ui/notifications";
import { Layout, Spin } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { Viewer } from "../../lib/types";
import { NotValidHost } from "./notValidHost";
import { HostListingForm } from "./hostListingForm";
import {
  HostListingInput,
  HOST_LISTING,
  HostListingVariables,
  HostListing as HostListingData
} from "../../lib/graphql";
import { useMutation } from "react-apollo";
import { Redirect } from "react-router-dom";

const { Content } = Layout;
interface Props {
  viewer: Viewer;
  loginLoading: boolean;
}

export const Host = ({ viewer, loginLoading }: Props) => {
  const [imgLoading, setImgLoading] = useState(false);
  const [imgBase64, setImgBase64] = useState<string | null>(null);

  const [hostListing, { data, loading }] = useMutation<
    HostListingData,
    HostListingVariables
  >(HOST_LISTING, {
    onError: e => {
      console.log(e);
      return errorMessage(
        "Sorry! We were not able to create your listing. Please try again later!"
      );
    },
    onCompleted: () =>
      successMessage("You have successfully added a new listing!")
  });

  const onFormSubmit = (input: HostListingInput) => {
    hostListing({
      variables: {
        input
      }
    });
  };

  const handleImageUpload = (info: UploadChangeParam) => {
    const { file } = info;
    if (file.status === "uploading") {
      setImgLoading(true);
      return;
    }
    if (file.originFileObj) {
      getBase64Value(file.originFileObj, imageBase64Value => {
        setImgBase64(imageBase64Value);
        setImgLoading(false);
      });
    }
  };

  const formProps = {
    imgLoading,
    imgBase64,
    beforeImageUpload,
    handleImageUpload,
    onFormSubmit
  };

  let content = <HostListingForm {...formProps} />;

  if (!viewer.id || !viewer.hasWallet) {
    content = <NotValidHost />;
  }
  if (loginLoading || loading) {
    content = <Spin size="large" tip="Please wait..." />;
  }
  if (data && data.hostListing) {
    return <Redirect to={`/listing/${data.hostListing.id}`} />;
  }
  return <Content className="host-content">{content}</Content>;
};

const beforeImageUpload = (file: File) => {
  const fileIsValidType =
    file.type === "image/jpeg" || file.type === "image/png";
  //image < 1 mb
  const fileIsValidSize = file.size / 1024 / 1024 < 1;

  if (!fileIsValidSize) {
    errorMessage("Image must be less than 1 MB");
    return false;
  }
  if (!fileIsValidType) {
    errorMessage("You are only able to upload PNG or JPEG files.");
    return false;
  }
  return fileIsValidType && fileIsValidSize;
};
const getBase64Value = (
  img: File | Blob,
  callback: (imgBase64Value: string) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    callback(reader.result as string);
  };
};
