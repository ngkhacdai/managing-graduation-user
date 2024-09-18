"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import StudentInformation from "./StudentInformation";
import ProjectInformation from "./ProjectInformation";
import LoadingFile from "./LoadingFile";
import ModalReject from "@/components/registration/teacher/ModalReject";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { appoveStudentByTeacher } from "@/redux/slices/RegistrationSlice";
import useMessage from "antd/es/message/useMessage";

const DetailScreen = ({ detail }) => {
  const params = useParams<{ regisId: string }>();
  const pathName = usePathname();
  const [message, contentHolder] = useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const [click, setClick] = useState(false);

  const approveStudent = async () => {
    const result = await dispatch(appoveStudentByTeacher(params.regisId));
    if (appoveStudentByTeacher.rejected.match(result)) {
      return message.error(result.error.message || "Approve failed");
    }
    setClick(true);
    message.success("Approve student successfully");
  };
  return (
    <div className="p-2">
      {contentHolder}
      <div className="w-10 h-10">
        <Link href={`/${pathName.split("/")[1]}/registration`}>
          <IoMdArrowBack size={24} />
        </Link>
      </div>

      {detail && (
        <>
          {detail.approvalStatus == "pending" && !click && (
            <div className="flex items-center gap-2 justify-end">
              <ModalReject
                click={(value) => setClick(value)}
                regisId={params.regisId}
              />
              <Button
                onClick={approveStudent}
                className="!bg-green-500 text-white hover:!bg-green-400"
                type="primary"
              >
                Approve
              </Button>
            </div>
          )}
          <div className="flex lg:w-2/3 w-full mx-auto items-center gap-2 flex-col">
            <StudentInformation detail={detail.studentProfileView} />
            <ProjectInformation detail={detail} />
            <div className="w-full h-full text-center border-2 rounded-t-lg">
              <p className="text-xl font-bold py-2">File detail</p>
              <LoadingFile url={detail.attachmentFile} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailScreen;
