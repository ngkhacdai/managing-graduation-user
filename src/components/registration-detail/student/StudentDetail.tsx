import { getDetailRegis } from "@/api/Student";
import React from "react";
import DetailScreen from "./Detail.screen";

const StudentDetail = async ({ regisId }) => {
  const detail = await getDetailRegis(regisId);
  return (
    <div>
      <DetailScreen detail={detail} />
    </div>
  );
};

export default StudentDetail;
