import { getDetailRegis } from "@/api/Student";
import { revokeRegistrationByStudent } from "@/redux/slices/RegistrationSlice";
import { AppDispatch } from "@/redux/store";
import { Button, Col, Form, Input, Modal, Row, Tag, Tooltip } from "antd";
import useMessage from "antd/es/message/useMessage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { useDispatch } from "react-redux";

const ModalDetail = ({ regisId, status }) => {
  const [message, contentHolder] = useMessage();
  const [isShow, setIsShow] = useState(false);
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [detail, setDetail] = useState(null);
  console.log(detail);

  const fetchDetail = async () => {
    const response = await getDetailRegis(regisId);
    setDetail(response);
  };
  useEffect(() => {
    if (!detail && isShow) {
      fetchDetail();
    }
  }, [isShow]);
  const handelRevoke = async () => {
    await dispatch(revokeRegistrationByStudent(regisId));
    message.success("Revoke registration successfully");
    setTimeout(() => {
      setIsShow(false);
    }, 500);
  };
  return (
    <div>
      {contentHolder}
      <Tooltip title="View detail">
        <Button type="primary" onClick={() => setIsShow(true)}>
          <BiDetail />
        </Button>
      </Tooltip>
      <Modal
        title="Registration"
        open={isShow}
        onCancel={() => {
          setIsShow(false);
        }}
        footer={
          status == "pending" ? (
            <div>
              <Button
                onClick={() => {
                  setIsShow(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handelRevoke}
                type="primary"
                className="bg-red-500 hover:!bg-red-400 mx-2"
              >
                Revoke
              </Button>
            </div>
          ) : (
            false
          )
        }
      >
        {detail && (
          <div>
            <div className="flex flex-col gap-2">
              <Row gutter={[10, 10]}>
                <Col className="flex items-center" xs={24} sm={7}>
                  <p>Project name:</p>
                  <Tooltip title="View detail registration">
                    <Link
                      href={`/${
                        pathName.split("/")[1]
                      }/registration/${regisId}`}
                    >
                      <p className="text-blue-600 mx-2">
                        <MdRemoveRedEye size={18} />
                      </p>
                    </Link>
                  </Tooltip>
                </Col>
                <Col>{detail.projectName}</Col>
                <Col></Col>
              </Row>
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={7}>
                  Mentor:
                </Col>
                <Col xs={24} sm={17}>
                  {detail.teacherName}
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
                  Project description:
                </Col>
                <Col xs={24} sm={17}>
                  {detail.projectDescription}
                </Col>
              </Row>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-end">
                <p className="mr-2">Status: </p>
                <Tag
                  color={
                    status == "pending"
                      ? "yellow"
                      : status == "approve"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </Tag>
              </div>
              <div className="flex mt-2 justify-end">
                <p className="mr-2">Create at: </p>
                <p>{detail.regisDate}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalDetail;
