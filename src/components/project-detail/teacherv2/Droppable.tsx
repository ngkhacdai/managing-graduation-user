import React, { useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { Modal } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { deleteBoard } from "@/redux/slices/ProjectDetailSlice";
import { useTranslations } from "next-intl";
import { AppDispatch } from "@/redux/store";

const Droppable = ({ items }) => {
  const t = useTranslations("ProjectDetail");
  const dispatch = useDispatch<AppDispatch>();
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: items.id });

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
