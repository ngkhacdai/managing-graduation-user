import { addNewPhase } from "@/redux/slices/ProjectDetailSlice";
import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ModalAddNewPhase = ({ setIsShow }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsShowModal(true);
  }, []);
  const onCancel = () => {
    setIsShowModal(false);
    setTimeout(() => {
      setIsShow(false);
    }, 300);
  };
  const handleOk = () => {
    form.submit();
  };
  const onSubmit = () => {
    const value = form.getFieldsValue();
    dispatch(
      addNewPhase({
        id: Math.floor(Math.random() * 10000000),
        title: value.phaseName,
      })
    );
    onCancel();
  };
  return (
    <Modal
      onOk={handleOk}
      title={"Add new phase"}
      onCancel={onCancel}
      open={isShowModal}
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="phaseName"
          rules={[
            {
              required: true,
              message: "Please input phase name!",
            },
          ]}
          label="Phase name"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddNewPhase;
