import StudentDetail from "@/components/student-detail/StudentDetail";
import React from "react";
export const metadata = {
  title: "Student Detail",
};
const page = ({ params }) => {
  return (
    <div>
      <StudentDetail projectId={params.projectId} />
    </div>
  );
};

export default page;
