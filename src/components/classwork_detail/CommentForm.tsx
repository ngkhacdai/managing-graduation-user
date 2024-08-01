import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { IoMdSend } from "react-icons/io";

const CommentForm = () => {
  return (
    <div className="mt-4">
      <Form className="flex w-full">
        <Form.Item name="comment" className="w-full">
          <TextArea
            autoSize
            placeholder="Add comment..."
            className="min-h-11 rounded-2xl focus:pl-4"
          />
        </Form.Item>
        <Form.Item>
          <Button type="text">
            <IoMdSend color="#B5B6B7" size={22} />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentForm;
