import React from "react";
import { ListingType } from "../../lib/graphql/globalTypes";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Typography,
  Upload,
  Button
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";

import { HostListingInput } from "../../lib/graphql";

const { Text, Title } = Typography;
const { Item } = Form;

interface Props {
  imgLoading: boolean;
  imgBase64: string | null;
  beforeImageUpload: (file: File) => boolean;
  handleImageUpload: (info: UploadChangeParam) => void;
  onFormSubmit: (listing: HostListingInput) => void;
}

export const HostListingForm = ({
  imgLoading,
  imgBase64,
  beforeImageUpload,
  handleImageUpload,
  onFormSubmit
}: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (imgBase64) {
      const listing = {
        title: values.title,
        price: values.price * 100,
        type: values.type,
        description: values.description,
        numOfGuests: values.numOfGuests,
        image: imgBase64,
        address: `${values.address}, ${values.city}, ${values.state}, ${values.zip}`
      };
      onFormSubmit(listing);
    }
  };
  const validateMessages = {
    required: "This filed is required!",
    types: {
      number: "Must be a number!"
    },
    number: {
      // eslint-disable-next-line no-template-curly-in-string
      range: "Must be between ${min} and ${max}"
    },
    string: {
      // eslint-disable-next-line no-template-curly-in-string
      range: "Must be between ${min} and ${max}"
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      scrollToFirstError
      name="host"
      validateMessages={validateMessages}
    >
      <div className="host__form-header">
        <Title level={3} className="host__form-title">
          Let's get started listing your place.
        </Title>
        <Text type="secondary">
          In this form, we'll collect some basic additional information about
          your listing.
        </Text>
      </div>
      <Item label="Home Type" name="type" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio.Button value={ListingType.APARTMENT}>
            <span>Apartment</span>
          </Radio.Button>
          <Radio.Button value={ListingType.HOUSE}>
            <span>House</span>
          </Radio.Button>
        </Radio.Group>
      </Item>
      <Item
        label="# of Guests"
        name="numOfGuests"
        rules={[{ required: true, type: "number", min: 1, max: 15 }]}
      >
        <InputNumber min={1} placeholder="4" />
      </Item>
      <Item
        label="Title"
        extra="Maximum 30 characters"
        name="title"
        rules={[{ required: true, min: 1, max: 30 }]}
      >
        <Input
          maxLength={45}
          placeholder="New art apartment with the best panoramic view in Spain"
        />
      </Item>
      <Item
        label="Description"
        extra="Maximum 400 characters"
        name="description"
        rules={[{ required: true, min: 1, max: 400 }]}
      >
        <Input.TextArea
          maxLength={400}
          rows={3}
          placeholder="Fantastic view, great location in the city center. A lot of restaurants around. 1km from the best night clubs of Madrid."
        />
      </Item>
      <Item
        label="Address"
        name="address"
        rules={[{ required: true, min: 1, max: 30 }]}
      >
        <Input placeholder="Calle de Alcalá, 125" />
      </Item>
      <Item
        label="City / Town"
        name="city"
        rules={[{ required: true, min: 1, max: 20 }]}
      >
        <Input placeholder="Madrid" />
      </Item>
      <Item
        label="Province / State"
        name="state"
        rules={[{ required: true, min: 1, max: 20 }]}
      >
        <Input placeholder="Community of Madrid" />
      </Item>
      <Item
        label="Zip / Postal Code"
        name="zip"
        rules={[{ required: true, min: 1, max: 20 }]}
      >
        <Input placeholder="Please enter a zip code for your listing" />
      </Item>
      <Item
        label="Price"
        extra="All prices in $USD / day"
        name="price"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber min={0} placeholder="230" />
      </Item>
      <Item
        name="image"
        label="Image"
        extra="Images have to be under 1MB size and of type JPG or PNG"
        rules={[{ required: true }]}
      >
        <div className="host__form-image-upload">
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            //prevent making a request
            action="https://www.mocky.io/v2/5cc8019d300000980a05576"
            beforeUpload={beforeImageUpload}
            onChange={handleImageUpload}
          >
            {imgBase64 ? (
              <img src={imgBase64} alt="Listing" />
            ) : (
              <div>
                {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </div>
      </Item>
      <Button type="primary" htmlType="submit">
        ADD NEW LISTING
      </Button>
    </Form>
  );
};
