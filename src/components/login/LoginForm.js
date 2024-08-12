import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/api/Access";
import { useTranslations } from "next-intl";

const LoginForm = ({ changeForm }) => {
  const t = useTranslations("Login");
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);
  const onFinish = async (values) => {
    setLoadingButton(true);
    const form = {
      userName: values.email,
      password: values.password,
    };
    console.log(form);

    const result = await login(form);
    console.log(result);

    if (!result.success) {
      messageApi.error(t("notiWrongPassword"));
      setLoadingButton(false);
      return;
    }
    messageApi.success(t("notiLoginSuccess"));
    router.push("/project");
    return;
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.error(t("notiNotFillAllInput"));
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
        className="xl:w-[21rem] lg:w-[17rem] md:w-[13rem] md:px-0 px-5 sm:w-[30rem] w-80"
      >
        <Form.Item
          label={t("username")}
          name="email"
          rules={[
            {
              required: true,
              message: t(`messageNotFillUsername`),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("messageNotFillPassword"),
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
            {t("forgotPassword")}
          </p>
        </div>

        <Button
          loading={loadingButton}
          className="w-full"
          type="primary"
          htmlType="submit"
        >
          {t("login")}
        </Button>
      </Form>
      <Link href={"/"} className=" hover:text-blue-700 cursor-pointer mt-2">
        {t("goToHomePage")}
      </Link>
    </div>
  );
};

export default LoginForm;
