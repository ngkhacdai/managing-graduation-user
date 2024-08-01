import { headers } from "next/headers";
import React from "react";
import ClassworkDetailScreen from "./ClassworkDetail.screen";

const ClassworkDetail = ({ searchParams }) => {
  const fakeData = {
    information: {
      title: "Title A",
      teacherName: "Teacher",
      timeCreated: "2024/7/31",
      point: 100,
      due: "2024/7/30",
      instruction: "This is a instruction",
      status: "Turned",
    },
    comment: [
      {
        commentText: "Good job",
        commentTime: "2024/7/31 10:00",
        commentUser: "teacher",
        nameUser: "teacher",
      },
      {
        commentText: "Good job",
        commentTime: "2024/7/31 11:00",
        commentUser: "student",
        nameUser: "student",
      },
    ],
  };
  const header = headers();
  const role = header.get("role");
  return (
    <div>
      {role === "teacher" && <ClassworkDetailScreen taskData={fakeData} />}
    </div>
  );
};

export default ClassworkDetail;
