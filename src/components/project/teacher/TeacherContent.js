"use client";
import { Button, Table, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { title } from "process";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";

const TeacherContent = ({ projectData }) => {
  const t = useTranslations("Project");
  const route = useRouter();
  const columns = [
    {
      title: t("No"),
      key: "no",
      render: (record, text, index) => {
        return index + 1;
      },
    },
    {
      title: t("projectName"),
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: t("studentName"),
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: t("status"),
      key: "status",
      render: (record) => {
        return (
          <p>{record.completed === false ? t("processing") : t("finished")}</p>
        );
      },
    },
    {
      title: t("dateStart"),
      key: "date",
      render: (record) => {
        return (
          <p>{new Date(record.implementation).toLocaleDateString("en-GB")}</p>
        );
      },
    },
    {
      title: t("action"),
      key: "detail",
      render: (record) => {
        return (
          <Tooltip title={t("detail")}>
            <Button
              onClick={() => {
                handleDetailProject(record);
              }}
              type="primary"
            >
              <BiSolidUserDetail />
            </Button>
          </Tooltip>
        );
      },
    },
  ];
  const handleDetailProject = (record) => {
    const params = new URLSearchParams();
    params.set("studentName", record.studentName);
    params.set("teacherName", record.mentorName);
    params.set("projectName", record.projectName);
    params.set("projectId", record.projectId);
    route.push(`/project/detail?${params.toString()}`);
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-xl text-zinc-500 m-2">
          {t("yourProject")}
        </p>
      </div>
      <Table
        dataSource={projectData}
        rowKey={"id"}
        columns={columns}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default TeacherContent;
