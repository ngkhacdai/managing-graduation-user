import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "antd";
import { MdOutlineDragIndicator } from "react-icons/md";
import ModalDetailTask from "./ModalDetailTask";
import { FaRegComment } from "react-icons/fa";
import { isPhaseFinished } from "@/utils/checkPhaseFinished";

const Sortable = ({ containerId, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });
  const [isShowModal, setIsShowModal] = useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <div
        className="mx-auto w-[272px] m-1"
        ref={setNodeRef}
        {...attributes}
        style={style}
        onClick={() => {
          setIsShowModal(true);
        }}
      >
        <div className="bg-white py-2 max-w-[272px] border-inherit border-2 rounded-xl flex items-center justify-between">
          <div className="w-full break-words ">
            <div className="px-2">{item.title}</div>

            {item.detail.comment.length > 0 && (
              <div className="flex px-2 items-center">
                <FaRegComment />
                <p className="mx-1">{item.detail.comment.length}</p>
              </div>
            )}
          </div>
          {!isPhaseFinished() && (
            <Button type="text" className="h-full" {...listeners}>
              <MdOutlineDragIndicator />
            </Button>
          )}
        </div>
      </div>
      {isShowModal && (
        <ModalDetailTask
          containerId={containerId}
          setIsShowModal={(cancel) => {
            setIsShowModal(cancel);
          }}
          item={item}
        />
      )}
    </div>
  );
};

export default Sortable;
