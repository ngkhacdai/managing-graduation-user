import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/api/Access";

const LoginForm = ({ changeForm }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);
  const onFinish = async (values) => {
    if (values.email == "teacher" || values.email == "student") {
      setLoadingButton(true);
      const form = {
        email: values.email,
        password: values.password,
      };
      const result = await login(form);
      console.log(result);

      if (!result.success) {
        messageApi.error("Login failed email or password is incorrect");
        setLoadingButton(false);
        return;
      }
      messageApi.success("Login success ❤❤");
      router.push("/project");
      return;
    }
    return messageApi.error("Login failed email or password is incorrect");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.error("Please fill in your account and password!!");
  };
  return (
    <div className="w-full text-center">
      {contextHolder}
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
        className="xl:w-[28rem] lg:w-[20rem] md:w-[15rem] md:px-0 px-5 w-screen"
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

        <div className="flex items-center justify-end pb-2">
          <p
            onClick={changeForm}
            className=" hover:text-blue-700 cursor-pointer"
          >
            Forgot password?
          </p>
        </div>

        <Button
          loading={loadingButton}
          className="w-full"
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form>
      <Link href={"/"} className=" hover:text-blue-700 cursor-pointer mt-2">
        Go to home page
      </Link>
    </div>
  );
};

export default LoginForm;
