import React from "react";
import CardStatistic from "./CardStatistic";

const Statistic = () => {
  const fakeData = [
    { title: "Total Student", total: 100 },
    { title: "Total Project", total: 100 },
    { title: "Total Processing", total: 100 },
    { title: "Total Finished", total: 100 },
    { title: "Total Failed", total: 100 },
  ];

  return (
    <div className="flex flex-wrap justify-center p-5">
      {fakeData.map((item, index) => (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={`card-${index}`}>
          <CardStatistic data={item} />
        </div>
      ))}
    </div>
  );
};

export default Statistic;
