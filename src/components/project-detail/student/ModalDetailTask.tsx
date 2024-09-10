import React, { useEffect, useState } from "react";
import {
  FaChalkboard,
  FaChalkboardTeacher,
  FaCommentAlt,
  FaFileAlt,
  FaLink,
} from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import TextArea from "antd/es/input/TextArea";
import {
  MdDeleteForever,
  MdOutlineFileDownload,
  MdUpload,
} from "react-icons/md";
import { Button, Image, message, Modal, Popover, Tooltip, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDetail,
  createComment,
  deleteImage,
  deleteTask,
  getDetailTask,
} from "@/redux/slices/ProjectDetailSlice";
import { PiStudent } from "react-icons/pi";
import { useIsPhaseFinished } from "@/utils/checkPhaseFinished";
import { useTranslations } from "next-intl";
import { AppDispatch, RootState } from "@/redux/store";
import { updateDescriptionTaskById } from "@/api/Project";
import { GrFormView } from "react-icons/gr";

const ModalDetailTask = ({ taskId, setIsShowModal, containerId }) => {
  const t = useTranslations("ProjectDetail");
  const dispatch = useDispatch<AppDispatch>();
  const isPhaseFinished = useIsPhaseFinished();
  const [messageApi, contextHolder] = message.useMessage();
  const [detail, setDetail] = useState("");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const detailTask = useSelector(
    (state: RootState) => state.projectDetail.detailTask
  );

  useEffect(() => {
    dispatch(getDetailTask(taskId.split("task-")[1]));
    setIsShowModalDetail(true);
  }, []);
  useEffect(() => {
    if (detailTask) {
      setDetail(detailTask.taskDescription || "");

      if (detailTask.filePdf && detailTask.fileName) {
        setFileList([
          {
            uid: "-1",
            name: detailTask.fileName, // The name of the file
            status: "done", // Status of the file
            url: detailTask.filePdf, // The URL of the file
            type: "application/pdf", // The type of the file
          },
        ]);
      }
    }
  }, [detailTask]);
  const onCancelDetail = () => {
    dispatch(clearDetail());
    clearFormDetail();
    setIsShowModalDetail(false);
    setTimeout(() => {
      setIsShowModal(false);
    }, 300);
  };

  const deleteFile = (index) => {
    setFileList([...fileList.slice(0, index), ...fileList.slice(index + 1)]);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const beforeUpload = (file) => {
    const isLessThan1MB = file.size / 1024 / 1024 < 1;

    if (!isLessThan1MB) {
      message.error("File must be smaller than 1MB!");
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

  const clearFormDetail = () => {
    setDetail("");
    setFileList([]);
  };

  const onSaveDetail = async () => {
    try {
      const formData = new FormData();
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("file", fileList[0].originFileObj);
      }
      formData.append("description", detail);
      const id = taskId.split("task-")[1];

      await updateDescriptionTaskById(formData, id);
      return messageApi.success(t("saveDescription"));
    } catch (error) {
      console.log(error);
      return messageApi.error(t(error));
    }
  };

  const clearFormComment = () => {
    setComment("");
  };

  const onDeleteTask = async () => {
    dispatch(
      deleteTask({
        containerId: containerId.split("container-")[1],
        taskId: detailTask.taskId.split("task-")[1],
      })
    );
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onSaveComment = () => {
    if (comment.length > 0) {
      dispatch(
        createComment({
          containerId,
          taskId: detailTask.taskId.split("task-")[1],
          content: comment,
          role: "Student",
        })
      );
      clearFormComment();
      messageApi.success(t("saveComment"));
    } else {
      messageApi.error(t("commentEmty"));
    }
  };
  const changeUrlToSearchParams = (url: string) => {
    // Use encodeURIComponent to safely encode the URL
    const encodedUrl = encodeURIComponent(url);
    // Replace any existing '/' with '_'
    return `/preview/${encodedUrl.replace(/\//g, "_")}`;
  };

  return (
    <div>
      {contextHolder}
      <Modal
        width={630}
        open={isShowModalDetail}
        onCancel={onCancelDetail}
        footer={
          !isPhaseFinished && (
            <Popover
              arrow={false}
              content={
                <div>
                  <p className="text-red-500 font-semibold text-lg">
                    {t("notiDelete")}: {detailTask.taskName}
                  </p>
                  <p>{t("notiDeleteTask")}</p>
                  <div className="text-right">
                    <Button
                      className="!bg-red-500 hover:!bg-red-400"
                      type="primary"
                      onClick={onDeleteTask}
                    >
                      {t("btnDeleteTask")}
                    </Button>
                  </div>
                </div>
              }
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button className="!bg-red-500 hover:!bg-red-400" type="primary">
                {t("btnDeleteTask")}
              </Button>
            </Popover>
          )
        }
        title={
          <div className="flex items-center">
            <FaChalkboard />
            <p className="mx-2">{detailTask.taskName}</p>
          </div>
        }
      >
        <div className="flex">
          <BiSolidDetail size={18} color="#44546F" />
          <div className="px-2">
            <p className="text-slate-600 font-semibold text-lg">
              {t("Detail")}
            </p>
            <TextArea
              autoSize={true}
              value={detail}
              disabled={isPhaseFinished}
              onChange={(e) => setDetail(e.target.value)}
              style={{ width: "100%", minHeight: 150 }}
              placeholder={t("plhTaskDetail")}
              className="sm:min-w-[34rem] container min-h-96"
            />
            <div className="my-2">
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
                        <p className="pl-2 max-w-96 line-clamp-1">
                          {item?.name}
                        </p>
                      </div>
                      <div className="flex">
                        <Tooltip
                          title={<p className="text-center">{t("download")}</p>}
                        >
                          <a href={item.url}>
                            <MdOutlineFileDownload color="black" size={28} />
                          </a>
                        </Tooltip>

                        <Tooltip
                          title={<p className="text-center">{t("view")}</p>}
                        >
                          <a
                            href={changeUrlToSearchParams(item.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GrFormView color="black" size={28} />
                          </a>
                        </Tooltip>
                        {!isPhaseFinished && (
                          <Tooltip
                            title={
                              <p className="text-center">{t("deleteFile")}</p>
                            }
                          >
                            <MdDeleteForever
                              onClick={() => deleteFile(index)}
                              size={28}
                              className="mr-5 cursor-pointer"
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            {!isPhaseFinished && (
              <div className="flex justify-between items-center mt-2">
                <div>
                  <Button type="primary" onClick={onSaveDetail}>
                    {t("Save")}
                  </Button>
                  <Button className="mx-2" onClick={clearFormDetail}>
                    {t("ClearForm")}
                  </Button>
                </div>
                {fileList.length < 1 && (
                  <Upload {...props}>
                    <Button shape="circle">
                      <Tooltip title="Upload file attachment">
                        <MdUpload className="text-2xl" />
                      </Tooltip>
                    </Button>
                  </Upload>
                )}
              </div>
            )}
          </div>
        </div>

        {/* <div className="flex mt-3">
          <FaCommentAlt size={18} color="#44546F" />
          <div className="pl-2">
            <p className="text-slate-600 font-semibold text-lg ">Comment</p>
            <TextArea
              disabled={isPhaseFinished}
              autoSize={true}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              styles={{
                textarea: {
                  width: "100%",
                  minHeight: 50,
                },
              }}
              placeholder="Comment"
              className="sm:min-w-[34rem] container min-h-96"
            />
            <div className="flex justify-between items-center mt-2">
              {!isPhaseFinished && (
                <Button type="primary" onClick={onSaveComment}>
                  {t("Save")}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {detailTask?.commentViewList?.map((items, index) => {
            return (
              <div key={`comment-${index}`}>
                <div className="flex my-1">
                  <div className="border-2 p-1 w-8 h-8 bg-slate-400 rounded-full flex items-center justify-between">
                    {items.role === "TEACHER" ? (
                      <FaChalkboardTeacher size={16} />
                    ) : (
                      <PiStudent size={16} />
                    )}
                  </div>

                  <p className="ml-1 p-2 w-full border-2 border-inherit rounded-lg">
                    {items.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div> */}
      </Modal>
    </div>
  );
};

export default ModalDetailTask;
