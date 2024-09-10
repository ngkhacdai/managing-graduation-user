"use client";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useCallback, useEffect } from "react";
import Droppable from "./Droppable";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import debounce from "lodash.debounce";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getBoard,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
} from "@/redux/slices/ProjectDetailSlice";
import AddNewBoard from "./AddNewBoard";
import { useRouter, useSearchParams } from "next/navigation";
import { useIsPhaseFinished } from "@/utils/checkPhaseFinished";

const DetailProject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const phase = useSelector((state: RootState) => state.projectDetail.phase);

  const dispatchBoard = useCallback(
    debounce((id) => {
      dispatch(getBoard(id));
    }, 300),
    [dispatch]
  );
  useEffect(() => {
    const phaseId = searchParams.get("phase");
    if (phaseId && phase.some((item) => item.id.toString() === phaseId)) {
      dispatchBoard(phaseId);
    }
  }, [phase, searchParams]);
  const items = useSelector(
    (state: RootState) => state.projectDetail.projectDetail
  );
  const activeId = useSelector(
    (state: RootState) => state.projectDetail.activeId
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainerById = (id: string) =>
    items.find((container) => container.id === id);

  const findItemById = (id) => {
    for (const container of items) {
      const item = container.task.find((item) => item.id === id);
      if (item) return { container, item };
    }
    return null;
  };

  const DraggableContainer = ({ container }) => (
    <div className="flex flex-col w-72 min-h-28 p-2 bg-gray-100 m-2 rounded-xl">
      <div className="flex justify-between mx-1 items-center">
        <p>{container.title}</p>
      </div>
      <div>
        {container.task.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full flex items-center justify-between bg-white py-2 border-inherit border-2 rounded-xl m-1"
            >
              <div className="px-2">{item.taskName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
  const handleDragOverEvent = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id.startsWith("task-") && over.id.startsWith("container-")) {
      debouncedHandleDragOver(event);
    } else {
      dispatch(handleDragOver({ event }));
    }
  };

  const debouncedHandleDragOver = useCallback(
    debounce((event) => {
      dispatch(handleDragOver({ event }));
    }, 100),
    [dispatch]
  );
  return (
    <div className="w-full overflow-auto bg-blue-500 shadow-inner">
      <DndContext
        sensors={sensors}
        onDragStart={(event) => dispatch(handleDragStart({ event }))}
        onDragOver={handleDragOverEvent}
        onDragEnd={(event) => dispatch(handleDragEnd({ event }))}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex">
            {items.map((item) => (
              <div key={item.id}>
                <Droppable items={item} />
              </div>
            ))}
            {!useIsPhaseFinished() && <AddNewBoard />}
          </div>
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activeId ? (
            activeId.startsWith("container-") ? (
              <DraggableContainer container={findContainerById(activeId)} />
            ) : findItemById(activeId)?.item ? (
              <div className="w-full flex items-center justify-between bg-white py-2 border-inherit border-2 rounded-xl m-1">
                <div className="px-2">
                  {findItemById(activeId).item.taskName}
                </div>
              </div>
            ) : null
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DetailProject;
