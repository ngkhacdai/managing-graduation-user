import { Button, Drawer, Form, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { PiStudent } from "react-icons/pi";

const DrawerComment = () => {
  const [isShow, setIsShow] = useState(false);
  const [dataComment, setDataComment] = useState(null);

  useEffect(() => {
    if (!dataComment) {
      setDataComment([{ data: "f" }]);
    }
  }, []);

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
        {dataComment && (
          <>
            <div className="flex-grow overflow-auto p-4">
              <div className="flex items-center gap-5 mb-2">
                <PiStudent className="p-1 border-2 rounded-full" size={28} />
                <p>studentName</p>
              </div>
              <p className="text-zinc-400 text-right my-1">date</p>
              <p>Comment</p>
            </div>
            <div className="flex items-center gap-2 p-4 border-t">
              <TextArea
                rows={1}
                className="!resize-none	max-h-28"
                placeholder="Add a comment..."
              />
              <Button type="primary">
                <IoMdSend />
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default DrawerComment;
