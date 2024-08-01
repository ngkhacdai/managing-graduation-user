import { Dropdown } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { GoTasklist } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";

const ListTask = ({ listTask }) => {
  const searchParam = useSearchParams();
  const route = useRouter();
  const handleViewDetailTask = (id) => {
    route.push(`/project/detail/classwork/${id}?${searchParam}`);
  };
  return (
    <div className="mt-2 ">
      {listTask.map((item, index) => {
        return (
          <div
            onClick={() => handleViewDetailTask(item.id)}
            className="border-inherit border-2 rounded-lg my-2 p-3 flex justify-between items-center hover:bg-blue-50 cursor-pointer"
            key={item.id}
          >
            <div className="flex items-center">
              <div className="mr-2 w-10 h-10 bg-blue-500 flex justify-center items-center border-2 border-inherit rounded-full">
                <GoTasklist color="white" size={24} />
              </div>
              <div>
                <p className="text-lg font-semibold">{item.taskName}</p>
                <p className="text-gray-400">{item.deadline}</p>
              </div>
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
