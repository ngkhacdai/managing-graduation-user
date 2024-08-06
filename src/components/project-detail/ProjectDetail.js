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
      <Navigation />
      {role === "teacher" ? (
        <DetailProject data={fakeData} />
      ) : (
        <div className="bg-blue-500 h-[38.7rem] w-full">
          <DetailStudent />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailComponent;
