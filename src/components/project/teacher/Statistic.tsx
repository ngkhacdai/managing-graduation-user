import React from "react";
import CardStatistic from "./CardStatistic";
import { useTranslations } from "next-intl";

const Statistic = ({ data }) => {
  const t = useTranslations("Project");
  return (
    <div className="flex flex-wrap justify-center p-5">
      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
          <div className="text-center font-bold text-2xl text-gray-600">
            {data.completedProjectCount}
          </div>
          <div className="text-xl font-semibold">{t("projectComplete")}</div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
          <div className="text-center font-bold text-2xl text-gray-600">
            {data.processingProjectCount}
          </div>
          <div className="text-xl font-semibold">{t("projectProcessing")}</div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
          <div className="text-center font-bold text-2xl text-gray-600">
            {data.totalProjectPass}
          </div>
          <div className="text-xl font-semibold">{t("projectPassed")}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
