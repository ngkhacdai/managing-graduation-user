import React from "react";
import { Form, Input, Modal } from "antd";

const LinkModal = ({
  isShowModalAddLink,
  handleAddLink,
  handleCancel,
  form,
}) => (
  <Modal
    onCancel={handleCancel}
    centered
    title="Add link"
    okText="Add link"
    open={isShowModalAddLink}
    onOk={handleAddLink}
  >
    <Form form={form} layout="vertical">
      <Form.Item name="link" label="Link">
        <Input />
      </Form.Item>
    </Form>
  </Modal>
);

export default LinkModal;
