import React from "react";
import TeacherScreen from "./Teacher.screen";
import { headers } from "next/headers";

const TeacherComponent = () => {
  const fakeProjectData = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    projectName: `project-${index}`,
    studentName: `student-${index}`,
    status: `Processing`,
  }));

  return (
    <div>
      <TeacherScreen projectData={fakeProjectData} />
    </div>
  );
};

export default TeacherComponent;
