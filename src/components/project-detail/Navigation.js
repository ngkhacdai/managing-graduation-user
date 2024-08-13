"use client";
import { isPhaseFinished } from "@/utils/checkPhaseFinished";
import { Button, Modal } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Navigation = ({ role }) => {
  const searchParams = useSearchParams();
  const [isShowModal, setIsShowModal] = useState(false);

  const onCancel = () => {
    setIsShowModal(false);
  };
  const onOk = () => {
    onCancel();
  };

  return (
    <>
      <div className="md:px-7 flex items-center justify-between bg-blue-700">
        <p className="py-2 font-bold text-white text-lg">
          Project: {searchParams.get("projectName")}
        </p>
        {!isPhaseFinished() && role == "student" && (
          <Button onClick={() => setIsShowModal(true)}>Finish</Button>
        )}
      </div>
      <Modal
        onCancel={onCancel}
        onOk={onOk}
        open={isShowModal}
        title="Do you want to finish this phase"
      >
        <p>You can not undo</p>
      </Modal>
    </>
  );
};

export default Navigation;
