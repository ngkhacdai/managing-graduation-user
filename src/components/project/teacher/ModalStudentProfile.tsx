import { getStudentProfileByProjectId } from "@/api/Student";
import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";

const ModalStudentProfile = ({ projectId }) => {
  const t = useTranslations("Project");
  const [detail, setDetails] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const openModal = async () => {
    setIsShowModal(true);
    const response = await getStudentProfileByProjectId(projectId);

    setDetails(response);
  };

  return (
    <div>
      <Tooltip title={t("detailStudent")}>
        <Button
          type="primary"
          onClick={() => openModal()}
          className="bg-yellow-600 hover:!bg-yellow-500"
        >
          <BiSolidUserDetail />
        </Button>
      </Tooltip>

      <Modal
        title="Profile student"
        open={isShowModal}
        footer={false}
        onCancel={() => setIsShowModal(false)}
      >
        <div>
          <p className="text-lg font-semibold">Information</p>
          <hr />
          <div className="flex mt-2">
            <img src="" alt="" className="w-20 h-20 border-2 rounded-full" />
            <div className="ml-2 p-2">
              <p className="font-semibold text-lg">{detail?.studentName}</p>
              <p>{detail?.email}</p>
              <p>Phone: {detail?.phone}</p>
              <p>Branch: {detail?.branch}</p>
            </div>
          </div>
          <p className="text-lg font-semibold">Project information</p>
          <hr />
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{detail?.projectName}</p>
              <p>{detail?.projectStartDate}</p>
            </div>
            <p className="whitespace-pre-wrap break-words">
              {detail?.projectDescription}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalStudentProfile;
