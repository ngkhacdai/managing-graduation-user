import { RootState } from "@/redux/store";
import { Button, Col, Drawer, Row, Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import ModalEditPhase from "../sidebar/ModalEditPhase";

const DrawerDetailPhase = () => {
  const [isShow, setIsShow] = useState(false);
  const phaseDetail = useSelector(
    (state: RootState) => state.projectDetail.detailPhase
  );

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
              <ModalEditPhase />
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
            <Row gutter={[10, 10]}>
              <Col span={7}>
                <p>Phase description:</p>
              </Col>
              <Col>
                <p>{phaseDetail.description}</p>
              </Col>
            </Row>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default DrawerDetailPhase;
