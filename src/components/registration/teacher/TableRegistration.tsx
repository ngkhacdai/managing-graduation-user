import { Button, Table } from "antd";
import React, { useState } from "react";
import ModalDetailRegistration from "./ModalDetailRegistration";

const TableRegistration = ({ data }) => {
  const [pagePo, setPage] = useState(1);

  const columns = [
    {
      key: "no",
      title: "No",
      render: (record, text, index) => {
        return <p>{index * pagePo + 1}</p>;
      },
    },
    {
      key: "studentName",
      title: "Student Name",
      dataIndex: "studentName",
    },
    {
      key: "projectName",
      title: "Project Name",
      dataIndex: "projectName",
    },
    {
      key: "projectMajor",
      title: "Project Major",
      dataIndex: "projectMajor",
    },
    {
      key: "dateCreated",
      title: "Date Created",
      dataIndex: "dateCreated",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "action",
      title: "Action",
      render: (record) => (
        <ModalDetailRegistration
          status={record.status}
          regisId={record.regisId}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: 800 }}
        columns={columns}
        // dataSource={[{ status: "a" }]}
        rowKey={"regisId"}
        dataSource={data}
        pagination={{
          onChange(page, pageSize) {
            setPage(page);
          },
        }}
      />
    </div>
  );
};

export default TableRegistration;
