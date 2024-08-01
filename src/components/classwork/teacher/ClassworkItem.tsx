import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { GoTasklist } from "react-icons/go";

interface ClassworkItemProps {
  classworkItem: {
    id: number;
    title: string;
    dueDate: string;
    postTime: string;
    instruction: string;
    status: string;
  };
}

const ClassworkItem: React.FC<ClassworkItemProps> = ({ classworkItem }) => {
  const [classworkDetail, setClassworkDetail] = useState(false);
  const seachParam = useSearchParams();
  const route = useRouter();
  const viewDetailClasswork = () => {
    route.push(`/project/detail/classwork/${classworkItem.id}?${seachParam}`);
  };
  return (
    <div
      className={`mt-2 rounded-lg border-b hover:outline-1 hover:outline hover:shadow-lg ${
        classworkDetail && "outline-1 outline shadow-xl"
      } `}
    >
      <div
        className={`${
          classworkDetail && "border-b"
        } hover:bg-gray-50 flex justify-between items-center py-2 px-4 cursor-pointer`}
        onClick={() => {
          setClassworkDetail(!classworkDetail);
        }}
      >
        <div className="flex items-center">
          <div className="mr-2 w-10 h-10 bg-blue-500 flex justify-center items-center border-2 border-inherit rounded-full">
            <GoTasklist color="white" size={24} />
          </div>
          <p className="font-bold">{classworkItem.title}</p>
        </div>
        <p className="text-gray-500">{classworkItem.dueDate}</p>
      </div>
      <div className={`${classworkDetail ? "block" : "hidden"}`}>
        <div className={`px-4 py-2 border-b-[1px] `}>
          <p>Posted at {classworkItem.postTime}</p>
          <p className="py-2">{classworkItem.instruction}</p>
          <p className="py-2 text-right">{classworkItem.status}</p>
        </div>
        <div className="px-4 py-2">
          <Button
            onClick={viewDetailClasswork}
            type="text"
            className="text-blue-500"
          >
            View instructions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassworkItem;
