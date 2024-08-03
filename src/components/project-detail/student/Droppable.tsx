import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { Button, Form, Input } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Droppable = ({ items }) => {
  const [showNewCard, setShowNewCard] = useState(false);
  const { setNodeRef } = useDroppable({
    id: items.id,
  });

  return (
    <div
      className="flex flex-col w-72 min-h-28 p-2 bg-gray-100 m-2 rounded-xl"
      ref={setNodeRef}
    >
      <div className="flex justify-between mx-1 items-center">
        <p className="">{items.title}</p>
        <Button type="text">
          <IoMdClose />
        </Button>
      </div>
      <SortableContext
        id={items.id}
        strategy={verticalListSortingStrategy}
        items={items.list}
      >
        {items.list.map((item) => (
          <Sortable key={item.id} item={item} />
        ))}
      </SortableContext>
      <Form className={`${showNewCard ? "block" : "hidden"} mt-2 `}>
        <Form.Item name="titlecard">
          <Input placeholder="Card title" />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Button type="primary">New Card</Button>
          <Button
            onClick={() => {
              setShowNewCard(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
      <Button
        type="text"
        onClick={() => {
          setShowNewCard(true);
        }}
        className={`flex items-center m-2 ${!showNewCard ? "block" : "hidden"}`}
      >
        <FaPlus />
        Add new card
      </Button>
    </div>
  );
};

export default Droppable;
