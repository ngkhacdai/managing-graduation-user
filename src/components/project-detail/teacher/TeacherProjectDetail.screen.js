"use client";
import React from "react";
import Comment from "./Comment";
import ListTask from "./ListTask";
import ListTaskNotFinish from "./ListTaskNotFinish";

const TeacherProjectDetailScreen = ({ data }) => {
  return (
    <div>
      <p className="text-2xl font-bold">{data.projectName}</p>
      <div className="flex justify-between">
        <div className="w-3/12">
          <ListTaskNotFinish task={data.taskNotFinish} />
        </div>
        <div className="w-8/12 min-h-14 mx-auto">
          <Comment />
          <ListTask listTask={data.task} />
        </div>
      </div>
    </div>
  );
};

export default TeacherProjectDetailScreen;
