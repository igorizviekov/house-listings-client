import { message, notification } from "antd";

export const successMessage = (message: string, description?: string) => {
  return notification["success"]({
    message,
    description,
    placement: "topLeft",
    style: {
      marginTop: 50
    }
  });
};

export const errorMessage = (err: string) => {
  return message.error(err);
};
