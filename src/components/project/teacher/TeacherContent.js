"use client";
import { Button, Table } from "antd";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";

const TeacherContent = ({ projectData }) => {
  const columns = [
    {
      title: "No",
      key: "no",
      render: (record, text, index) => {
        return index + 1;
      },
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Detail",
      key: "detail",
      render: (record) => {
        return (
          <Button type="primary">
            <BiSolidUserDetail />
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <p className="font-bold text-xl pb-2">Your Project</p>
      <Table dataSource={projectData} rowKey={"id"} columns={columns} />
    </div>
  );
};

export default TeacherContent;
