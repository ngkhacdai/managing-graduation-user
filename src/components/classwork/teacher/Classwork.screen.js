"use client";
import React from "react";
import ModalAddTask from "./ModalAddTask";
import ListClasswork from "./ListClasswork";

const ClassworkScreen = ({ listClasswork }) => {
  return (
    <div className=" mx-auto w-full md:w-2/3">
      <ModalAddTask />
      <ListClasswork listClasswork={listClasswork} />
    </div>
  );
};

export default ClassworkScreen;
