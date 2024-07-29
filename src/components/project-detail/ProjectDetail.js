import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TeacherProjectDetailScreen from "./teacher/TeacherProjectDetail.screen";

const ProjectDetailComponent = ({ searchParams }) => {
  const headList = headers();
  const role = headList.get("role");
  const fakeData = {
    projectName: "project-0",
  };
  if (
    !searchParams.studentName ||
    !searchParams.teacherName ||
    !searchParams.projectName ||
    !searchParams.projectId
  ) {
    return redirect("/project");
  }
  return <TeacherProjectDetailScreen data={fakeData} />;
};

export default ProjectDetailComponent;
