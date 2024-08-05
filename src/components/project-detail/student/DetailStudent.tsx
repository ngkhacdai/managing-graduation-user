"use client";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useState } from "react";
import Droppable from "./Droppable";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Button, Input } from "antd";
import { FaPlus } from "react-icons/fa";

const DetailStudent = () => {
  const [items, setItems] = useState([
    {
      id: "container-1",
      title: "To do",
      list: [
        {
          id: "task-1",
          title: "Task 1",
          detail: { detail: "abc", comment: [] },
        },
        { id: "task-5", title: "Task 5", detail: { detail: "", comment: [] } },
        { id: "task-4", title: "Task 4", detail: { detail: "", comment: [] } },
      ],
    },
    {
      id: "container-2",
      title: "In progress",
      list: [
        { id: "task-2", title: "Task 2", detail: { detail: "", comment: [] } },
      ],
    },
    {
      id: "container-3",
      title: "Done",
      list: [
        { id: "task-3", title: "Task 3", detail: { detail: "", comment: [] } },
      ],
    },
  ]);
  const [title, setTitle] = useState("");
  const [isShowFormAddBoard, setIsShowFormAddBoard] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainerById = (id) =>
    items.find((container) => container.id === id);

  const findItemById = (id) => {
    for (const container of items) {
      const item = container.list.find((item) => item.id === id);
      if (item) return { container, item };
    }
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Check if the dragged item is over a different item
    if (active.id.startsWith("task-") && over.id.startsWith("task-")) {
      const { container: activeContainer, item: activeItem } =
        findItemById(active.id) || {};
      const { container: overContainer, item: overItem } =
        findItemById(over.id) || {};

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = items.indexOf(activeContainer);
      const overContainerIndex = items.indexOf(overContainer);
      const activeItemIndex = activeContainer.list.indexOf(activeItem);
      const overItemIndex = overContainer.list.indexOf(overItem);

      if (activeContainerIndex === overContainerIndex) {
        // Reorder items within the same container
        let newItems = [...items];
        newItems[activeContainerIndex].list = arrayMove(
          newItems[activeContainerIndex].list,
          activeItemIndex,
          overItemIndex
        );
        setItems(newItems);
      } else {
        // Move item between different containers
        let newItems = [...items];
        const [movedItem] = newItems[activeContainerIndex].list.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].list.splice(overItemIndex, 0, movedItem);
        setItems(newItems);
      }
    }

    // Check if the dragged item is over a container
    if (active.id.startsWith("task-") && over.id.startsWith("container-")) {
      const { container: activeContainer, item: activeItem } =
        findItemById(active.id) || {};
      const overContainer = findContainerById(over.id);

      if (!activeContainer || !overContainer) return;

      let newItems = [...items];
      const activeContainerIndex = items.indexOf(activeContainer);
      const overContainerIndex = items.indexOf(overContainer);
      const [movedItem] = newItems[activeContainerIndex].list.splice(
        newItems[activeContainerIndex].list.indexOf(activeItem),
        1
      );
      newItems[overContainerIndex].list.push(movedItem);

      setItems(newItems);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // Container sorting
    if (
      active.id.startsWith("container-") &&
      over.id.startsWith("container-")
    ) {
      const activeIndex = items.findIndex(
        (container) => container.id === active.id
      );
      const overIndex = items.findIndex(
        (container) => container.id === over.id
      );

      let newItems = arrayMove(items, activeIndex, overIndex);
      setItems(newItems);
    }

    setActiveId(null);
  };

  const addItemInList = (containerId, title) => {
    const copyItems = [...items];
    const findItem = copyItems.findIndex((item) => {
      return item.id === containerId;
    });
    const taskId = `task-${(((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1)}`;
    items[findItem].list.push({
      title,
      id: taskId,
      detail: { detail: "", comment: [] },
    });
    setItems(copyItems);
  };

  const addNewBoard = () => {
    const newBoardId = `container-${(((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1)}`;
    setItems([
      ...items,
      {
        id: newBoardId,
        title,
        list: [],
      },
    ]);
    setActiveId(newBoardId); // Ensure the active ID is correctly set
    cancelAddNewBoard();
  };

  const cancelAddNewBoard = () => {
    setIsShowFormAddBoard(false);
    setTitle("");
  };

  const deleteBoard = (boardId) => {
    setItems(items.filter((item) => item.id !== boardId));
  };
  const deleteTask = (containerId: string, taskId: string) => {
    const newItems = [...items];
    const findContainer = newItems.findIndex(
      (container) => container.id === containerId
    );
    newItems[findContainer].list = newItems[findContainer].list.filter(
      (task) => task.id !== taskId
    );
    setItems(newItems);
  };
  const DraggableContainer = ({ container }) => (
    <div className="flex flex-col w-72 min-h-28 p-2 bg-gray-100 m-2 rounded-xl">
      <div className="flex justify-between mx-1 items-center">
        <p>{container.title}</p>
        <div className="flex">
          <Button onClick={() => deleteBoard(container.id)} type="text">
            <FaPlus />
          </Button>
        </div>
      </div>
      <div>
        {container.list.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center justify-between bg-white py-2 border-inherit border-2 rounded-xl m-1"
          >
            <div className="px-2">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-auto h-[38.7rem] bg-blue-500 shadow-inner">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex">
            {items.map((item) => (
              <div key={item.id}>
                <Droppable
                  items={item}
                  deleteBoard={deleteBoard}
                  addItemInList={addItemInList}
                  deleteTask={(containerId: string, taskId: string) => {
                    deleteTask(containerId, taskId);
                  }}
                />
              </div>
            ))}
            <div
              className={`${
                !isShowFormAddBoard ? "hidden" : ""
              } m-2 w-72 h-24 p-2 rounded-xl bg-gray-100`}
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Board title"
                className="mb-2"
              />
              <div className="flex justify-between items-center">
                <Button type="primary" onClick={addNewBoard}>
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
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activeId ? (
            activeId.startsWith("container-") ? (
              <DraggableContainer container={findContainerById(activeId)} />
            ) : findItemById(activeId)?.item ? (
              <div className="w-full flex items-center justify-between bg-white py-2 border-inherit border-2 rounded-xl m-1">
                <div className="px-2">{findItemById(activeId).item.title}</div>
              </div>
            ) : null
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DetailStudent;
