import SignUp from "@/components/signup_project/SignUp";
import React from "react";
import ProjectScreen from "./Project.screen";
import { getProjectDetail } from "@/api/Project";
import { redirect } from "next/navigation";
const StudentComponent = async () => {
  let project = await getProjectDetail();

  if (!project) {
    return redirect("/project/signup");
  } else {
    return <ProjectScreen project={project} />;
  }
};

export default StudentComponent;
