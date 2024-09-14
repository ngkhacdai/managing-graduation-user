import { Col, Row } from "antd";
import React from "react";

const ProjectInformation = ({ detail }) => {
  return (
    <div className="border-2 rounded-lg lg:w-2/3 w-full">
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
            {detail.branch}
          </Col>
        </Row>
        {detail.point && (
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={6}>
              Point:
            </Col>
            <Col xs={24} sm={18}>
              {detail.point}
            </Col>
          </Row>
        )}
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={6}>
            Project started date:
          </Col>
          <Col xs={24} sm={18}>
            {detail.projectStartDate}
          </Col>
        </Row>
        {detail.projectEndDate && (
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={6}>
              Project ended date:
            </Col>
            <Col xs={24} sm={18}>
              {detail.projectEndDate}
            </Col>
          </Row>
        )}

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
