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
import { FaCircleInfo } from "react-icons/fa6";

const FormStudent = ({ dataProfile }) => {
  const [messageAPI, contexHolder] = useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (dataProfile.avatar) {
      // Set initial file list if avatar exists
      setFileList([
        {
          uid: "-1", // Unique identifier for the file
          name: "avatar.png", // Provide a default name
          status: "done",
          url: dataProfile.avatar,
        },
      ]);
    }
  }, [dataProfile.avatar]);

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
      messageAPI.success("Updated student profile successfully");
    } catch (error) {
      console.log(error.message);
      messageAPI.error("Failed to update student profile");
    }
  };

  return (
    <div className="flex justify-center items-center">
      {contexHolder}
      <Form
        layout="horizontal"
        className="md:w-1/2 w-full"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={submitForm}
        initialValues={{
          branch: dataProfile.majors,
          id: dataProfile.majors,
          email: dataProfile.email,
          fullName: dataProfile.fullName,
          phoneNumber: dataProfile.phoneNumber,
        }}
      >
        <Form.Item label="Avatar" name="avatar">
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
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        )}
        <Form.Item
          label="Student code"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input your student code!",
            },
          ]}
        >
          <Input
            suffix={
              <Tooltip title={"Student code"}>
                <FaCircleInfo />
              </Tooltip>
            }
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not a valid email!",
            },
          ]}
        >
          <Input
            suffix={
              <Tooltip
                title={
                  "The email should have the format like [email name] + @ + [region name]"
                }
              >
                <FaCircleInfo />
              </Tooltip>
            }
          />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <Input
            suffix={
              <Tooltip title={"Student name"}>
                <FaCircleInfo />
              </Tooltip>
            }
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            type="number"
            suffix={
              <Tooltip title={"Student code"}>
                <FaCircleInfo />
              </Tooltip>
            }
            className="[&::-webkit-inner-spin-button]:appearance-none"
          />
        </Form.Item>
        <Form.Item label="Majors" name="branch">
          <Select disabled />
        </Form.Item>
        <div className="text-center">
          <Button htmlType="submit" type="primary">
            Update my profile
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormStudent;
