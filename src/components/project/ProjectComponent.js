import { headers } from "next/headers";
import React from "react";
import TeacherComponent from "./teacher/Teacher";
import StudentComponent from "./student/Student";

const ProjectComponent = () => {
  const headersList = headers();
  const role = headersList.get("role");
  return (
    <div>
      {role === "teacher" ? <TeacherComponent /> : <StudentComponent />}
    </div>
  );
};

export default ProjectComponent;
