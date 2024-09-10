import { Col, Row } from "antd";
import React from "react";

const StudentInfor = () => {
  return (
    <div className="border-2 rounded-lg">
      <p className="text-center font-semibold text-lg border-b-2">
        Author information
      </p>
      <div className="text-center mt-2 flex flex-col gap-2">
        <img
          alt=""
          src=""
          className="rounded-full mx-auto border-2 w-24 h-24"
        />
        <p className="text-lg font-semibold">studentName-studentCode</p>
      </div>
      <div className="mt-2 p-2 flex flex-col gap-2">
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Email:</p>
          </Col>
          <Col>
            <p>email</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Phone number:</p>
          </Col>
          <Col>
            <p>phoneNumber</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Major:</p>
          </Col>
          <Col>
            <p>major</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StudentInfor;
