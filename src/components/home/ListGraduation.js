import { Col, Pagination, Row } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import CardItem from "./CardItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ListGraduation = ({ listProduct }) => {
  const t = useTranslations("HomePage");
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the items for the current page
  const paginatedList = listProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (!listProduct || listProduct.length <= 0) {
    return <p className="text-center text-gray-600">{t("noProduct")}</p>;
  }

  return (
    <div className="w-full">
      <Row gutter={[16, 16]}>
        {paginatedList.map((item, index) => (
          <Col
            key={`graduation-${index}`}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
          >
            <Link
              href={`/${currentLanguage}/public/project/detail/${item.projectId}`}
            >
              <CardItem item={item} />
            </Link>
          </Col>
        ))}
      </Row>
      <div className="flex justify-center items-center mt-6">
        <Pagination
          current={currentPage}
          responsive={true}
          total={listProduct.length}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListGraduation;
