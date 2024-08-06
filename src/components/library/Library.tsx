import React from "react";
import LibraryScreen from "./Library.screen";

const Library = () => {
  const fakeProjectData = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    projectName: `project-${index}`,
    studentName: `student-${index}`,
    teacherName: `teacher`,
    status: `Finished`,
  }));
  return (
    <div className="p-2">
      <LibraryScreen projectData={fakeProjectData} />
    </div>
  );
};

export default Library;
