import { Button, Form, Table } from "antd";
import React, { useState } from "react";
import ModalSignUp from "./ModalSignUp";

const TableTeacher = ({ listTeacher }) => {
  const [isShowModalSignUp, setIsShowModalSignUp] = useState(false);
  const [saveTeacher, setSaveTeacher] = useState([]);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "No",
      key: "no",
      render: (record, text, index) => {
        return index + 1;
      },
    },
    {
      title: "Teacher ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "teacherEmail",
      key: "email",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Academic Rank",
      key: "academicRank",
      dataIndex: "academicRank",
    },
    {
      title: "Student SignUp",
      key: "studentSignUp",
      render: (record) => {
        return <p>{record.studentSignUp}/10</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Button
            type="primary"
            onClick={() => handleSignUp(record)}
            disabled={record.studentSignUp === 10 && true}
          >
            Sign Up
          </Button>
        );
      },
    },
  ];
  const handleSignUp = (record) => {
    setSaveTeacher(record);
    setIsShowModalSignUp(true);
  };
  const handleCloseModalSignUp = () => {
    form.resetFields();
    setSaveTeacher([]);
    setIsShowModalSignUp(false);
  };
  return (
    <div>
      <Table
        rowKey={"id"}
        scroll={{ x: 600 }}
        columns={columns}
        dataSource={listTeacher}
      />
      {isShowModalSignUp && (
        <ModalSignUp
          handleCloseModalSignUp={handleCloseModalSignUp}
          saveTeacher={saveTeacher}
          form={form}
        />
      )}
    </div>
  );
};

export default TableTeacher;
