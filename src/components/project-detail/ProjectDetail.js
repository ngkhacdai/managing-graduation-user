import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TeacherProjectDetailScreen from "./teacher/TeacherProjectDetail.screen";

const ProjectDetailComponent = ({ searchParams }) => {
  const headList = headers();
  const role = headList.get("role");
  const fakeData = {
    projectName: "project-0",
    task: Array.from({ length: 10 }, (_, index) => ({
      id: index,
      taskName: `task-${index}`,
      deadline: "2022-01-01 23:59",
    })),
    taskNotFinish: Array.from({ length: 3 }, (_, index) => ({
      id: index,
      taskName: `task-${index}`,
      deadline: "2022-01-01 23:59",
    })),
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
