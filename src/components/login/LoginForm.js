import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { login } from "@/api/Access";
import { useTranslations } from "next-intl";
import { IoMdArrowBack } from "react-icons/io";

const LoginForm = ({ changeForm }) => {
  const t = useTranslations("Login");
  const pathName = usePathname();
  const [messageApi, contextHolder] = message.useMessage();
  const [messageText, setMessage] = useState("");
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
      // messageApi.error(t("notiWrongPassword"));
      setMessage(t("notiWrongPassword"));
      setLoadingButton(false);
      return;
    }
    setMessage("");
    messageApi.success(t("notiLoginSuccess"));
    setTimeout(() => {
      router.push("/project");
    }, 1000);
    return;
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // messageApi.error(t("notiNotFillAllInput"));
  };
  return (
    <div className="w-full text-center">
      {/* {contextHolder} */}
      <p className="text-xl font-bold">Login</p>
      <p className="text-red-500 my-1">{messageText}</p>
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
      <Link
        href={`/${pathName.split("/")[1]}`}
        className="absolute flex items-center top-0 left-0 p-2 bg-white rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ease-in-out cursor-pointer space-x-2"
      >
        <IoMdArrowBack className="text-xl" />
        <p className="font-medium">{t("goToHomePage")}</p>
      </Link>
    </div>
  );
};

export default LoginForm;
