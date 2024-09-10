"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInforProject } from "@/redux/slices/ProjectDetailSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import Link from "next/link";
import StudentInfor from "./StudentInfor";
import TeacherInfor from "./TeacherInfor";
import ProjectInfor from "./ProjectInfor";

const ProjectScreen = ({ project }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  console.log(project);

  useEffect(() => {
    if (project) {
      dispatch(setInforProject(project));
    }
  }, []);
  return (
    <div>
      <p className="py-2 text-xl font-semibold text-zinc-500">Project</p>
      <div>
        {!project ? (
          <div className="flex flex-col gap-4 items-center justify-center bg-white p-6 rounded-lg shadow-md text-center max-w-md mx-auto">
            <p className="text-gray-700 text-lg font-semibold">
              You haven't registered for a project yet, or your registration is
              still pending approval from your mentor.
            </p>
            <p className="text-gray-600 text-sm">
              Please click the button below to register project with a mentor.
            </p>
            <Link href={`/${pathName.split("/")[1]}/project/signup`}>
              <Button type="primary" size="large" className="mt-4 w-full">
                Sign up for a project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 ">
            <div className="w-1/3 flex flex-col gap-2">
              {/* <StudentInfor /> */}
              <TeacherInfor />
            </div>
            <div className="w-2/3">
              <ProjectInfor />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectScreen;
