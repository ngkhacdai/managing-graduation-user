import ClassworkDetail from "@/components/classwork_detail/ClassworkDetail";
import React from "react";

const ClassworkDetailPage = ({ params }) => {
  return (
    <div>
      <ClassworkDetail searchParams={params} />
    </div>
  );
};

export default ClassworkDetailPage;
