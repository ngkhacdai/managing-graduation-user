import { Col, Pagination, Row } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import CardItem from "./CardItem";
import DrawerDetail from "./DrawerDetail";

const ListGraduation = ({ listProduct }) => {
  const t = useTranslations("HomePage");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onClose = () => {
    setDrawerOpen(false);
  };

  const handleCardClick = () => {
    setDrawerOpen(true);
  };
  return (
    <div className="w-full">
      <Row gutter={[16, 16]}>
        {listProduct.length > 0 ? (
          listProduct.map((item, index) => (
            <Col
              onClick={handleCardClick}
              key={`graduation-${index}`}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={6}
            >
              <CardItem item={item} />
            </Col>
          ))
        ) : (
          <p className="text-center text-gray-600">{t("noProduct")}</p>
        )}
      </Row>
      <div className="flex justify-center items-center mt-6">
        <Pagination
          responsive={true}
          total={500}
          defaultPageSize={10}
          showSizeChanger={false}
        />
      </div>
      <DrawerDetail open={drawerOpen} onClose={onClose} />
    </div>
  );
};

export default ListGraduation;
