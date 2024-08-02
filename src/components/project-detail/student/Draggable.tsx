import React from "react";

const Draggable = ({ draggable }) => {
  return (
    <div className="w-full bg-white py-2 max-w-[272px] break-words border-inherit border-2 rounded-xl ">
      <div className="px-2">{draggable}</div>
    </div>
  );
};

export default Draggable;
