import {
  finishProject,
  setCompleteProject,
} from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, Form, Image, Input, Modal, Tooltip, Upload } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaFileAlt, FaLink } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IoMdReturnLeft } from "react-icons/io";
import { MdDeleteForever, MdOutlineFileDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const ModalTurnIn = ({ collapsed }) => {
  const t = useTranslations("SideBar");
  const [fileList, setFileList] = useState([]);
  const [messageAPI, contextHolder] = useMessage();
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const onCancel = () => {
    setIsShowModal(false);
  };
  const handleOk = () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      dispatch(finishProject(formData));
    } else {
      messageAPI.error("You must upload a file to finish the project!");
    }
  };
  const deleteFile = (index) => {
    setFileList([...fileList.slice(0, index), ...fileList.slice(index + 1)]);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const beforeUpload = (file) => {
    const isLessThan1MB = file.size / 1024 / 1024 < 1;

    if (!isLessThan1MB) {
      messageAPI.error("File must be smaller than 1MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const props = {
    fileList,
    name: "file",
    accept: ".pdf",
    multiple: true,
    showUploadList: false,
    onChange: handleChange,
    beforeUpload,
  };
  const changeUrlToSearchParams = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    return `/preview/${encodedUrl.replace(/\//g, "_")}`;
  };
  return (
    <>
      {contextHolder}
      <Tooltip title={t("finish")}>
        <Button
          className="flex w-full items-center my-2 justify-start"
          onClick={() => setIsShowModal(true)}
        >
          <IoMdReturnLeft />
          {!collapsed && <p>{t("finish")}</p>}
        </Button>
      </Tooltip>
      <Modal
        onOk={handleOk}
        title={"Turn in"}
        onCancel={onCancel}
        open={isShowModal}
      >
        {fileList.length <= 0 && (
          <Upload {...props}>
            <Button className="w-full flex items-center">
              <FaLink />
              <p>Click to upload file</p>
            </Button>
          </Upload>
        )}
        {fileList.length > 0 &&
          fileList.map((item, index) => {
            console.log(item);
            return (
              <div
                key={`file-${index}`}
                className="flex justify-between items-center border-2 max-w-[34rem] rounded-lg my-2"
              >
                <div className="flex items-center">
                  <div className="w-28 h-20 flex items-center justify-center border-r-2">
                    {item?.type?.startsWith("image/") ? (
                      <Image
                        className="min-w-28 max-w-28 max-h-20 rounded-l-lg"
                        src={URL.createObjectURL(item.originFileObj)}
                        alt={item.name}
                      />
                    ) : (
                      <div className="text-center">
                        <FaFileAlt className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <p className="pl-2 max-w-96 line-clamp-1">{item?.name}</p>
                </div>
                <div className="flex">
                  <Tooltip
                    title={<p className="text-center">{t("download")}</p>}
                  >
                    <a href={item.url}>
                      <MdOutlineFileDownload color="black" size={28} />
                    </a>
                  </Tooltip>

                  <Tooltip title={<p className="text-center">{t("view")}</p>}>
                    <a
                      href={changeUrlToSearchParams(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GrFormView color="black" size={28} />
                    </a>
                  </Tooltip>
                  <Tooltip
                    title={<p className="text-center">{t("deleteFile")}</p>}
                  >
                    <MdDeleteForever
                      onClick={() => deleteFile(index)}
                      size={28}
                      className="mr-5 cursor-pointer"
                    />
                  </Tooltip>
                </div>
              </div>
            );
          })}
      </Modal>
    </>
  );
};

export default ModalTurnIn;
