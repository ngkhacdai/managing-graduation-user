import { Button, Table, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";

const TableProject = ({ projectData }) => {
  const t = useTranslations("Project");
  const pathName = usePathname();
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
      title: "id",
      dataIndex: "id",
      key: "id",
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
      dataIndex: "status",
      key: "status",
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
    params.set("teacherName", record.teacherName);
    params.set("projectName", record.projectName);
    params.set("projectId", record.id);
    route.push(
      `/${pathName.split("/")[1]}/project/detail?${params.toString()}`
    );
  };
  const signUpProject = () => {
    route.push(`/${pathName.split("/")[1]}/project/signup`);
  };
  return (
    <div>
      <div className="flex justify-between items-center m-2">
        <p className="font-semibold text-xl text-zinc-500">
          {t("yourProject")}
        </p>
        <Button
          onClick={signUpProject}
          disabled={
            projectData.length == 0
              ? false
              : projectData.some(
                  (item) =>
                    item.status === "Finish" || item.status === "Processing"
                )
          }
        >
          Sign up Project
        </Button>
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

export default TableProject;
