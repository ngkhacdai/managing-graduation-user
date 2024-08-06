"use client";
import { Button, Form, Input, Select, Image, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const FormProfile = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
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
  return (
    <div className="flex justify-center items-center text-center">
      <Form
        layout="horizontal"
        className="md:w-1/2 w-full"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          branch: "Computer Science",
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
          label="Full Name"
          name="fullName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Branch" name="branch">
          <Select>
            <Select.Option value="Computer Science">
              Computer Science
            </Select.Option>
            <Select.Option value="Information Technology">
              Information Technology
            </Select.Option>
            <Select.Option value="Mathematics">Mathematics</Select.Option>
            <Select.Option value="Physics">Physics</Select.Option>
            <Select.Option value="Chemistry">Chemistry</Select.Option>
            <Select.Option value="Biology">Biology</Select.Option>
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="French">French</Select.Option>
            <Select.Option value="German">German</Select.Option>
            <Select.Option value="Italian">Italian</Select.Option>
            <Select.Option value="Spanish">Spanish</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your work place!",
            },
          ]}
          label="Work Place"
          name="workPlace"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your degree!",
            },
          ]}
          label="Degree"
          name="degree"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your academic rank!",
            },
          ]}
          label="Academic Rank"
          name="academicRank"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          label="Password"
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Avatar"
          rules={[
            {
              required: true,
              message: "Please upload your avatar!",
            },
          ]}
          name="avatar"
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        <div className="text-center">
          <Button htmlType="submit" type="primary">
            Update my profile
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormProfile;
