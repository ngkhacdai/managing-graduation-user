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
  return (
    <div className="min-h-screen bg-blue-500">
      <Navigation role={role} />
      {role === "teacher" ? (
        <div className=" w-full">
          <DetailProject />
        </div>
      ) : (
        <div className=" w-full">
          <DetailStudent />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailComponent;
