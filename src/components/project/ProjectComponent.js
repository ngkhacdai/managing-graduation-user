import { headers } from "next/headers";
import React from "react";
import StudentComponent from "./student/Student";
import TeacherComponent from "./teacher/Teacher";
const ProjectComponent = async () => {
  const headersList = headers();
  const role = headersList.get("role");

  if (role === "student") {
    return <StudentComponent />;
  } else if (role === "teacher") {
    return <TeacherComponent />;
  }
};

export default ProjectComponent;
