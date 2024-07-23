import { Card, Col, Row } from "antd";
import React from "react";

const ListGraduation = ({ listProduct }) => {
  return (
    <div className="w-full p-2">
      <p className="text-xl font-bold">List product student'graduation</p>
      <div className="my-2 w-full">
        <Row gutter={[16, 16]}>
          {listProduct.length > 0 ? (
            listProduct.map((item, index) => {
              return (
                <Col
                  key={`graduation-${index}`}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                >
                  <Card
                    title={<p className="line-clamp-1">{item.product_name}</p>}
                  >
                    <div className="flex items-center">
                      <p className="w-10 mr-2 h-10 rounded-full bg-red-500 flex-shrink-0"></p>
                      <div className="flex-grow w-full">
                        <p className="truncate line-clamp-1">
                          {item.name} - {item.msv}
                        </p>
                        <p className="line-clamp-1">Ngành học: {item.branch}</p>
                        <p className="line-clamp-1">GVHD: {item.instructors}</p>
                        <p className="text-end line-clamp-1">{item.point}/10</p>
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
      </div>
    </div>
  );
};

export default ListGraduation;
