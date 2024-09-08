import React from "react";
import { headers } from "next/headers";
import TeacherDetail from "./teacher/TeacherDetail";
import StudentDetail from "./student/StudentDetail";

const Detail = async ({ regisId }) => {
  const header = headers();
  const role = header.get("role");
  return (
    <div>
      {role == "teacher" ? (
        <TeacherDetail regisId={regisId} />
      ) : (
        <StudentDetail regisId={regisId} />
      )}
    </div>
  );
};

export default Detail;
