import { getPublicProjectByProjectId } from "@/api/Public";
import React from "react";
import DetailScreen from "./Detail.screen";

const DetailComponst = async ({ projectId }) => {
  const response = await getPublicProjectByProjectId(projectId);
  return (
    <div>
      <DetailScreen data={response} />
    </div>
  );
};

export default DetailComponst;
