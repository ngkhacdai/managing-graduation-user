import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import useMessage from "antd/es/message/useMessage";
import { resetPassword, sendCodeForgotPassword } from "@/api/Public";
import { IoMdArrowBack } from "react-icons/io";

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
      message.success(`${t("resetPasswordSuccess")}`);
      setTimeout(() => {
        changeForm();
      }, 1000);
    } catch (error) {
      return message.error(`${t("canNotFindEmail")}`);
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
    <div className="text-center  px-2">
      {contextHolder}
      <p className="text-xl font-bold">{t("resetPassword")}</p>
      <div className="mx-auto xl:w-[21rem] lg:w-[17rem] md:w-[13rem] md:px-0 sm:w-[30rem] px-5">
        <div className="text-left mb-2 flex items-center">
          <p className="text-red-500 mr-1">*</p>
          <p>Email</p>
        </div>
        <div className="flex mb-5">
          <Input
            disabled={isShow}
            className="flex-grow"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={sendCode}
            loading={loading}
            className="ml-2"
            type="primary"
            disabled={isShow}
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
            className="xl:w-[21rem] mx-auto lg:w-[17rem] md:w-[13rem] md:px-0 px-5 sm:w-[30rem]"
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t("notFillComfPassword"),
                },
              ]}
              name="comfNewPassword"
              label={t("comfNewPass")}
            >
              <Input />
            </Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              {t("submit")}
            </Button>
          </Form>
          <p className="mt-1 select-none">{t("warn")}</p>
        </>
      )}
      <div
        onClick={changeForm}
        className="flex absolute top-0 left-0 items-center p-2 bg-white rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ease-in-out cursor-pointer space-x-2"
      >
        <IoMdArrowBack className="text-xl" />
        <p className="font-medium ">{t("goToLoginPage")}</p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
