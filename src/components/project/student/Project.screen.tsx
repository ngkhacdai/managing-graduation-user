"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInforProject } from "@/redux/slices/ProjectDetailSlice";
import { usePathname, useRouter } from "next/navigation";

const ProjectScreen = ({ project }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    dispatch(setInforProject(project));
    const params = new URLSearchParams();
    params.set("studentName", project.studentName);
    params.set("teacherName", project.mentor);
    params.set("projectName", project.projectName);
    router.push(
      `/${pathName
        .split("/")[1]
        .toString()}/project/detail?${params.toString()}`
    );
  }, []);
  return <div className="p-2"></div>;
};

export default ProjectScreen;
