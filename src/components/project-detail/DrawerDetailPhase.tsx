import { RootState } from "@/redux/store";
import { Button, Col, Drawer, Row, Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import ModalEditPhase from "../sidebar/ModalEditPhase";
import { useIsPhaseFinished } from "@/utils/checkPhaseFinished";
import ModalMark from "./ModalMark";
import { useSearchParams } from "next/navigation";

const DrawerDetailPhase = ({ role }) => {
  const [isShow, setIsShow] = useState(false);
  const phaseDetail = useSelector(
    (state: RootState) => state.projectDetail.detailPhase
  );
  console.log(phaseDetail);

  const changeUrlToSearchParams = (url: string) => {
    // Use encodeURIComponent to safely encode the URL
    const encodedUrl = encodeURIComponent(url);
    // Replace any existing '/' with '_'
    return `/preview/${encodedUrl.replace(/\//g, "_")}`;
  };
  return (
    <div>
      <Tooltip title="View phase detail">
        <BiDetail
          onClick={() => setIsShow(true)}
          className="cursor-pointer"
          size={18}
          color="white"
        />
      </Tooltip>
      {phaseDetail && (
        <Drawer
          open={isShow}
          onClose={() => setIsShow(false)}
          title={
            <div className="flex items-center justify-between">
              <p>Detail</p>
              {!phaseDetail.completed && role == "student" && (
                <ModalEditPhase />
              )}
            </div>
          }
          bodyStyle={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            <Row gutter={[10, 10]}>
              <Col span={7}>
                <p>Phase name: </p>
              </Col>
              <Col>
                <p>{phaseDetail.phaseName}</p>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={7}>
                <p>Start time:</p>
              </Col>
              <Col>
                <p>
                  {moment(phaseDetail.startTime).format("DD/MM/YYYY, hh:mm")}
                </p>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={7}>
                <p>Expected end:</p>
              </Col>
              <Col>
                <p>
                  {moment(phaseDetail.expectedEnd).format("DD/MM/YYYY, hh:mm")}
                </p>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={7}>
                <p>End time:</p>
              </Col>
              <Col>
                <p>
                  {phaseDetail.endTime ? (
                    moment(phaseDetail.endTime).format("DD/MM/YYYY, hh:mm")
                  ) : (
                    <p>now</p>
                  )}
                </p>
              </Col>
            </Row>
            {phaseDetail.completed && (
              <Row gutter={[10, 10]}>
                <Col span={7}>
                  <p>File:</p>
                </Col>
                <Col>
                  <a
                    target="_blank"
                    href={changeUrlToSearchParams(phaseDetail.filePdf)}
                    className="line-clamp-1"
                  >
                    fileSubmit.pdf
                  </a>
                </Col>
              </Row>
            )}
            <Row gutter={[10, 10]}>
              <Col span={7}>
                <p>Phase description:</p>
              </Col>
              <Col>
                <p className="break-words whitespace-pre-wrap">
                  {phaseDetail.description}
                </p>
              </Col>
            </Row>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default DrawerDetailPhase;
