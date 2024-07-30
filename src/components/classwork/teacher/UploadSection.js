import React from "react";
import { Button, Upload } from "antd";
import { FaLink, FaUpload } from "react-icons/fa";

const UploadSection = ({ props, showModalAddLink }) => (
  <div className="bg-white p-3 border-2 flex text-center justify-center items-center border-inherit rounded-xl mt-3">
    <div className="flex">
      <Upload {...props}>
        <Button shape="circle">
          <FaUpload />
        </Button>
      </Upload>
      <Button onClick={showModalAddLink} shape="circle" className="mx-2">
        <FaLink />
      </Button>
    </div>
  </div>
);

export default UploadSection;
