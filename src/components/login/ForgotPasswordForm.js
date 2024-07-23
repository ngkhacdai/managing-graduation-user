import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const ForgotPasswordForm = ({ changeForm }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="text-center">
      <p className="text-xl font-bold">Reset Password</p>

      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="lg:w-96"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <p onClick={changeForm} className=" hover:text-blue-700 cursor-pointer">
        Go to login page
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
