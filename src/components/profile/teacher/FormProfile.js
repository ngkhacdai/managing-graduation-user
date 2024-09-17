"use client";
import { Button, Form, Input, Select, Image, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import useMessage from "antd/es/message/useMessage";
import { updateTeacherProfile } from "@/api/Teacher";
import { useTranslations } from "next-intl";
import FormChangePassword from "./FormChangePassword";

const FormProfile = ({ dataProfile }) => {
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
          uid: "-1", // Unique identifier for the file
          name: "avatar.png", // Provide a default name
          status: "done",
          url: dataProfile?.avatar,
        },
      ]);
    }
  }, [dataProfile?.avatar]);
  const beforeUpload = (file) => {
    if (file.size > 1024 * 1024) {
      // 1MB size limit
      message.error("File too large. Maximum size is 1MB.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };
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
  console.log(dataProfile);

  const handleOnFinish = async (values) => {
    setLoadingButton(true);
    const formData = new FormData();

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("avatar", fileList[0].originFileObj);
    }
    formData.append("phoneNumber", values.phone);
    formData.append("email", values.email);
    formData.append("department", values.department);
    formData.append("degree", values.degree);
    try {
      const response = await updateTeacherProfile(formData);
      messageAPI.success("Updated student profile successfully");
    } catch (error) {
      console.log(error.message);
      messageAPI.error("Failed to update student profile");
    }
    setLoadingButton(false);
  };
  return (
    <div>
      {contexHolder}
      <div className="lg:flex ">
        <div className="w-full text-center">
          <p className="text-lg mb-5">{t("updateProfile")}</p>
          <div className="">
            <Form
              layout="vertical"
              onFinish={handleOnFinish}
              initialValues={{
                beginYear: dataProfile?.beginTeachingYear,
                degree: dataProfile?.degree,
                phone: dataProfile?.phoneNumber,
                email: dataProfile?.email,
                fullName: dataProfile?.fullName,
                branch: dataProfile?.branch,
              }}
            >
              <Form.Item
                label={t("avatar")}
                rules={[
                  {
                    required: true,
                    message: t("notFillAvatar"),
                  },
                ]}
                name="avatar"
              >
                <div className="flex justify-center">
                  <Upload
                    beforeUpload={beforeUpload}
                    listType="picture-card"
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
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              <Form.Item label={t("fullName")} name="fullName">
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
              <Form.Item
                label={t("Phone")}
                name="phone"
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
                <Input type="number" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: t("notFillDegree"),
                  },
                ]}
                label={t("Degree")}
                name="degree"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item label={t("Major")} name="branch">
                <Select disabled />
              </Form.Item>
              <Form.Item label={t("beginYear")} name="beginYear">
                <Input disabled />
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

export default FormProfile;
