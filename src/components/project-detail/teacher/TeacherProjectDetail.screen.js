"use client";
import React from "react";
import CommentScreen from "./Comment.screen";

const TeacherProjectDetailScreen = ({ data }) => {
  return (
    <div>
      <p className="text-2xl font-bold">{data.projectName}</p>
      <CommentScreen />
    </div>
  );
};

export default TeacherProjectDetailScreen;
