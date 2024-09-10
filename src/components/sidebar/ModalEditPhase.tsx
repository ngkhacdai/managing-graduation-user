import { updatePhase } from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch, RootState } from "@/redux/store";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

const ModalEditPhase = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const phaseDetail = useSelector(
    (state: RootState) => state.projectDetail.detailPhase
  );
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(
      updatePhase({
        phaseName: values.phaseName,
        description: values.description,
      })
    );
    setIsShowModal(false);
  };
  const onOk = () => {
    form.submit();
  };
  return (
    <div>
      <Tooltip title="Edit phase">
        <Button onClick={() => setIsShowModal(true)} type="text">
          <CiEdit size={20} />
        </Button>
      </Tooltip>
      <Modal
        onOk={onOk}
        onCancel={() => setIsShowModal(false)}
        open={isShowModal}
        title="Edit phase"
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            phaseName: phaseDetail?.phaseName,
            description: phaseDetail?.description,
          }}
          layout="vertical"
        >
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
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
            name="description"
            label="Description"
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalEditPhase;
