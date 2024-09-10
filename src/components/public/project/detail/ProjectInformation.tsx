import { Col, Row } from "antd";
import React from "react";

const ProjectInformation = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-bold break-words">{data.projectName}</p>
      <div className=" text-zinc-500">
        <Row>
          <Col className="text-right" span={18}>
            Start Date:
          </Col>
          <Col>{data.startDate}</Col>
        </Row>
        <Row>
          <Col className="text-right" span={18}>
            End Date:
          </Col>
          <Col>{data.endDate}</Col>
        </Row>
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
        <Col span={6}>Mentor email: </Col>
        <Col>{data.mentorName}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Mentor: </Col>
        <Col>{data.mentorEmail}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Major: </Col>
        <Col>{data.branch}</Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={6}>Mark: </Col>
        <Col>{data.mark}</Col>
      </Row>
      <div className="bg-zinc-50">
        <p className="">Project description: </p>
      </div>
      <p>{data.projectDescription}</p>
    </div>
  );
};

export default ProjectInformation;
