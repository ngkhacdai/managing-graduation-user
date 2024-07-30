"use client";
import React from "react";
import ModalAddTask from "./ModalAddTask";
import ListClasswork from "./ListClasswork";

const ClassworkScreen = ({ listClasswork }) => {
  return (
    <div>
      <ModalAddTask />
      <ListClasswork listClasswork={listClasswork} />
    </div>
  );
};

export default ClassworkScreen;
