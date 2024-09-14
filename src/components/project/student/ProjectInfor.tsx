import { updateDescription } from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, Col, Row, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

const ProjectInfor = ({ projectInfor }) => {
  const [message, contextHolder] = useMessage();
  const pathName = usePathname();
  const router = useRouter();
  const project = useSelector(
    (state: RootState) => state.projectDetail.detailProject
  );
  const [editText, setEditText] = useState(projectInfor?.description);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
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
  const handleSave = () => {
    const form = {
      description: editText,
    };
    dispatch(updateDescription(form));
    message.success("Updated description successfully");
    setIsEdit(false);
  };
  return (
    <div className="border-2 rounded-lg p-2">
      {contextHolder}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold ">Manage project</p>
        <Button type="primary" onClick={viewPhase} className="my-2">
          Overview
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
            <p>Session name:</p>
          </Col>
          <Col>
            <p>{projectInfor.session}</p>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <p>Deadline:</p>
          </Col>
          <Col className="flex items-center gap-2">
            <p>{projectInfor.timeLimit}</p>
            <p>
              {project &&
                project?.endDate &&
                moment(project.endDate).isAfter(
                  moment(projectInfor.timeLimit)
                ) &&
                `(turn in late by ${moment(project.endDate).diff(
                  moment(projectInfor.timeLimit),
                  "days"
                )} days)`}
            </p>
          </Col>
        </Row>
        {isEdit ? (
          <div>
            <TextArea
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
              autoSize={{ minRows: 3 }}
            />
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} type="primary">
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Row gutter={[10, 10]}>
              <Col span={6}>
                <p>Project description:</p>
              </Col>
              <Col>
                <p className="break-words whitespace-pre-wrap	">
                  {project?.description}
                </p>
              </Col>
            </Row>
            <div className="flex justify-end">
              {!projectInfor.completed && (
                <Tooltip title={"Edit description"}>
                  <Button
                    type="primary"
                    onClick={() => setIsEdit(true)}
                    className="bg-yellow-500 w-24 hover:!bg-yellow-300"
                  >
                    <CiEdit />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        )}
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
