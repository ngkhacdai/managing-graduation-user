"use client";
import React from "react";
import LoadingFile from "./LoadingFile";
import ProjectInformation from "./ProjectInformation";
import StudentInformation from "./StudentInformation";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { usePathname } from "next/navigation";

const StudentDetailScreen = ({ detail }) => {
  const pathName = usePathname();
  console.log(detail);

  return (
    <div>
      <div className="p-2">
        <Link href={`/${pathName.split("/")[1]}/project`}>
          <IoMdArrowBack size={24} />
        </Link>
        {detail && (
          <div className="flex lg:w-2/3 md:w-11/12 w-full mx-auto items-center gap-2 flex-col">
            <StudentInformation detail={detail} />
            <ProjectInformation detail={detail} />
            {detail.filePdf && (
              <div className="w-full rounded-t-lg border-2">
                <p className="text-xl text-center p-2  font-bold">
                  File detail
                </p>
                <LoadingFile url={detail.filePdf} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailScreen;
