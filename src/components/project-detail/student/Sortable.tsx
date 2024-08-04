import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Image, Modal, Upload } from "antd";
import { MdDeleteForever, MdOutlineDragIndicator } from "react-icons/md";
import { FaChalkboard, FaFileAlt, FaLink } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import TextArea from "antd/es/input/TextArea";

const Sortable = ({ containerId, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });
  const [detail, setDetail] = useState("");
  const [fileList, setFileList] = useState([]);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const onCancelDetail = () => {
    setIsShowModalDetail(false);
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
  const clearForm = () => {
    setDetail("");
    setFileList([]);
  };
  const onSave = () => {
    clearForm();
  };
  return (
    <div>
      <div
        className="mx-auto w-[272px] m-1"
        ref={setNodeRef}
        {...attributes}
        style={style}
        onClick={() => {
          setIsShowModalDetail(true);
        }}
      >
        <div className="w-full flex items-center justify-between bg-white py-2 max-w-[272px] break-words border-inherit border-2 rounded-xl">
          <div className="px-2">{item.title}</div>
          <Button type="text" className="h-full" {...listeners}>
            <MdOutlineDragIndicator />
          </Button>
        </div>
      </div>
      <Modal
        width={630}
        open={isShowModalDetail}
        onCancel={onCancelDetail}
        footer={false}
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
              {fileList.length > 0 &&
                fileList.map((item, index) => (
                  <div
                    key={`file-${index}`}
                    className="flex justify-between items-center border-2 max-w-[34rem] rounded-lg my-2 "
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
            <div className="flex justify-between items-center mt-2">
              <div>
                <Button type="primary" onClick={onSave}>
                  Save
                </Button>
                <Button className="mx-2" onClick={clearForm}>
                  Clear form
                </Button>
              </div>
              <Upload {...props}>
                <Button shape="circle">
                  <FaLink />
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sortable;
