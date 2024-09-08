import { changePassword } from "@/api/Access";
import { Button, Form, Input } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useTranslations } from "next-intl";
import React from "react";

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
    <div className="text-center">
      {contextHolder}
      <p className="text-center text-lg mb-5">{t("changePassword")}</p>
      <Form onFinish={onFinish} layout="vertical">
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
