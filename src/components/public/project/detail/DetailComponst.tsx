import { getPublicProjectByProjectId } from "@/api/Public";
import React from "react";
import DetailScreen from "./Detail.screen";
import { headers } from "next/headers";

const DetailComponst = async ({ projectId }) => {
  const response = await getPublicProjectByProjectId(projectId);
  const header = headers();
  const role = header.get("role");
  return (
    <div>
      <DetailScreen data={response} role={role} />
    </div>
  );
};

export default DetailComponst;
