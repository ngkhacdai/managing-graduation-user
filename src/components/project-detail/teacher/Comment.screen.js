import { Button, Form, Image, Input, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { FaUpload, FaLink, FaFileAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const CommentScreen = () => {
  const [showComment, setShowComment] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();
  const handleComment = () => {
    setShowComment(!showComment);
  };

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const props = {
    fileList,
    listType: "text",
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange: handleChange,
  };

  const deleteFile = (index) => {
    setFileList([...fileList.slice(0, index), ...fileList.slice(index + 1)]);
  };

  const showModalAddLink = () => {
    setIsShowModal(!isShowModal);
  };

  const handleAddLink = () => {
    const formValue = form.getFieldValue();
    console.log(formValue);
    setIsShowModal(false);
    form.resetFields(["link"]);
  };

  return (
    <div className="w-11/12 min-h-14 mx-auto">
      {showComment ? (
        <div className="mt-2">
          <TextArea
            placeholder="Announce something to this project"
            style={{ minHeight: 120, resize: "none" }}
          />
          <div className="my-2">
            {fileList.length > 0 &&
              fileList.map((item, index) => (
                <div
                  key={`file-${index}`}
                  className="flex justify-between items-center border-2 rounded-lg my-2 "
                >
                  <div className="flex items-center">
                    <div className="w-28 h-20 flex items-center justify-center border-r-2">
                      {item.type.startsWith("image/") ? (
                        <Image
                          className="w-28 h-20 rounded-l-lg"
                          src={URL.createObjectURL(item.originFileObj)}
                          alt={item.name}
                        />
                      ) : (
                        <div className="text-center">
                          <FaFileAlt className="text-2xl" />
                        </div>
                      )}
                    </div>
                    <p className="pl-2">{item.name}</p>
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
          <div className="mt-2 flex justify-between items-center">
            <div className="flex">
              <Upload {...props}>
                <Button shape="circle">
                  <FaUpload />
                </Button>
              </Upload>
              <Button
                onClick={showModalAddLink}
                shape="circle"
                className="mx-2"
              >
                <FaLink />
              </Button>
            </div>
            <div>
              <Button onClick={handleComment} className="mr-2">
                Cancel
              </Button>
              <Button type="primary">Post</Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleComment}
          className="p-5 text-gray-400 flex items-center rounded-lg hover:text-black mx-auto mt-2 cursor-pointer border-2 drop-shadow-lg"
        >
          <p>Announce something to this project</p>
        </div>
      )}
      <Modal
        onCancel={showModalAddLink}
        centered
        title="Add link"
        okText="Add link"
        open={isShowModal}
        onOk={handleAddLink}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="link" label="Link">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CommentScreen;
