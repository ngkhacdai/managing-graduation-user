import { updatePoint } from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch } from "@/redux/store";
import { Button, Form, InputNumber } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ModalMark = () => {
  const [message, contextHolder] = useMessage();
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const handleMark = (values) => {
    const form = {
      projectId: searchParams.get("projectId"),
      point: values.point,
    };
    message.success("Mark point successfully");
    dispatch(updatePoint(form));
  };
  return (
    <div>
      {contextHolder}
      <p className="text-lg font-bold pb-2">Grading project</p>
      {showForm ? (
        <div>
          <Form onFinish={handleMark} layout="vertical">
            <Form.Item
              name="point"
              rules={[
                {
                  required: true,
                  message: "Please input point!",
                },
                {
                  type: "number",
                  min: 1,
                  max: 10,
                  message: "Point must be between 0 and 10",
                },
              ]}
              label="Mark"
            >
              <InputNumber
                min={1}
                max={10}
                step={0.1}
                placeholder="Input mark"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <div className="flex gap-2">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Button
          className="!w-full"
          onClick={() => setShowForm(true)}
          type="primary"
        >
          Grading
        </Button>
      )}
    </div>
  );
};

export default ModalMark;
