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
import { addItemInList, deleteBoard } from "@/redux/slices/ProjectDetailSlice";
import { isPhaseFinished } from "@/utils/checkPhaseFinished";

const Droppable = ({ items }) => {
  const dispatch = useDispatch();
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
    dispatch(addItemInList({ items: items.id, title }));
    cancelAddNewCard();
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
      <div className="flex justify-between mx-1 items-center">
        <p className="">{items.title}</p>
        {!isPhaseFinished() && (
          <div className="flex">
            <Button type="text" className="py-0 px-2" {...listeners}>
              <MdOutlineDragIndicator />
            </Button>
            <Button onClick={handleDeleteBoard} type="text">
              <IoMdClose />
            </Button>
          </div>
        )}
      </div>
      <SortableContext
        items={items.list.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.list.map((item) => (
          <div key={`task-${item.id}`}>
            <Sortable containerId={items.id} item={item} />
          </div>
        ))}
      </SortableContext>
      <div className={`${showNewCard ? "block" : "hidden"}`}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card title"
          className="mb-2"
        />
        <div className="flex justify-between items-center">
          <Button type="primary" onClick={addNewCard}>
            New Card
          </Button>
          <Button onClick={cancelAddNewCard}>Cancel</Button>
        </div>
      </div>
      {!isPhaseFinished() && (
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
          Add new card
        </Button>
      )}
      <Modal
        title={`Delete board: ${items.title}`}
        onCancel={handleCancelDelete}
        open={isShowModalDelete}
        onOk={onDeleteBoard}
      >
        <p className="text-lg font-semibold text-red-500">
          Warning: You can not undo when delete this
        </p>
      </Modal>
    </div>
  );
};

export default Droppable;
