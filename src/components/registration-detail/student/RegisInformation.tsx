import { Col, Row, Tag } from "antd";
import React from "react";

const RegisInformation = ({ detail }) => {
  return (
    <div className="border-2 rounded-lg w-full">
      <div className="flex items-center gap-2 justify-center border-b-2">
        <p className="text-xl my-2 font-bold">Registration Information</p>
        <Tag
          className="text-lg"
          color={
            detail.approvalStatus == "pending"
              ? "yellow"
              : detail.approvalStatus == "approved"
              ? "green"
              : "red"
          }
        >
          {detail.approvalStatus}
        </Tag>
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
          <Col sm={24} md={6}>
            Project description:
          </Col>
          <Col sm={24} md={18} className="break-words whitespace-pre-wrap">
            {detail.projectDescription}
          </Col>
        </Row>
        {detail?.rejectReason && (
          <Row gutter={[10, 10]}>
            <Col sm={24} md={6}>
              Reasion rejected:
            </Col>
            <Col sm={24} md={18}>
              {detail.rejectReason}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default RegisInformation;
