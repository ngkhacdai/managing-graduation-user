import { Col, Row } from "antd";
import React from "react";

const TeacherInfor = ({ project }) => {
  return (
    <div className="border-2 rounded-lg">
      <p className="text-center font-semibold text-lg border-b-2">
        Mentor information
      </p>
      <div className="text-center mt-2 flex flex-col gap-2">
        <img
          alt=""
          src={project.avatar}
          className="rounded-full mx-auto border-2 w-24 h-24"
        />
        <p className="text-lg font-semibold break-words">
          {project.mentorName}
        </p>
      </div>
      <div className="mt-2 p-2 flex flex-col gap-2">
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Email:</p>
          </Col>
          <Col>
            <p className="break-all">
              {!project.email ? "not update" : project.email}
            </p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Phone number:</p>
          </Col>
          <Col>
            <p>{!project.phoneNumber ? "not update" : project.phoneNumber}</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Degree:</p>
          </Col>
          <Col>
            <p>{project.degree}</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Major:</p>
          </Col>
          <Col>
            <p>{project.major}</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Begin year:</p>
          </Col>
          <Col>
            <p>{project.beginTeachingYear}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TeacherInfor;
