"use client";
import { finishingPhase, removePhase } from "@/redux/slices/ProjectDetailSlice";
import { isPhaseFinished } from "@/utils/checkPhaseFinished";
import { Button, Dropdown, Modal } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";

const Navigation = ({ role }) => {
  const phase = useSelector((state) => state.projectDetail.phase);
  const searchParams = useSearchParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const onCancel = () => {
    setTitle("");
    setIsShowModal(false);
  };
  const dispatch = useDispatch();
  const onOk = () => {
    switch (title) {
      case "Delete": {
        dispatch(removePhase());
      }
      case "Finish": {
        dispatch(finishingPhase());
      }
      default:
    }
    onCancel();
  };
  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            setTitle("Delete");
            setIsShowModal(true);
          }}
        >
          Delete
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={() => {
            setTitle("Finish");
            setIsShowModal(true);
          }}
        >
          Finish
        </p>
      ),
    },
  ];
  return (
    <>
      <div className="md:px-7 flex items-center justify-between bg-blue-700">
        <p className="py-2 font-bold text-white text-lg">
          Project: {searchParams.get("projectName")}
        </p>
        {!isPhaseFinished() && role == "student" && (
          <div className="flex items-center">
            <Dropdown menu={{ items }}>
              <div className="hover:cursor-pointer">
                <SlOptionsVertical size={18} color="white" />
              </div>
            </Dropdown>
          </div>
        )}
      </div>
      <Modal
        onCancel={onCancel}
        onOk={onOk}
        open={isShowModal}
        title={`${title} phase`}
      >
        <p>This action can not undo. Do you want to continue?</p>
      </Modal>
    </>
  );
};

export default Navigation;
