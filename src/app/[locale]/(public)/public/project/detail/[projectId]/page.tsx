import DetailComponst from "@/components/public/project/detail/DetailComponst";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <DetailComponst projectId={params.projectId} />
    </div>
  );
};

export default page;
