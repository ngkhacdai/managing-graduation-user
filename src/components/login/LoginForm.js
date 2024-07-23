import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

const LoginForm = ({ changeForm }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full text-center">
      <p className="text-xl font-bold">Login</p>

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

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            className="flex items-center m-0"
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <p
            onClick={changeForm}
            className=" hover:text-blue-700 cursor-pointer"
          >
            Forgot password?
          </p>
        </div>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Link href={"/"} className=" hover:text-blue-700 cursor-pointer">
        Go to home page
      </Link>
    </div>
  );
};

export default LoginForm;
