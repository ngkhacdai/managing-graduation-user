import React from "react";

const InformationClasswork = ({ taskInformation }) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="border-b-inherit border-b-2 py-2">
          <div className="flex justify-between ">
            <div className="w-full">
              <p className="font-semibold text-lg text-neutral-800">
                {taskInformation.title}
              </p>
              <div className="flex py-2 text-zinc-500 font-semibold">
                <p>{taskInformation.teacherName} </p>
                <p className="mx-2">*</p>
                <p>{taskInformation.timeCreated}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-zinc-600">
                  {taskInformation.point} points
                </p>
                <p className="font-semibold text-zinc-600">
                  Due {taskInformation.due}
                </p>
              </div>
            </div>
          </div>
          <p className="text-right pt-2 font-semibold text-zinc-600">
            {taskInformation.status}
          </p>
        </div>
        <p className="py-2 border-b-inherit border-b-2 ">
          {taskInformation.instruction}
        </p>
      </div>
    </div>
  );
};

export default InformationClasswork;
