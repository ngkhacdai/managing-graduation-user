import { getDetailRegis } from "@/api/Teacher";
import React from "react";
import DetailScreen from "./Detail.screen";

const TeacherDetail = async ({ regisId }) => {
  const detail = await getDetailRegis(regisId);

  return (
    <div>
      <DetailScreen detail={detail} />
    </div>
  );
};

export default TeacherDetail;
