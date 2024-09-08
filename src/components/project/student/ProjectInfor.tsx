import { RootState } from "@/redux/store";
import { Button, Col, Row } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProjectInfor = () => {
  const pathName = usePathname();
  const router = useRouter();
  const project = useSelector(
    (state: RootState) => state.projectDetail.detailProject
  );
  const viewPhase = () => {
    const params = new URLSearchParams();
    params.set("projectName", project.projectName);
    router.push(
      `/${pathName
        .split("/")[1]
        .toString()}/project/detail?${params.toString()}`
    );
  };
  return (
    <div className="border-2 rounded-lg p-2">
      <div className="text-right">
        <Button type="primary" onClick={viewPhase} className="my-2">
          View phase
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Project name:</p>
          </Col>
          <Col>
            <p>projectName</p>
          </Col>
        </Row>

        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Project description:</p>
          </Col>
          <Col>
            <p>projectDescription</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProjectInfor;
