import React from "react";
import ClassworkItem from "./ClassworkItem";

const ListClasswork = ({ listClasswork }) => {
  return (
    <div>
      {listClasswork?.length > 0 &&
        listClasswork?.map((classwork, index) => (
          <div key={`classwork item - ${index}`}>
            <ClassworkItem classwork={classwork} />
          </div>
        ))}
    </div>
  );
};

export default ListClasswork;
