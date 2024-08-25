import { Card } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const CardItem = ({ item }) => {
  const t = useTranslations("HomePage");
  return (
    <Card
      className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      title={
        <p className="truncate text-lg font-semibold">{item.product_name}</p>
      }
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-red-500 flex-shrink-0 mr-4"></div>
        <div className="w-full">
          <div>
            <p className="font-medium text-gray-700 line-clamp-1">
              {item.name}
            </p>
            <p className="text-sm text-gray-500">{item.msv}</p>
          </div>
          <p className="truncate text-gray-600">
            {t("major")}: {item.branch}
          </p>
          <p className="truncate text-gray-600">
            {t("teacher")}: {item.instructors}
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
