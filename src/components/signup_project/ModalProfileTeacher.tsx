import { getTeacherProfileById } from "@/api/Teacher";
import { Button, Col, Modal, Row } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const ModalProfileTeacher = ({ id }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const pathName = usePathname();
  const [detail, setDetails] = useState(null);
  const openModal = async () => {
    setIsShowModal(true);
    const response = await getTeacherProfileById(id);

    setDetails(response);
  };
  return (
    <div>
      <Button
        className="bg-red-600 mx-2 hover:!bg-red-500"
        type="primary"
        onClick={openModal}
      >
        Detail
      </Button>
      <Modal
        className="!w-1/2"
        title="Mentor profile"
        onCancel={() => setIsShowModal(false)}
        open={isShowModal}
        footer={false}
      >
        <div className="flex bg-slate-200">
          <div className="w-1/3 text-center m-1 p-2 bg-white break-all">
            <img
              src={detail?.avatar}
              alt=""
              className="mx-auto border-2 rounded-full w-28 h-32"
            />
            <p className="text-xl my-1">{detail?.fullName}</p>
            <p className="break-all my-1">{detail?.branch}</p>
            <p className="my-1">{detail?.numberOfMentees}/5</p>
          </div>
          <div className="w-2/3 bg-white m-1 p-2 break-all">
            <Row className="mt-2">
              <Col span={8}>Full Name:</Col>
              <Col className=" break-all" span={16}>
                {detail?.fullName}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col span={8}>Email:</Col>
              <Col className=" break-all" span={16}>
                {detail?.email}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col span={8}>Phone:</Col>
              <Col className=" break-all" span={16}>
                {detail?.phoneNumber}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col span={8}>Degree:</Col>
              <Col className=" break-all" span={16}>
                {detail?.degree}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col span={8}>Begin teaching year:</Col>
              <Col className=" break-all" span={16}>
                {detail?.beginTeachingYear}
              </Col>
            </Row>
            <Row className="mt-2 flex justify-center">
              <a target="_blank" href={`/${pathName.split("/")[1]}`}>
                <Button type="primary">View project</Button>
              </a>
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalProfileTeacher;
