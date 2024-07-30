import { Dropdown } from "antd";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

const ListTask = ({ listTask }) => {
  return (
    <div className="mt-2 ">
      {listTask.map((item, index) => {
        return (
          <div
            className="border-inherit border-2 rounded-lg my-2 p-3 flex justify-between items-center hover:bg-blue-50 cursor-pointer"
            key={item.id}
          >
            <div>
              <p className="text-lg font-semibold">{item.taskName}</p>
              <p className="text-gray-400">{item.deadline}</p>
            </div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: <p>Edit</p>,
                  },
                ],
              }}
            >
              <div className="mr-5 cursor-pointer">
                <SlOptionsVertical />
              </div>
            </Dropdown>
          </div>
        );
      })}
    </div>
  );
};

export default ListTask;
