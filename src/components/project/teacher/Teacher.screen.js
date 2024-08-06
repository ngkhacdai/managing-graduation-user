import React from "react";
import TeacherContent from "./TeacherContent";

const TeacherScreen = ({ projectData }) => {
  return (
    <>
      <div className="min-h-screen p-2">
        <TeacherContent projectData={projectData} />
      </div>
    </>
  );
};

export default TeacherScreen;
