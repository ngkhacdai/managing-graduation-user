import ProjectDetailComponent from "@/components/project-detail/ProjectDetail";
import React from "react";
export const metadata = {
  title: "Project",
};
const ProjectDetailPage = ({ searchParams }) => {
  return <ProjectDetailComponent searchParams={searchParams} />;
};

export default ProjectDetailPage;
