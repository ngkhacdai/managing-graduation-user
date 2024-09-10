import { RootState } from "@/redux/store";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";

const ModalEditPhase = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const phaseDetail = useSelector(
    (state: RootState) => state.projectDetail.detailPhase
  );
  return (
    <div>
      <Tooltip title="Edit phase">
        <Button onClick={() => setIsShowModal(true)} type="text">
          <CiEdit size={20} />
        </Button>
      </Tooltip>
      <Modal
        onCancel={() => setIsShowModal(false)}
        open={isShowModal}
        title="Edit phase"
      >
        <Form
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
