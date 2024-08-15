import React from "react";

const CardStatistic = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
        <div className="text-5xl font-semibold">{data.total}</div>
        <div className="text-center text-gray-600">{data.title}</div>
      </div>
    </div>
  );
};

export default CardStatistic;
