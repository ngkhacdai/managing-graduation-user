import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

interface CommentClasswork {
  commentTask: [
    {
      commentText: string;
      commentTime: string;
      commentUser: string;
      nameUser: string;
    }
  ];
}

const CommentClasswork = ({ commentTask }) => {
  return (
    <div>
      <div className="flex items-center mt-4">
        <MdOutlinePeopleAlt color="#5F6368" size={24} />
        <p className="px-2 text-gray-600 font-semibold">
          {commentTask.length} class comment
        </p>
      </div>
      <div className="mt-2">
        {commentTask.length > 0 &&
          commentTask.map(
            (
              item: {
                commentUser: string;
                commentTime: string;
                commentText: string;
                nameUser: string;
              },
              index: number
            ) => {
              return (
                <div
                  className="my-2 flex items-center"
                  key={`comment-${index}`}
                >
                  {item.commentUser === "teacher" ? (
                    <div>
                      <div className="rounded-full border-2 w-10 h-10 flex items-center justify-center bg-purple-500">
                        <FaChalkboardTeacher color="white" size={24} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="rounded-full border-2 w-10 h-10 flex items-center justify-center bg-blue-500">
                        <PiStudent color="white" size={24} />
                      </div>
                    </div>
                  )}
                  <div className=" pl-2">
                    <div className="flex">
                      <p className="mr-2 text-zinc-600 font-semibold">
                        {item.nameUser}
                      </p>
                      <p className="text-zinc-500 font-semibold">
                        {item.commentTime}
                      </p>
                    </div>
                    <p>{item.commentText}</p>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default CommentClasswork;
