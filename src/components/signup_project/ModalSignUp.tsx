import { addProject } from "@/api/Student";
import { signUpTeacher } from "@/redux/slices/SignUpSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import useMessage from "antd/es/message/useMessage";
import Upload from "antd/es/upload/Upload";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalSignUp = ({ handleCloseModalSignUp, saveTeacher, listBranch }) => {
  const fileList = [];
  const [messageAPI, contexHolder] = useMessage();
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.signup.error);
  const options = [
    { value: "", label: "Select Branch" },
    ...listBranch.map((item) => {
      return { value: item.name, label: item.name };
    }),
  ];
  useEffect(() => {
    setIsShow(true);
  }, []);
  const handleCancel = () => {
    setIsShow(false);
    setTimeout(() => {
      handleCloseModalSignUp();
    }, 300);
  };
  const handleOk = () => {
    form.submit();
  };
  const onFinish = async () => {
    const values = form.getFieldsValue();
    const formData = new FormData();
    formData.append("teacherId", saveTeacher.id);
    formData.append("projectName", values.projectName);
    formData.append("majorName", values.branchId);
    formData.append("projectDescription", values.projectDescription);
    formData.append("fileAttachment", values.file.fileList[0].originFileObj);
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    dispatch(signUpTeacher({ formData, teacherId: saveTeacher.id }));
    if (error) {
      messageAPI.error(error);
      return;
    }
    messageAPI.success("Sign up project successfully!");
    setTimeout(() => {
      handleCancel();
    }, 1000);
  };
  return (
    <div>
      {contexHolder}
      <Modal
        title="Sign up mentor"
        onCancel={handleCancel}
        footer={
          <div>
            <Button className="mx-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleOk}>
              Submit
            </Button>
          </div>
        }
        open={isShow}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            teacherName: saveTeacher.fullName,
            branchId: "",
          }}
          layout="vertical"
        >
          <Form.Item label="Teacher Name" name={"teacherName"}>
            <Input disabled={true} className="text-black" />
          </Form.Item>
          <Form.Item
            label="Project Name"
            name={"projectName"}
            rules={[{ required: true, message: "Please input project name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Major"
            name={"branchId"}
            rules={[{ required: true, message: "Please input major!" }]}
          >
            <Select options={options} />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"projectDescription"}
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="File"
            rules={[{ required: true, message: "Please input file" }]}
            name="file"
          >
            <Upload
              beforeUpload={() => false}
              listType="picture"
              defaultFileList={fileList}
              accept="application/pdf"
              maxCount={1}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
        <p className="text-right font-semibold">
          {new Date().toLocaleDateString("en-GB")}
        </p>
      </Modal>
    </div>
  );
};

export default ModalSignUp;
