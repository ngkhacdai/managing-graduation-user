import { addProject } from "@/api/Student";
import { Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import useMessage from "antd/es/message/useMessage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ModalSignUp = ({ handleCloseModalSignUp, saveTeacher, listBranch }) => {
  const router = useRouter();
  const [messageAPI, contexHolder] = useMessage();
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();
  const options = [
    { value: "", label: "Select Branch" },
    ...listBranch.map((item) => {
      return { value: item.id.toString(), label: item.name };
    }),
  ];
  useEffect(() => {
    setIsShow(true);
  }, []);
  const handleCancel = () => {
    setIsShow(false);
    setTimeout(() => {
      handleCloseModalSignUp();
    }, 700);
  };
  const handleOk = () => {
    form.submit();
  };
  const onFinish = async () => {
    const values = form.getFieldsValue();
    const formData = {
      branchId: parseInt(values.branchId),
      mentorId: saveTeacher.id,
      projectName: values.projectName,
      projectDescription: values.projectDescription,
    };
    try {
      console.log(formData);
      const response = await addProject(formData);
      messageAPI.success("Project added successfully!");
      setTimeout(() => {
        router.push("/project");
      }, 1000);
    } catch (error) {
      console.log(error);
      messageAPI.error(error.message);
    }
  };
  return (
    <div>
      {contexHolder}
      <Modal onCancel={handleCancel} onOk={handleOk} open={isShow}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            teacherName: saveTeacher.fullName,
            branchId: "",
          }}
          layout="vertical"
        >
          <Form.Item
            label="Project Name"
            name={"projectName"}
            rules={[{ required: true, message: "Please input project name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"projectDescription"}
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Branch"
            name={"branchId"}
            rules={[{ required: true, message: "Please input branch!" }]}
          >
            <Select options={options} />
          </Form.Item>
          <Form.Item label="Teacher Name" name={"teacherName"}>
            <Input disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalSignUp;
