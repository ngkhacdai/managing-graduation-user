import { unSubmitFile } from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch } from "@/redux/store";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { PiHandWithdraw } from "react-icons/pi";
import { useDispatch } from "react-redux";

const ModalRecall = ({ collapsed }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const showModal = () => {
    setIsShow(true);
  };
  const handleOk = () => {
    dispatch(unSubmitFile());
    setIsShow(false);
  };
  const handleCancel = () => {
    setIsShow(false);
  };
  return (
    <div>
      <Button className="flex items-center w-full" onClick={showModal}>
        <PiHandWithdraw />

        {!collapsed && "Unsubmit"}
      </Button>
      <Modal
        onOk={handleOk}
        open={isShow}
        onCancel={handleCancel}
        title="Unsubmit"
      >
        <div>
          <p>Are you sure you want to unsubmit your file?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalRecall;
