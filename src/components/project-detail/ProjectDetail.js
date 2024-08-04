import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TeacherProjectDetailScreen from "./teacher/TeacherProjectDetail.screen";
import DetailStudent from "./student/DetailStudent";

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
  return (
    <div>
      {role === "teacher" ? (
        <TeacherProjectDetailScreen data={fakeData} />
      ) : (
        <DetailStudent />
      )}
    </div>
  );
};

export default ProjectDetailComponent;
