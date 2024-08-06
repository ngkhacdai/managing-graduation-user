import { headers } from "next/headers";
import Navigation from "./Navigation";
import dynamic from "next/dynamic";
import DetailProject from "./teacherv2/DetailStudent";
const DetailStudent = dynamic(() => import("./student/DetailStudent"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
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
      <Navigation role={role} />
      {role === "teacher" ? (
        <div className="bg-blue-500 h-[39.2rem] w-full">
          <DetailProject data={fakeData} />
        </div>
      ) : (
        <div className="bg-blue-500 h-[39.2rem] w-full">
          <DetailStudent />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailComponent;
