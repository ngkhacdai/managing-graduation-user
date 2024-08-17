import React, { useState } from "react";
import { Button, Input } from "antd";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import useMessage from "antd/es/message/useMessage";
import { createBoard } from "@/redux/slices/ProjectDetailSlice";
import { AppDispatch } from "@/redux/store";
import { useSearchParams } from "next/navigation";
const AddNewBoard = () => {
  const [messageAPI, contextHoler] = useMessage();
  const t = useTranslations("ProjectDetail");
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [isShowFormAddBoard, setIsShowFormAddBoard] = useState(false);
  const cancelAddNewBoard = () => {
    setIsShowFormAddBoard(false);
    setTitle("");
  };
  const searchParams = useSearchParams();
  const newBoard = async () => {
    if (title !== "") {
      const form = {
        phaseId: searchParams.get("phase"),
        nameBoard: title,
      };
      await dispatch(createBoard(form));
      cancelAddNewBoard();
    } else {
      messageAPI.error(t("notFillTitle"));
    }
  };
  return (
    <div>
      {contextHoler}
      <div
        className={`${
          !isShowFormAddBoard ? "hidden" : ""
        } m-2 min-w-72 h-24 p-2 rounded-xl bg-gray-100`}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("boardTitle")}
          className="mb-2"
        />
        <div className="flex justify-between items-center">
          <Button type="primary" onClick={newBoard}>
            {t("btnAddBoard")}
          </Button>
          <Button onClick={cancelAddNewBoard}>{t("cancel")}</Button>
        </div>
      </div>
      <Button
        onClick={() => setIsShowFormAddBoard(true)}
        className={`flex items-center m-2 min-w-72 h-14 justify-start rounded-xl ${
          isShowFormAddBoard ? "hidden" : ""
        }`}
      >
        <FaPlus />
        <p>{t("newBoard")}</p>
      </Button>
    </div>
  );
};

export default AddNewBoard;
