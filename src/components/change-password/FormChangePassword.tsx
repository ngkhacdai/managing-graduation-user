"use client";
import { changePassword } from "@/api/Access";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import useMessage from "antd/es/message/useMessage";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Markdown from "react-markdown";

const FormChangePassword = () => {
  const t = useTranslations("Profile");
  const [message, contextHolder] = useMessage();
  const onFinish = async (values) => {
    if (values.newPass != values.comNewPass) {
      return message.error("New password is not like comfirm new password");
    }
    try {
      const form = {
        currentPassword: values.oldPass,
        newPassword: values.newPass,
      };
      const response = await changePassword(form);
      message.success("Change password successfully");
    } catch (error) {
      message.error("Change password failed");
    }
  };

  return (
    <div className="text-center m-2">
      {contextHolder}
      <p className="text-left p-2 font-semibold text-zinc-500 text-lg mb-5">
        {t("changePassword")}
      </p>

      <Form
        onFinish={onFinish}
        className="w-full md:w-1/2 mx-auto"
        layout="vertical"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: t("notFillOldPassword"),
            },
          ]}
          label={t("oldPassword")}
          name="oldPass"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: t("notFillNewPassword"),
            },
          ]}
          label={t("newPassword")}
          name="newPass"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: t("notFillComNewPassword"),
            },
          ]}
          label={t("comNewPass")}
          name="comNewPass"
        >
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          {t("changePassword")}
        </Button>
      </Form>
    </div>
  );
};

export default FormChangePassword;
