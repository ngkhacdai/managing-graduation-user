"use client";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";

const LibraryScreen = ({ projectData }) => {
  const route = useRouter();
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
          <Button
            onClick={() => {
              handleDetailProject(record);
            }}
            type="primary"
          >
            <BiSolidUserDetail />
          </Button>
        );
      },
    },
  ];
  const handleDetailProject = (record) => {
    const params = new URLSearchParams();
    params.set("studentName", record.studentName);
    params.set("teacherName", record.teacherName);
    params.set("projectName", record.projectName);
    params.set("projectId", record.id);
    route.push(`/project/detail?${params.toString()}`);
  };
  return (
    <div>
      <p className="font-semibold text-xl text-zinc-500 m-2">Your Library</p>
      <Table dataSource={projectData} rowKey={"id"} columns={columns} />
    </div>
  );
};

export default LibraryScreen;
