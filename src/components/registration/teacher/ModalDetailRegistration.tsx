import { Button, Col, Form, Input, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import ModalReject from "./ModalReject";
import { getDetailRegis } from "@/api/Teacher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { appoveStudentByTeacher } from "@/redux/slices/RegistrationSlice";
import useMessage from "antd/es/message/useMessage";

const ModalDetailRegistration = ({ regisId, status }) => {
  const [message, contentHolder] = useMessage();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const fetchDetail = async () => {
    const response = await getDetailRegis(regisId);
    setDetail(response);
  };
  const error = useSelector((state: RootState) => state.registration.error);
  useEffect(() => {
    if (!detail && showModal) {
      fetchDetail();
    }
  }, [showModal]);
  const approveStudent = async () => {
    await dispatch(appoveStudentByTeacher(regisId));
    if (error) {
      return message.error(error);
    }
    message.success("Approve student successfully");
    setShowModal(false);
  };
  return (
    <div>
      {contentHolder}
      <Button type="primary" onClick={() => setShowModal(true)}>
        Detail
      </Button>
      {detail && (
        <Modal
          open={showModal}
          title="Registration"
          footer={
            status == "pending" ? (
              <div className="flex justify-end">
                <Button onClick={approveStudent} type="primary">
                  Approve
                </Button>
                <ModalReject regisId={regisId} />
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            ) : (
              false
            )
          }
          onCancel={() => setShowModal(false)}
        >
          <div className="flex flex-col gap-2">
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={7}>
                Student:
              </Col>
              <Col>
                <p>{detail?.studentProfileView?.fullName}</p>
              </Col>
              <Col>
                <Link
                  href={`/${pathName.split("/")[1]}/registration/${
                    detail?.regisId
                  }`}
                >
                  <p className="text-blue-600 underline">View detail</p>
                </Link>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={7}>
                Project name:
              </Col>
              <Col xs={24} sm={17}>
                {detail.projectName}
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={7}>
                Major:
              </Col>
              <Col xs={24} sm={17}>
                {detail.major}
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={7}>
                Project Description:
              </Col>
              <Col xs={24} sm={17}>
                {detail.projectDescription}
              </Col>
            </Row>
            <Row justify={"end"} gutter={[10, 10]}>
              <Col>
                <p>Create at:</p>
              </Col>
              <Col>
                <p className="text-right font-semibold">
                  {detail.registrationDate}
                </p>
              </Col>
            </Row>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ModalDetailRegistration;
