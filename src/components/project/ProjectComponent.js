import { headers } from "next/headers";
import React from "react";
import SignUp from "../signup_project/SignUp";
import { getProjectDetail } from "@/api/Project";
import { redirect } from "next/navigation";
import TeacherComponent from "./teacher/Teacher";
const ProjectComponent = async () => {
  const headersList = headers();
  const role = headersList.get("role");
  let project;
  if (role == "student") {
    project = await getProjectDetail();
  }

  if (!project && role === "student") {
    return <SignUp />;
  } else if (role === "teacher") {
    return <TeacherComponent />;
  } else {
    const params = new URLSearchParams();
    params.set("studentName", project.studentName);
    params.set("teacherName", project.mentor);
    params.set("projectName", project.projectName);
    return redirect(`/project/detail?${params.toString()}`);
  }
};

export default ProjectComponent;
