import Detail from "@/components/registration-detail/Detail";
import React from "react";
export const metadata = {
  title: "Detail registration",
};
const page = ({ params }) => {
  return (
    <div>
      <Detail regisId={params.regisId} />
    </div>
  );
};

export default page;
