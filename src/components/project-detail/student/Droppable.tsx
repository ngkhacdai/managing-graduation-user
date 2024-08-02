import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Sortable from "./Sortable";

const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className="flex flex-col w-72 min-h-28 max-h-80 bg-gray-100 m-2 rounded-xl"
      ref={setNodeRef}
    >
      <SortableContext
        id={id}
        strategy={verticalListSortingStrategy}
        items={items}
      >
        {items.map((item) => (
          <Sortable key={item} item={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Droppable;
