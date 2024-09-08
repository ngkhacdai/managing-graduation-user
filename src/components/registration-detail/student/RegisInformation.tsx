import { Col, Row } from "antd";
import React from "react";

const RegisInformation = ({ detail }) => {
  return (
    <div className="border-2 rounded-lg md:w-2/3 w-full">
      <div className="text-center border-b-2">
        <p className="text-xl my-2 font-bold">Registration Information</p>
      </div>
      <div className="flex  p-2 flex-col gap-2">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Mentor name:
          </Col>
          <Col xs={24} sm={18}>
            {detail.teacherName}
          </Col>
        </Row>
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
            {detail.regisDate}
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Project description:
          </Col>
          <Col xs={24} sm={18} className="break-all">
            {detail.projectDescription}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisInformation;
