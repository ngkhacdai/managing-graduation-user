import {
  addNewPhase,
  addPhaseThunk,
  setNullError,
} from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Form, Input, Modal } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalAddNewPhase = ({ setIsShow }) => {
  const [messageAPI, contextHolder] = useMessage();
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.projectDetail.error);
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

  const onSubmit = async () => {
    const value = form.getFieldsValue();
    const formData = {
      phaseName: value.phaseName,
    };
    await dispatch(addPhaseThunk(formData));
    if (error) {
      messageAPI.error(error);
    }
    setTimeout(() => {
      dispatch(setNullError());
      onCancel();
    }, 1000);
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default ModalAddNewPhase;
