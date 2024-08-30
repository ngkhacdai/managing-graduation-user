import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import useMessage from "antd/es/message/useMessage";
import { resetPassword, sendCodeForgotPassword } from "@/api/Public";

const ForgotPasswordForm = ({ changeForm }) => {
  const [message, contextHolder] = useMessage();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(false);
    setLoading(false);
  }, []);
  const t = useTranslations("Login");
  const onFinish = async (values) => {
    try {
      const response = await resetPassword(values);
      message.success(`Reset password successfully`);
    } catch (error) {
      return message.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const sendCode = async () => {
    if (!email) {
      message.error(t("notFillEmail"));
      return;
    }
    try {
      setLoading(true);
      const form = {
        email,
      };
      await sendCodeForgotPassword(form);
      setIsShow(true);
      setLoading(false);
      setTimeout(() => {
        setIsShow(false);
      }, 900000);
    } catch (error) {
      message.error(error.message);
      setLoading(false);
      setIsShow(false);
    }
  };
  return (
    <div className="text-center px-2">
      {contextHolder}
      <p className="text-xl font-bold">{t("resetPassword")}</p>
      <div className="mx-auto xl:w-[21rem] lg:w-[17rem] md:w-[13rem] md:px-0 sm:w-[30rem] px-5">
        <div className="text-left mb-2 flex items-center">
          <p className="text-red-500 mr-1">*</p>
          <p>Email</p>
        </div>
        <div className="flex mb-5">
          <Input
            className="flex-grow"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={sendCode}
            loading={loading}
            className="ml-2"
            type="primary"
          >
            {t("sendCode")}
          </Button>
        </div>
      </div>
      {isShow && (
        <>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="xl:w-[21rem] lg:w-[17rem] md:w-[13rem] md:px-0 px-5 sm:w-[30rem]"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t("notFillCode"),
                },
              ]}
              name="code"
              label={t("otp")}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t("notFillPassword"),
                },
              ]}
              name="newPassword"
              label={t("newPass")}
            >
              <Input />
            </Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              {t("resetPassword")}
            </Button>
          </Form>
          <p className="mt-1 select-none">{t("warn")}</p>
        </>
      )}
      <p onClick={changeForm} className=" hover:text-blue-700 cursor-pointer">
        {t("goToLoginPage")}
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
