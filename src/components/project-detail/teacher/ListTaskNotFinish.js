import React from "react";

const ListTaskNotFinish = ({ task = {} }) => {
  return (
    <div className="border-inherit border-2 w-full p-4 mt-2 rounded-lg">
      <p className="mb-3">Upcoming</p>
      {task.length === 0 ? (
        <p>No task</p>
      ) : (
        task.map((item, index) => {
          return (
            <div key={`task-${index}`}>
              <p>{item.deadline}</p>
              <p>{item.taskName}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListTaskNotFinish;
