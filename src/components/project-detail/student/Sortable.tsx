import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Draggable from "./Draggable";

const Sortable = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="mx-auto w-[272px] m-1"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Draggable draggable={item} />
    </div>
  );
};

export default Sortable;
