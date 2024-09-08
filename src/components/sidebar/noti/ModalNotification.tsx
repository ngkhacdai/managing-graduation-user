import { Modal } from "antd";
import React from "react";

const ModalNotification = ({ item, onClose }) => {
  return (
    <Modal title={item.title} onCancel={onClose} footer={null} open={true}>
      <p>{item.content}</p>
      <p className="text-right mt-1 text-red-500">
        {new Date(item.time).toLocaleDateString("en-GB")}
      </p>
    </Modal>
  );
};

export default ModalNotification;
