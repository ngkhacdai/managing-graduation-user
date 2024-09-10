import { getComment } from "@/api/Comment";
import { createCommentThunk, fetchComments } from "@/redux/slices/CommentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, Drawer, Form, Tooltip } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const DrawerComment = () => {
  const [isShow, setIsShow] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const dataComment = useSelector(
    (state: RootState) => state.comment.commentData
  );
  console.log(dataComment);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchComments(searchParams.get("projectId")));
  }, []);
  const sendComment = () => {
    form.submit();
  };
  const finishForm = (value) => {
    if (value.comment) {
      const formComment = {
        projectId: Number(searchParams.get("projectId")),
        content: value.comment,
      };
      dispatch(createCommentThunk(formComment));
      form.resetFields();
    }
  };
  return (
    <div>
      <Tooltip title="Comment">
        <FaRegCommentDots
          onClick={() => setIsShow(true)}
          className="cursor-pointer"
          size={18}
          color="white"
        />
      </Tooltip>
      <Drawer
        open={isShow}
        onClose={() => setIsShow(false)}
        title="Comment"
        bodyStyle={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <>
          <div className="flex-grow overflow-auto p-4">
            {dataComment &&
              dataComment.map((item, index) => {
                return (
                  <div className="border-b-2 p-2" key={`comment-${index}`}>
                    <div className="flex items-center gap-5 mb-2">
                      {item.authorRole == "STUDENT" ? (
                        <PiStudent
                          className="p-1 border-2 rounded-full"
                          size={28}
                        />
                      ) : (
                        <FaChalkboardTeacher
                          className="p-1 border-2 rounded-full"
                          size={28}
                        />
                      )}
                    </div>
                    <p className="text-zinc-400 text-right my-1">
                      {moment(item.createdAt).format("DD-MM-YYYY, hh:mm")}
                    </p>
                    <p className="break-words">{item.content}</p>
                  </div>
                );
              })}
          </div>

          <div className="flex  gap-2 p-2 border-t">
            <Form form={form} onFinish={finishForm} className="w-full">
              <FormItem name="comment">
                <TextArea
                  rows={1}
                  className="!resize-none	w-full"
                  placeholder="Add a comment..."
                />
              </FormItem>
            </Form>
            <Button onClick={sendComment} type="primary">
              <IoMdSend />
            </Button>
          </div>
        </>
      </Drawer>
    </div>
  );
};

export default DrawerComment;
