"use client";
import {
  Button,
  Form,
  Input,
  Select,
  Image,
  Upload,
  message,
  Tooltip,
} from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { updateStudentProfile } from "@/api/Student";
import useMessage from "antd/es/message/useMessage";
import { useTranslations } from "next-intl";
import FormChangePassword from "../../change-password/FormChangePassword";

const FormStudent = ({ dataProfile }) => {
  const t = useTranslations("Profile");
  const [loadingButton, setLoadingButton] = useState(false);
  const [messageAPI, contexHolder] = useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (dataProfile?.avatar) {
      setFileList([
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: dataProfile?.avatar,
        },
      ]);
    }
  }, [dataProfile?.avatar]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const beforeUpload = (file) => {
    if (file.size > 1024 * 1024) {
      // 1MB size limit
      message.error("File too large. Maximum size is 1MB.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const submitForm = async (values) => {
    setLoadingButton(true);
    const formData = new FormData();

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    formData.append("phoneNumber", values.phoneNumber.toString());
    formData.append("email", values.email);

    console.log("formData keys and values:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await updateStudentProfile(formData);
      messageAPI.success(t("notiUpdateSuccess"));
    } catch (error) {
      console.log(error.message);
      messageAPI.error(t("notiUpdateFailed"));
    }
    setLoadingButton(false);
  };

  return (
    <div>
      {contexHolder}

      <div className="lg:flex ">
        <div className="w-full text-center">
          <div className="">
            <Form
              layout="vertical"
              className=""
              onFinish={submitForm}
              initialValues={{
                branch: dataProfile?.branch,
                id: dataProfile?.studentId,
                email: dataProfile?.email,
                fullName: dataProfile?.fullName,
                phoneNumber: dataProfile?.phoneNumber,
              }}
            >
              <Form.Item
                label={t("avatar")}
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: t("notFillAvatar"),
                  },
                ]}
              >
                <div className="flex justify-center ">
                  <Upload
                    beforeUpload={beforeUpload}
                    listType="picture-card"
                    accept="image/*"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              </Form.Item>
              {previewImage && (
                <Image
                  alt=""
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              <Form.Item label={t("studenCode")} name="id">
                <Input className="!text-black" disabled />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: t("notFillEmail"),
                  },
                  {
                    type: "email",
                    message: t("wrongEmailType"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label={t("fullName")} name="fullName">
                <Input className="!text-black" disabled />
              </Form.Item>
              <Form.Item
                label={t("Phone")}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t("notFillPhoneNumber"),
                  },
                  {
                    min: 9,
                    message: t("wrongPhoneNumber"),
                  },
                ]}
              >
                <Input
                  type="number"
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                />
              </Form.Item>
              <Form.Item label={t("Major")} name="branch">
                <Select className="!text-black" disabled />
              </Form.Item>
              <div className="text-center">
                <Button
                  htmlType="submit"
                  loading={loadingButton}
                  type="primary"
                >
                  {t("updateProfile")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStudent;
