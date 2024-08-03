"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useState } from "react";
import Droppable from "./Droppable";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";

const DetailStudent = () => {
  const [items, setItems] = useState([
    {
      id: "todo",
      title: "To do",
      list: [
        { id: 1, title: "Task 1" },
        { id: 5, title: "Task 5" },
        { id: 4, title: "Task 4" },
      ],
    },
    {
      id: "in-progress",
      title: "In progress",
      list: [{ id: 2, title: "Task 2" }],
    },
    { id: "done", title: "Done", list: [{ id: 3, title: "Task 3" }] },
  ]);
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id) => {
    for (const container of items) {
      if (container.list.find((item) => item.id === id)) {
        return container;
      }
    }
    return items.find((container) => container.id === id) || null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over || {};

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer.id === overContainer.id
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = [...activeContainer.list];
      const overItems = [...overContainer.list];

      const activeIndex = activeItems.findIndex((item) => item.id === id);
      let newIndex;
      if (overId == null) {
        newIndex = overItems.length;
      } else {
        const overIndex = overItems.findIndex((item) => item.id === overId);
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect &&
          over.rect &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      return prev.map((container) => {
        if (container.id === activeContainer.id) {
          return {
            ...container,
            list: activeItems.filter((item) => item.id !== id),
          };
        } else if (container.id === overContainer.id) {
          return {
            ...container,
            list: [
              ...overItems.slice(0, newIndex),
              activeItems[activeIndex],
              ...overItems.slice(newIndex),
            ],
          };
        } else {
          return container;
        }
      });
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over || {};

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer.id !== overContainer.id
    ) {
      return;
    }

    const activeIndex = activeContainer.list.findIndex(
      (item) => item.id === id
    );
    const overIndex = overContainer.list.findIndex(
      (item) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((prev) =>
        prev.map((container) =>
          container.id === activeContainer.id
            ? {
                ...container,
                list: arrayMove(container.list, activeIndex, overIndex),
              }
            : container
        )
      );
    }
    setActiveId(null);
  };

  return (
    <div className="w-full h-[42rem] bg-blue-500 shadow-inner">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex">
          {items.map((item, index) => (
            <Droppable key={index} items={item} />
          ))}
          <Button className="flex items-center m-2 w-72 h-14 justify-start rounded-xl">
            <FaPlus />
            <p>Add new board</p>
          </Button>
        </div>
      </DndContext>
    </div>
  );
};

export default DetailStudent;
