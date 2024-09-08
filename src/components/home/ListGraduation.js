import { Col, Pagination, Row } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import CardItem from "./CardItem";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DrawerDetail = dynamic(() => import("./DrawerDetail"), { ssr: false });

const ListGraduation = ({ listProduct }) => {
  const t = useTranslations("HomePage");
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1];
  const [selectedItem, setSelectedItem] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onClose = () => {
    setDrawerOpen(false);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };
  if (!listProduct || listProduct.length <= 0) {
    return <p className="text-center text-gray-600">{t("noProduct")}</p>;
  }
  return (
    <div className="w-full">
      <Row gutter={[16, 16]}>
        {listProduct &&
          listProduct.length > 0 &&
          listProduct.map((item, index) => (
            <Col
              key={`graduation-${index}`}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={6}
            >
              <Link
                href={`/${currentLanguage}/detail?projectId=${item.projectId}`}
              >
                <CardItem item={item} />
              </Link>
            </Col>
          ))}
      </Row>
      <div className="flex justify-center items-center mt-6">
        <Pagination
          responsive={true}
          total={listProduct.length}
          defaultPageSize={10}
          showSizeChanger={false}
        />
      </div>
      {/* <DrawerDetail open={drawerOpen} item={selectedItem} onClose={onClose} /> */}
    </div>
  );
};

export default ListGraduation;
