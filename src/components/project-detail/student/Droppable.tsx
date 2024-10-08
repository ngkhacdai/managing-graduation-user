import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { Button, Form, Input, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addNewTask, deleteBoard } from "@/redux/slices/ProjectDetailSlice";
import { useTranslations } from "next-intl";
import { AppDispatch } from "@/redux/store";
import useMessage from "antd/es/message/useMessage";
import { useIsPhaseFinished } from "@/utils/checkPhaseFinished";

const Droppable = ({ items }) => {
  const [messageAPI, contextHoler] = useMessage();

  const t = useTranslations("ProjectDetail");
  const dispatch = useDispatch<AppDispatch>();
  const [showNewCard, setShowNewCard] = useState(false);
  const [title, setTitle] = useState("");
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: items.id });

  const cancelAddNewCard = () => {
    setShowNewCard(false);
    setTitle("");
  };

  const addNewCard = () => {
    if (title !== "") {
      dispatch(
        addNewTask({
          boardId: items.id.split("container-")[1],
          taskName: title,
        })
      );
      cancelAddNewCard();
    } else {
      messageAPI.error(t("notFillTitle"));
    }
  };

  const handleDeleteBoard = () => {
    setIsShowModalDelete(true);
  };

  const handleCancelDelete = () => {
    setIsShowModalDelete(false);
  };

  const onDeleteBoard = () => {
    dispatch(deleteBoard({ boardId: items.id }));
  };

  return (
    <div
      className="flex flex-col w-72 min-h-28 p-2 bg-gray-100 m-2 rounded-xl"
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      {contextHoler}
      <div className="flex justify-between mx-1 items-center">
        <p className="">{items.title}</p>
        {!useIsPhaseFinished() && (
          <div className="flex">
            <Button type="text" className="py-0 px-2" {...listeners}>
              <MdOutlineDragIndicator />
            </Button>
            {/* <Button onClick={handleDeleteBoard} type="text">
              <IoMdClose />
            </Button> */}
          </div>
        )}
      </div>
      <SortableContext
        items={items.task.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.task.map((item) => (
          <div key={`task-${item.id}`}>
            <Sortable containerId={items.id} item={item} />
          </div>
        ))}
      </SortableContext>
      <div className={`${showNewCard ? "block" : "hidden"}`}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("cardTitle")}
          className="mb-2"
        />
        <div className="flex justify-between items-center">
          <Button type="primary" onClick={addNewCard}>
            {t("btnAddCard")}
          </Button>
          <Button onClick={cancelAddNewCard}>{t("cancel")}</Button>
        </div>
      </div>
      {!useIsPhaseFinished() && (
        <Button
          type="text"
          onClick={() => {
            setShowNewCard(true);
          }}
          className={`flex items-center m-2 ${
            !showNewCard ? "block" : "hidden"
          }`}
        >
          <FaPlus />
          {t("newCard")}
        </Button>
      )}
      <Modal
        title={`${t("titleDeleteBoard")}: ${items.title}`}
        onCancel={handleCancelDelete}
        open={isShowModalDelete}
        onOk={onDeleteBoard}
        okText={"OK"}
        cancelText={t("cancel")}
      >
        <p className="text-lg font-semibold text-red-500">{t("deleteBoard")}</p>
      </Modal>
    </div>
  );
};

export default Droppable;
