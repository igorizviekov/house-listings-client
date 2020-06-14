import React from "react";
import { Listings_listings } from "./__generated__/Listings";
import { Alert, List, Avatar, Button, Spin } from "antd";
import { ListingSkeleton } from "../ui/skeleton";

import "../../styles/index.css";
interface Props {
  items: Listings_listings[] | null;
  load: boolean;
  deleting: boolean;
  error: boolean;
  onDelete: (id: string) => Promise<void>;
}

export const ListingItems = (props: Props) => {
  const errorMessage = (
    <span>
      <h3>Something went wrong =(</h3>
      <p>Please reload the page</p>
    </span>
  );

  if (props.error) {
    return (
      <div className="card">
        <Alert type="error" message={errorMessage} />
      </div>
    );
  }

  if (props.load) {
    return (
      <div className="card">
        <ListingSkeleton />
        <br />
        <ListingSkeleton />
        <br />
        <ListingSkeleton />
        <br />
        <ListingSkeleton />
        <br />
        <ListingSkeleton />
      </div>
    );
  }

  if (!props.items) {
    return (
      <div className="card">
        <Alert message="No listings found." />
      </div>
    );
  }

  return (
    <Spin spinning={props.deleting}>
      <List
        itemLayout="horizontal"
        dataSource={props.items}
        renderItem={item => (
          <div className="card border">
            <List.Item
              actions={[
                <Button
                  type="ghost"
                  onClick={props.onDelete.bind(null, item._id)}
                >
                  X
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image!} shape="square" size={60} />}
                title={item.title}
                description={item.address}
              />
            </List.Item>
          </div>
        )}
      />
    </Spin>
  );
};
