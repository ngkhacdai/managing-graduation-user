import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

const ModalSignUp = ({ handleCloseModalSignUp, saveTeacher, form }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);
  const handleCancel = () => {
    setIsShow(false);
    setTimeout(() => {
      handleCloseModalSignUp();
    }, 700);
  };
  return (
    <div>
      <Modal onCancel={handleCancel} open={isShow}>
        <Form
          initialValues={{
            topicName: "",
            teacherName: saveTeacher.teacherName,
            Branch: saveTeacher.branch,
          }}
          form={form}
          layout="vertical"
        >
          <Form.Item label="Topic Name" name={"topicName"}>
            <Input />
          </Form.Item>
          <Form.Item label="Teacher Name" name={"teacherName"}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Branch" name={"Branch"}>
            <Input disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalSignUp;
