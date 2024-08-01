"use client";
import React from "react";
import InformationClasswork from "./InformationClasswork";
import CommentClasswork from "./CommentClasswork";
import { GoTasklist } from "react-icons/go";
import CommentForm from "./CommentForm";
import Homework from "./teacher/Homework";

interface ClassworkDetailScreen {
  taskData: {
    information: {
      title: string;
      teacherName: string;
      timeCreated: string;
      point: number;
      due: string;
      instruction: string;
      status: string;
    };
    comment: [
      {
        commentText: string;
        commentTime: string;
        commentUser: string;
        nameUser: string;
      }
    ];
  };
}
const ClassworkDetailScreen = ({ taskData }) => {
  return (
    <div className="mx-auto flex justify-between">
      <div className="w-7/12 flex">
        <div className="mr-2 w-10 h-10 bg-blue-500 flex justify-center items-center border-2 border-inherit rounded-full">
          <GoTasklist color="white" size={24} />
        </div>
        <div className="w-11/12 pl-2">
          <InformationClasswork taskInformation={taskData.information} />
          <CommentClasswork commentTask={taskData.comment} />
          <CommentForm />
        </div>
      </div>
      <div className="w-4/12">
        <Homework fileList={[]} status={"Viewed"} />
      </div>
    </div>
  );
};

export default ClassworkDetailScreen;
