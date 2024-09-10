import { RootState } from "@/redux/store";
import { Button, Col, Row } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProjectInfor = ({ projectInfor }) => {
  const pathName = usePathname();
  const router = useRouter();
  const project = useSelector(
    (state: RootState) => state.projectDetail.detailProject
  );
  const viewPhase = () => {
    const params = new URLSearchParams();
    params.set("projectName", project.projectName);
    params.set("projectId", project.projectId);
    router.push(
      `/${pathName
        .split("/")[1]
        .toString()}/project/detail?${params.toString()}`
    );
  };
  return (
    <div className="border-2 rounded-lg p-2">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold ">Project information</p>
        <Button type="primary" onClick={viewPhase} className="my-2">
          View phases
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Project name:</p>
          </Col>
          <Col>
            <p className="break-words">{projectInfor.projectName}</p>
          </Col>
        </Row>

        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Status:</p>
          </Col>
          <Col>
            <p>{projectInfor.completed ? "Finished" : "Processing"}</p>
          </Col>
        </Row>
        {projectInfor.point && (
          <Row gutter={[10, 10]}>
            <Col span={6}>
              <p>Point:</p>
            </Col>
            <Col>
              <p>{projectInfor.point}</p>
            </Col>
          </Row>
        )}
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Project description:</p>
          </Col>
          <Col>
            <p className="break-words">{project?.description}</p>
          </Col>
        </Row>
        <div className="flex text-zinc-400 flex-col items-end gap-2 pr-3">
          <Row gutter={[10, 10]}>
            <Col>
              <p>Start date:</p>
            </Col>
            <Col>
              <p>{project?.startDate}</p>
            </Col>
          </Row>
          {project?.endDate && (
            <Row gutter={[10, 10]}>
              <Col>
                <p>End date:</p>
              </Col>
              <Col>
                <p>{project.endDate}</p>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfor;
