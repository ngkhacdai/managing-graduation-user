import { Button, Col, Form, Input, Modal, Row, Tag, Tooltip } from "antd";
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
import { MdRemoveRedEye } from "react-icons/md";

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
          title={
            <div className="flex items-center gap-2">
              <p>Registration</p>
              <Tag
                className="text-base"
                color={
                  status == "pending"
                    ? "yellow"
                    : status == "approved"
                    ? "green"
                    : "red"
                }
              >
                {status}
              </Tag>
            </div>
          }
          className="!w-full md:!w-2/3 lg:!w-1/2"
          footer={
            <div>
              {status == "pending" ? (
                <div className="flex justify-end items-center gap-2">
                  <Button
                    type="primary"
                    className="!bg-gray-200 !text-gray-600 !border-gray-300 hover:!bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Link
                    href={`/${pathName.split("/")[1]}/registration/${regisId}`}
                  >
                    <Button type="primary">
                      <p>View file upload</p>
                    </Button>
                  </Link>
                  <ModalReject regisId={regisId} />
                  <Button
                    onClick={approveStudent}
                    className="!bg-green-500 text-white hover:!bg-green-400"
                    type="primary"
                  >
                    Approve
                  </Button>
                </div>
              ) : (
                <Link
                  href={`/${pathName.split("/")[1]}/registration/${regisId}`}
                >
                  <Button type="primary">
                    <p>View file upload</p>
                  </Button>
                </Link>
              )}
            </div>
          }
          onCancel={() => setShowModal(false)}
        >
          <div className="flex flex-col gap-2">
            <Row gutter={[10, 10]}>
              <Col className="flex items-center gap-2" xs={24} sm={7}>
                Student:
              </Col>
              <Col>
                <p>{detail?.studentProfileView?.fullName}</p>
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
                Session:
              </Col>
              <Col xs={24} sm={17}>
                {detail.session}
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={7}>
                Deadline:
              </Col>
              <Col xs={24} sm={17}>
                {detail.timeLimit}
              </Col>
            </Row>
            <div>
              <p>Project description:</p>
              <p className="whitespace-pre-wrap break-words">
                {detail.projectDescription}
              </p>
            </div>
            {detail?.rejectReason && (
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={7}>
                  Reasion rejected:
                </Col>
                <Col xs={24} sm={17}>
                  {detail.rejectReason}
                </Col>
              </Row>
            )}
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
