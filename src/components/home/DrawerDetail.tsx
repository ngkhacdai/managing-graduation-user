import { Drawer } from "antd";
import React from "react";

const DrawerDetail = ({ open, onClose }) => {
  return (
    <div>
      <Drawer
        placement={"bottom"}
        title="Basic Drawer"
        onClose={onClose}
        open={open}
        width={"100%"}
        height={"100%"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default DrawerDetail;
