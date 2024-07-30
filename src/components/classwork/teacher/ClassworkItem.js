import React from "react";
import { GoTasklist } from "react-icons/go";

const ClassworkItem = ({ classwork }) => {
  return (
    <div>
      <div className="w-10 h-10 border-2 border-inherit rounded-full">
        <GoTasklist />
      </div>
      <p>{classwork.title}</p>
    </div>
  );
};

export default ClassworkItem;
