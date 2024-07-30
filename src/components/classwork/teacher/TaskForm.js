import React from "react";
import { Form, Image, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MdDeleteForever } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

const TaskForm = ({ form, fileList, deleteFile }) => (
  <Form
    form={form}
    layout="vertical"
    className="bg-white p-3 border-2 border-inherit rounded-xl"
  >
    <Form.Item
      name="title"
      label="Title"
      rules={[
        {
          required: true,
          message: "Please input the title!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item name="instruction" label="Instructions (optional)">
      <TextArea />
    </Form.Item>
    <div className="my-2">
      {fileList.length > 0 &&
        fileList.map((item, index) => (
          <div
            key={`file-${index}`}
            className="flex justify-between items-center border-2 rounded-lg my-2 "
          >
            <div className="flex items-center">
              <div className="w-28 h-20 flex items-center border-r-2">
                {item?.type?.startsWith("image/") ? (
                  <Image
                    className="min-w-28 max-w-28 max-h-20 rounded-l-lg"
                    src={URL.createObjectURL(item.originFileObj)}
                    alt={item.name}
                  />
                ) : item?.link ? (
                  <div>
                    <img
                      src={`
                      https://api.screenshotone.com/take?access_key=VNLCZ-l26Dk-JA&url=${encodeURIComponent(
                        item.link
                      )}&full_page=false&viewport_width=1920&viewport_height=1080&device_scale_factor=1&format=jpg&image_quality=80&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60`}
                    />
                  </div>
                ) : (
                  <div className="mx-auto">
                    <FaFileAlt className="text-2xl" />
                  </div>
                )}
              </div>
              <p className="pl-2">{item?.name}</p>
              <a
                style={{ display: "table-cell" }}
                href={item.link}
                target="_blank"
              >
                {item.link}
              </a>
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
  </Form>
);

export default TaskForm;
