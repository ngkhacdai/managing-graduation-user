import { Card, Col, Pagination, Row } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const ListGraduation = ({ listProduct }) => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full p-2">
      <p className="text-xl font-bold">{t("titleListProduct")}</p>
      <div className="my-2 w-full">
        <Row gutter={[16, 16]}>
          {listProduct.length > 0 ? (
            listProduct.map((item, index) => {
              return (
                <Col
                  key={`graduation-${index}`}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={8}
                >
                  <Card
                    className="border-2 border-inherit border-solid"
                    title={<p className="truncate">{item.product_name}</p>}
                  >
                    <div className="flex items-center">
                      <div className="w-10 mr-2 h-10 rounded-full bg-red-500 flex-shrink-0"></div>
                      <div className="flex-grow w-full">
                        <div>
                          <p className="line-clamp-1">{item.name}</p>
                          <p>{item.msv}</p>
                        </div>

                        <p className="truncate">
                          {t("major")}: {item.branch}
                        </p>
                        <p className="truncate">
                          {t("teacher")}: {item.instructors}
                        </p>
                        <p className="text-end truncate">
                          {t("mark")}: {item.point}/10
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>No product</p>
          )}
        </Row>
        <div className="flex justify-center items-center my-2">
          <Pagination responsive={true} total={500} pageSize={21} />
        </div>
      </div>
    </div>
  );
};

export default ListGraduation;
