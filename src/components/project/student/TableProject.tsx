import { Button, Table } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";

const TableProject = ({ projectData }) => {
  const pathName = usePathname();
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
        <p className="font-semibold text-xl text-zinc-500">Your Project</p>
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
      <Table dataSource={projectData} rowKey={"id"} columns={columns} />
    </div>
  );
};

export default TableProject;
