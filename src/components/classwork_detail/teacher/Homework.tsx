import { Button, Image, Upload } from "antd";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface Homework {
  fileList: [
    {
      link: string;
    }
  ];
  status: string;
}

const Homework = ({ fileList, status }) => {
  return (
    <div className="p-5 w-full border-2 border-inherit shadow-lg rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Exercise</p>
        <p className="font-semibold text-lg">{status}</p>
      </div>
      <div className="my-2">
        {fileList.length > 0 &&
          fileList.map((item: any, index: number) => (
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
                <p className="pl-2 line-clamp-1 max-w-32">{item?.name}</p>
                <a
                  style={{ display: "table-cell" }}
                  href={item.link}
                  target="_blank"
                >
                  <p className="line-clamp-1">{item.link}</p>
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full">
        <Button
          type="primary"
          className="w-full"
          disabled={status !== "Turned in" ? true : false}
        >
          Grade
        </Button>
      </div>
    </div>
  );
};

export default Homework;
