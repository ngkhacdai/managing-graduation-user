import React, { useState } from "react";
import { Button, Input } from "antd";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addNewBoard } from "@/redux/slices/ProjectDetailSlice";
const AddNewBoard = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isShowFormAddBoard, setIsShowFormAddBoard] = useState(false);
  const cancelAddNewBoard = () => {
    setIsShowFormAddBoard(false);
    setTitle("");
  };
  return (
    <div>
      <div
        className={`${
          !isShowFormAddBoard ? "hidden" : ""
        } m-2 min-w-72 h-24 p-2 rounded-xl bg-gray-100`}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board title"
          className="mb-2"
        />
        <div className="flex justify-between items-center">
          <Button
            type="primary"
            onClick={() => {
              dispatch(addNewBoard({ title }));
              cancelAddNewBoard();
            }}
          >
            New board
          </Button>
          <Button onClick={cancelAddNewBoard}>Cancel</Button>
        </div>
      </div>
      <Button
        onClick={() => setIsShowFormAddBoard(true)}
        className={`flex items-center m-2 min-w-72 h-14 justify-start rounded-xl ${
          isShowFormAddBoard ? "hidden" : ""
        }`}
      >
        <FaPlus />
        <p>Add new board</p>
      </Button>
    </div>
  );
};

export default AddNewBoard;
