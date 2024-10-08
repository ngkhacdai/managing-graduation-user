import { rejectStudentByTeacher } from "@/redux/slices/RegistrationSlice";
import { AppDispatch } from "@/redux/store";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ModalReject = ({ regisId }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const onOk = () => {
    form.submit();
  };
  const onFinish = async () => {
    const formData = {
      regisId,
      reasonReject: form.getFieldValue("reasonReject"),
    };
    await dispatch(rejectStudentByTeacher(formData));
    setIsShow(false);
    form.resetFields();
  };
  return (
    <div>
      <Button
        onClick={() => setIsShow(true)}
        className=" bg-red-500 hover:!bg-red-400"
        type="primary"
      >
        Reject
      </Button>
      <Modal
        onOk={onOk}
        title="Reject registration"
        open={isShow}
        onCancel={() => setIsShow(false)}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="reasonReject" label="Reason for rejection">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalReject;
