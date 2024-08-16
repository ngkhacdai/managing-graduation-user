import { Button, Form, Table } from "antd";
import React, { useState } from "react";
import ModalSignUp from "./ModalSignUp";
import { useTranslations } from "next-intl";

const TableTeacher = ({ listTeacher, listBranch }) => {
  const t = useTranslations("SignUp");
  const [isShowModalSignUp, setIsShowModalSignUp] = useState(false);
  const [saveTeacher, setSaveTeacher] = useState([]);
  const columns = [
    {
      title: "No",
      key: "no",
      render: (record, text, index) => {
        return index + 1;
      },
    },
    {
      title: t("Avatar"),
      key: "avatar",
      render: (record, text, index) => {
        return <img alt="" src={record.avatar} />;
      },
    },
    {
      title: t("TeacherName"),
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "teacherEmail",
      key: "email",
    },
    {
      title: t("Branch"),
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: t("Degree"),
      key: "degree",
      dataIndex: "degree",
    },
    {
      title: t("beginTeachingYear"),
      key: "beginTeachingYear",
      dataIndex: "beginTeachingYear",
    },
    {
      title: t("numberStudentSingUp"),
      key: "numberOfMentees",
      render: (record) => {
        return <p>{record.numberOfMentees}/5</p>;
      },
    },
    {
      title: t("Action"),
      key: "action",
      render: (record) => {
        return (
          <Button
            type="primary"
            onClick={() => handleSignUp(record)}
            disabled={record.studentSignUp >= 5 && true}
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
          listBranch={listBranch}
        />
      )}
    </div>
  );
};

export default TableTeacher;
