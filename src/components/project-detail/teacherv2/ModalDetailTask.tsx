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
import { MdDeleteForever } from "react-icons/md";
import { Button, Image, message, Modal, Popover, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteImage,
  deleteTask,
  updateDescriptionTask,
} from "@/redux/slices/ProjectDetailSlice";
import { PiStudent } from "react-icons/pi";
import { useIsPhaseFinished } from "@/utils/checkPhaseFinished";
import { useTranslations } from "next-intl";
import { AppDispatch } from "@/redux/store";

const ModalDetailTask = ({ item, setIsShowModal, containerId }) => {
  const t = useTranslations("ProjectDetail");
  const dispatch = useDispatch<AppDispatch>();
  const isPhaseFinished = useIsPhaseFinished();
  const [messageApi, contextHolder] = message.useMessage();
  const [detail, setDetail] = useState(
    item?.detail?.description ? item?.detail?.description : ""
  );
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  useEffect(() => {
    setIsShowModalDetail(true);
  }, []);
  const onCancelDetail = () => {
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
    accept: ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.pdf,image/*",
    multiple: true,
    showUploadList: false,
    onChange: handleChange,
    beforeUpload,
  };
  const clearFormDetail = () => {
    setDetail("");
    setFileList([]);
  };

  const onSaveDetail = () => {
    dispatch(
      updateDescriptionTask({
        containerId,
        taskId: item.id,
        description: detail,
      })
    );
    messageApi.success(t("saveDescription"));
  };

  const clearFormComment = () => {
    setComment("");
  };

  const onDeleteTask = async () => {
    dispatch(
      deleteTask({
        containerId: containerId.split("container-")[1],
        taskId: item.id.split("task-")[1],
      })
    );
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const deleteImageByUrl = (url) => {
    dispatch(deleteImage({ url, containerId, taskId: item.id }));
  };
  const onSaveComment = () => {
    if (comment.length > 0) {
      dispatch(
        createComment({
          containerId,
          taskId: item.id,
          content: comment,
          role: "Student",
        })
      );
      clearFormComment();
      return messageApi.success(t("saveComment"));
    }
    return messageApi.error(t("commentEmty"));
  };
  return (
    <div>
      {contextHolder}
      <Modal
        width={630}
        open={isShowModalDetail}
        onCancel={onCancelDetail}
        footer={() => {
          return (
            <div>
              {!isPhaseFinished && (
                <Popover
                  arrow={false}
                  content={
                    <div>
                      <p className="text-red-500 font-semibold text-lg">
                        {t("notiDelete")}: {item.title}
                      </p>
                      <p>{t("notiDeleteTask")}</p>
                      <div className="text-right">
                        <Button
                          className="!bg-red-500 hover:!bg-red-400"
                          type="primary"
                          onClick={onDeleteTask}
                        >
                          {t("delete")}
                        </Button>
                      </div>
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button>{t("btnDeleteTask")}</Button>
                </Popover>
              )}
            </div>
          );
        }}
        title={
          <div className="flex items-center">
            <FaChalkboard />
            <p className="mx-2">{item.title}</p>
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
              onChange={(e) => setDetail(e.target.value)}
              styles={{
                textarea: {
                  width: "100%",
                  minHeight: 150,
                },
              }}
              placeholder={t("plhTaskDetail")}
              className="sm:min-w-[34rem] container min-h-96"
            />
            <div className="my-2">
              {item?.detail?.fileList?.map(
                (items: { url: string; title: string }, index: number) => {
                  return (
                    <div
                      key={`Url-Image-${index}`}
                      className="flex justify-between items-center border-2 max-w-[34rem] rounded-lg my-2"
                    >
                      <div className="flex items-center">
                        <div>
                          {items.url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                            <Image
                              className="min-w-28 max-w-28 max-h-20 rounded-l-lg"
                              src={items.url}
                              alt={item.title}
                            />
                          ) : (
                            <div className="text-center">
                              <FaFileAlt className="text-2xl" />
                            </div>
                          )}
                        </div>
                        <p className="pl-2 max-w-96 line-clamp-1">
                          {item?.title}
                        </p>
                      </div>
                      <MdDeleteForever
                        onClick={() => {
                          deleteImageByUrl(items.url);
                        }}
                        size={28}
                        className="mr-5 cursor-pointer"
                      />
                    </div>
                  );
                }
              )}
              {fileList.length > 0 &&
                fileList.map((item, index) => (
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
                    <MdDeleteForever
                      onClick={() => {
                        deleteFile(index);
                      }}
                      size={28}
                      className="mr-5 cursor-pointer"
                    />
                  </div>
                ))}
            </div>
            {!useIsPhaseFinished() && (
              <div className="flex justify-between items-center mt-2">
                <div>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => {
                        onSaveDetail();
                      }}
                    >
                      {t("Save")}
                    </Button>
                    <Button className="mx-2" onClick={clearFormDetail}>
                      {t("ClearForm")}
                    </Button>
                  </div>
                </div>
                <Upload {...props}>
                  <Button shape="circle">
                    <FaLink />
                  </Button>
                </Upload>
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-3">
          <FaCommentAlt size={18} color="#44546F" />
          <div className="pl-2">
            <p className="text-slate-600 font-semibold text-lg ">Comment</p>
            <TextArea
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
              {!useIsPhaseFinished() && (
                <Button type="primary" onClick={onSaveComment}>
                  {t("Save")}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {item?.detail?.comment?.map((items, index) => {
            return (
              <div key={`comment-${index}`}>
                <div className="flex my-1">
                  <div className="border-2 p-1 w-8 h-8 bg-slate-400 rounded-full flex items-center justify-between">
                    {items.role === "Teacher" ? (
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
        </div>
      </Modal>
    </div>
  );
};

export default ModalDetailTask;
