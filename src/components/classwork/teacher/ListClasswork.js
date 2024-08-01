import React from "react";
import ClassworkItem from "./ClassworkItem";

const ListClasswork = ({ listClasswork }) => {
  return (
    <div className="mt-2">
      {listClasswork?.length > 0 &&
        listClasswork?.map((classwork, index) => (
          <div key={`classwork item - ${index}`}>
            <ClassworkItem classworkItem={classwork} />
          </div>
        ))}
    </div>
  );
};

export default ListClasswork;
