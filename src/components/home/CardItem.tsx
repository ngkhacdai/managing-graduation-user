import { Card } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { FaRegFilePdf } from "react-icons/fa";

const CardItem = ({ item }) => {
  const t = useTranslations("HomePage");
  return (
    <Card
      className="border border-gray-200 max-h-64 min-h-64 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      title={
        <p className="truncate text-lg font-semibold">{item.projectName}</p>
      }
    >
      <div className="flex gap-2">
        <div>
          <FaRegFilePdf
            size={24}
            className="border-2 w-10 p-1 h-10 rounded-full"
          />
        </div>
        <div className="flex-1">
          <div>
            <p className="font-medium text-gray-700 break-words line-clamp-2">
              {item.studentName}
            </p>
            <p className="text-sm break-words text-gray-500">
              {item.studentId}
            </p>
          </div>
          <p className="break-words text-gray-600 line-clamp-2">
            {t("major")}: {item.branchName}
          </p>
          <p className="break-words text-gray-600 line-clamp-2">
            {t("teacher")}: {item.mentor}
          </p>
          <p className="text-right truncate text-gray-800 font-semibold">
            {t("mark")}: {item.point}/10
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
