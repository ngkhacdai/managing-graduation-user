import React, { useState } from "react";
import { Button, Modal, Form } from "antd";
import { FaPlus } from "react-icons/fa";
import LinkModal from "./LinkModal";
import TaskForm from "./TaskForm";
import UploadSection from "./UploadSection";
import TaskSettings from "./TaskSetting";

const ModalAddTask = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [formLink] = Form.useForm();
  const [form] = Form.useForm();
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [isShowModalAddLink, setIsShowModalAddLink] = useState(false);

  const showModalAddLink = () => {
    setIsShowModalAddLink(true);
  };

  const handleAssign = () => {
    const formValue = form.getFieldValue();
    console.log(formValue);
    console.log(fileList);
  };

  const handleAddLink = () => {
    const formValue = formLink.getFieldValue();
    setFileList([...fileList, formValue]);
    setIsShowModalAddLink(false);
    formLink.resetFields(["link"]);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setIsShowModal(false);
  };

  const deleteFile = (index) => {
    setFileList([...fileList.slice(0, index), ...fileList.slice(index + 1)]);
  };

  const onOkDatePicker = (value) => {
    console.log("onOk: ", value);
  };

  const props = {
    fileList,
    listType: "text",
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange: handleChange,
  };

  return (
    <div>
      <Button
        className="w-24 h-12 rounded-full"
        type="primary"
        onClick={() => {
          setIsShowModal(!isShowModal);
        }}
      >
        <FaPlus />
        Create
      </Button>
      <Modal
        centered={true}
        className=""
        width="7s0%"
        onCancel={handleCancel}
        open={isShowModal}
        closeIcon={false}
        footer={() => {
          return (
            <div>
              <Button onClick={handleCancel} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleAssign} type="primary">
                Assign
              </Button>
            </div>
          );
        }}
      >
        <div className=" flex flex-col md:flex-row">
          <div className="md:w-3/4 md:bg-gray-300 py-2 px-0 md:px-5">
            <TaskForm form={form} fileList={fileList} deleteFile={deleteFile} />
            <UploadSection props={props} showModalAddLink={showModalAddLink} />
          </div>
          <div className="md:w-1/4 p-5">
            <TaskSettings formSetting={form} onOkDatePicker={onOkDatePicker} />
          </div>
        </div>
      </Modal>
      <LinkModal
        isShowModalAddLink={isShowModalAddLink}
        handleAddLink={handleAddLink}
        handleCancel={handleCancel}
        form={formLink}
      />
    </div>
  );
};

export default ModalAddTask;
