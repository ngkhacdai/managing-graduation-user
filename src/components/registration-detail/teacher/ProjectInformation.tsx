import { Col, Row } from "antd";
import React from "react";

const ProjectInformation = ({ detail }) => {
  return (
    <div className="border-2 rounded-lg">
      <div className="text-center border-b-2">
        <p className="text-xl my-2 font-bold">Project information</p>
      </div>

      <div className="flex  p-2 flex-col gap-2">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Project name:
          </Col>
          <Col xs={24} sm={18}>
            {detail.projectName}
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Major:
          </Col>
          <Col xs={24} sm={18}>
            {detail.major}
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Registration date:
          </Col>
          <Col xs={24} sm={18}>
            {detail.registrationDate}
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Project description:
          </Col>
          <Col xs={24} sm={18} className="break-words whitespace-pre-wrap">
            {detail.projectDescription}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProjectInformation;
