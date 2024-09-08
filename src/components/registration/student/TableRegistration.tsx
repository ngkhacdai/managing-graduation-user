import { Button, Table, Tooltip } from "antd";
import React from "react";
import ModalDetail from "./ModalDetail";
import moment from "moment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiDetail } from "react-icons/bi";

const TableRegistration = ({ data }) => {
  const pathName = usePathname();

  const columns = [
    {
      key: "no",
      title: "No",
      render: (record, text, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      key: "teacher_name",
      title: "Mentor Name",
      dataIndex: "teacher_name",
    },
    {
      key: "project_name",
      title: "Project Name",
      dataIndex: "project_name",
    },
    {
      key: "major_name",
      title: "Project Major",
      dataIndex: "major_name",
    },
    {
      key: "regis_date",
      title: "Date Created",
      render: (record) => {
        return <p>{moment(record.regis_date).format("DD-MM-YYYY, h:mm")}</p>;
      },
    },
    {
      key: "approval_Status",
      title: "Status",
      dataIndex: "approval_Status",
    },
    {
      key: "action",
      title: "Action",
      render: (record) => (
        <div>
          <ModalDetail regisId={record.id} status={record.approval_Status} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowKey={"id"}
        scroll={{ x: 600 }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TableRegistration;
