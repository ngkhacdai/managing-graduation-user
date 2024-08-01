import React from "react";
import ClassworkScreen from "./Classwork.screen";

const ClassworkComponent = () => {
  const fakeStatus = () =>
    ["Sent", "Viewed", "Turned"][Math.floor(Math.random() * 3)];
  const fakeListClasswork = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    title: `title ${index}`,
    dueDate: `deadline ${index}`,
    postTime: `postTime ${index}`,
    instruction: `instruction ${index}`,
    status: fakeStatus(),
  }));
  return (
    <div>
      <ClassworkScreen listClasswork={fakeListClasswork} />
    </div>
  );
};

export default ClassworkComponent;
