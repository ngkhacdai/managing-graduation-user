import { Col, Row } from "antd";
import React from "react";

const StudentInformation = ({ detail }) => {
  return (
    <div className="border-2 rounded-lg w-full">
      <div className="text-center border-b-2">
        <p className="text-xl my-2 font-bold">Student information</p>
      </div>
      <div className="flex  p-2 flex-col gap-2">
        <div className="mx-auto flex flex-col gap-2">
          <img
            alt=""
            className="mx-auto w-28 h-28 rounded-full"
            src={detail.avatar}
          />
          <div>
            <p className="font-semibold text-zinc-500 text-lg">
              {detail.fullName} - {detail.studentId}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={6}>
              Major:
            </Col>
            <Col xs={24} sm={18}>
              {detail.branch}
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={6}>
              Begin year:
            </Col>
            <Col xs={24} sm={18}>
              {detail.beginYear}
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={6}>
              Phone number:
            </Col>
            <Col xs={24} sm={18}>
              {detail.phoneNumber}
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={6}>
              Email:
            </Col>
            <Col xs={24} sm={18}>
              {detail.email}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;
