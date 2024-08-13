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
import { useDispatch } from "react-redux";
import {
  commentTask,
  deleteImage,
  deleteTask,
  updateDescriptionTask,
} from "@/redux/slices/ProjectDetailSlice";
import { PiStudent } from "react-icons/pi";
import { isPhaseFinished } from "@/utils/checkPhaseFinished";

const ModalDetailTask = ({ item, setIsShowModal, containerId }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [detail, setDetail] = useState(item.detail.description);
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
  const props = {
    fileList,
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange: handleChange,
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
    messageApi.success("Save description successfully");
  };

  const clearFormComment = () => {
    setComment("");
  };

  const onDeleteTask = async () => {
    dispatch(deleteTask({ containerId: containerId, taskId: item.id, detail }));
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
        commentTask({
          containerId,
          taskId: item.id,
          comment,
          role: "Student",
        })
      );
      clearFormComment();
      return messageApi.success("Save comment successfully");
    }
    return messageApi.error("Comment is empty");
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
              {!isPhaseFinished() && (
                <Popover
                  arrow={false}
                  content={
                    <div>
                      <p className="text-red-500 font-semibold text-lg">
                        You can not undo when delete this: {item.title}
                      </p>
                      <p>Do you still want to delele?</p>
                      <div className="text-right">
                        <Button
                          className="!bg-red-500 hover:!bg-red-400"
                          type="primary"
                          onClick={onDeleteTask}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button>Delete Task</Button>
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
            <p className="text-slate-600 font-semibold text-lg">Detail</p>
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
              placeholder="Task details"
              className="sm:min-w-[34rem] container min-h-96"
            />
            <div className="my-2">
              {item.detail.fileList.map(
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
            {!isPhaseFinished() && (
              <div className="flex justify-between items-center mt-2">
                <div>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => {
                        onSaveDetail();
                      }}
                    >
                      Save
                    </Button>
                    <Button className="mx-2" onClick={clearFormDetail}>
                      Clear form
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
              {!isPhaseFinished() && (
                <Button type="primary" onClick={onSaveComment}>
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {item.detail.comment.map((items, index) => {
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
