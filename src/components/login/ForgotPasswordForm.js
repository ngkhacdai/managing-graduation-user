import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useTranslations } from "next-intl";

const ForgotPasswordForm = ({ changeForm }) => {
  const t = useTranslations("Login");
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{t("resetPassword")}</p>

      <Form
        name="basic"
        layout="vertical"
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
              message: t("messageNotFillEmail"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            {t("resetPassword")}
          </Button>
        </Form.Item>
      </Form>
      <p onClick={changeForm} className=" hover:text-blue-700 cursor-pointer">
        {t("goToLoginPage")}
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
