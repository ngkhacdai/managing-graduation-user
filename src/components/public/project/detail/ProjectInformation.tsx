import { Col, Row } from "antd";
import React from "react";

const ProjectInformation = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-bold break-words">{data.projectName}</p>
      <div className=" text-zinc-500">
        <div className=" flex items-center gap-2 justify-end">
          <p className="">Start Date:</p>
          <p>{data.startDate}</p>
        </div>
        <div className=" flex items-center gap-2 justify-end">
          <p>End Date:</p>
          <p>{data.endDate}</p>
        </div>
      </div>
      <Row gutter={[10, 10]}>
        <Col span={6}>Author: </Col>
        <Col>{data.projectAuthor}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Author email: </Col>
        <Col>{data.authorEmail}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Mentor: </Col>
        <Col>{data.mentorName}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Mentor email: </Col>
        <Col>{data.mentorEmail}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Industry focus: </Col>
        <Col>{data.branch}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Mark: </Col>
        <Col>{data.mark}</Col>
      </Row>
      <div className="bg-zinc-50">
        <p className="">Project description: </p>
      </div>
      <p className="whitespace-pre-wrap break-words">
        {data.projectDescription}
      </p>
    </div>
  );
};

export default ProjectInformation;
