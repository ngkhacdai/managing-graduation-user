"use client";
import { finishingPhase, removePhase } from "@/redux/slices/ProjectDetailSlice";
import { Button, Dropdown, Form, Modal, Tooltip, Upload } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";
import { useTranslations } from "next-intl";
import { useIsPhaseFinished } from "@/utils/checkPhaseFinished";
import DrawerComment from "./DrawerComment";
import DrawerDetailPhase from "./DrawerDetailPhase";
import useMessage from "antd/es/message/useMessage";
import { UploadOutlined } from "@ant-design/icons";

const Navigation = ({ role }) => {
  const [message, contextHolder] = useMessage();
  const t = useTranslations("ProjectDetail");
  const searchParams = useSearchParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const error = useSelector((state) => state.projectDetail.error);
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();

  const onCancel = () => {
    setTitle("");
    setIsShowModal(false);
    setIsShowModalDelete(false);
  };
  const dispatch = useDispatch();
  const onOk = () => {
    switch (title) {
      case "Delete": {
        dispatch(removePhase());
        if (error) {
          message.error(error);
        }
        setTimeout(() => {
          onCancel();
        }, 500);
        return;
      }
      case "Finish": {
        form.submit();
        return;
      }
      default:
    }
  };
  const onFinishPhase = () => {
    const value = form.getFieldsValue();
    console.log(value);
    const formData = new FormData();
    formData.append("filePdf", value.filePdf.fileList[0].originFileObj);
    dispatch(finishingPhase(formData));
    setTimeout(() => {
      form.resetFields();
      onCancel();
    }, 500);
  };
  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            setTitle("Finish");
            setIsShowModal(true);
          }}
        >
          {t("finish")}
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={() => {
            setTitle("Delete");
            setIsShowModalDelete(true);
          }}
        >
          {t("delete")}
        </p>
      ),
    },
    // {
    //   key: "3",
    //   label: <p>{t("turnIn")}</p>,
    // },
  ];
  return (
    <>
      <div className="md:px-7 flex items-center justify-between bg-blue-700">
        {contextHolder}
        <Tooltip
          overlayInnerStyle={{ width: "100%" }}
          title={searchParams.get("projectName")}
        >
          <p className="py-2 font-bold text-white max-w-[32rem] truncate text-lg">
            {t("project")}: {searchParams.get("projectName")}
          </p>
        </Tooltip>
        <div className="flex items-center gap-5">
          <DrawerDetailPhase role={role} />
          <DrawerComment role={role} />
          {!useIsPhaseFinished() && role == "student" && (
            <div className="flex items-center">
              <Dropdown menu={{ items }}>
                <div className="hover:cursor-pointer">
                  <SlOptionsVertical size={18} color="white" />
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
      <Modal
        onCancel={onCancel}
        onOk={onOk}
        open={isShowModalDelete}
        title={t("delete")}
      >
        <p>{t("warn")}</p>
      </Modal>
      <Modal
        onCancel={onCancel}
        onOk={onOk}
        open={isShowModal}
        title={t("finish")}
      >
        <Form form={form} onFinish={onFinishPhase} layout="vertical">
          <Form.Item label="Upload reference" name="filePdf">
            <Upload
              beforeUpload={false}
              accept="application/pdf"
              listType="picture"
              maxCount={1}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navigation;
