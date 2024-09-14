import {
  addNewPhase,
  addPhaseThunk,
  setNullError,
} from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { DatePicker, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalAddNewPhase = ({ setIsShow }) => {
  const t = useTranslations("SideBar");
  const [messageAPI, contextHolder] = useMessage();
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.projectDetail.error);
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    setIsShowModal(true);
  }, []);

  const onCancel = () => {
    setIsShowModal(false);
    setTimeout(() => {
      setIsShow(false);
    }, 300);
  };
  const handleOk = () => {
    form.submit();
  };

  const onSubmit = async () => {
    const value = form.getFieldsValue();
    const formData = {
      phaseName: value.phaseName,
      description: value.description,
      expectedEnd: value.expectedEnd.format("YYYY-MM-DD"),
    };

    await dispatch(addPhaseThunk(formData));
    if (error) {
      messageAPI.error(error);
    }
    setTimeout(() => {
      dispatch(setNullError());
      onCancel();
    }, 1000);
  };
  const disabledDate = (current) => {
    // Disable all dates before today
    return current && current < moment().startOf("day");
  };
  return (
    <>
      {contextHolder}
      <Modal
        onOk={handleOk}
        title={t("newPhase")}
        onCancel={onCancel}
        open={isShowModal}
      >
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="phaseName"
            rules={[
              {
                required: true,
                message: "Please input phase name!",
              },
            ]}
            label="Phase name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="expectedEnd"
            rules={[
              {
                required: true,
                message: "Please input expected end!",
              },
            ]}
            label="Expected end"
          >
            <DatePicker className="!w-full" disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
            label="Description"
          >
            <TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddNewPhase;
