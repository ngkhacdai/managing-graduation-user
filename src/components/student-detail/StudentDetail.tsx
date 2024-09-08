import { getStudentProfileByProjectId } from "@/api/Student";
import React from "react";
import StudentDetailScreen from "./StudentDetail.screen";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const StudentDetail = async ({ projectId }) => {
  const header = headers();
  const role = header.get("role");
  if (role !== "teacher") {
    return redirect("/project");
  }
  const detail = await getStudentProfileByProjectId(projectId);

  return (
    <div>
      <StudentDetailScreen detail={detail} />
    </div>
  );
};

export default StudentDetail;
