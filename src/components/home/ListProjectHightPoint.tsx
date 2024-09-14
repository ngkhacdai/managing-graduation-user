import React, { useRef, useState } from "react";
import data from "@/mockdata/MOCK_DATA.json";
import { Button, Carousel } from "antd";
import CardItem from "./CardItem";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ListProjectHightPoint = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1];
  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  const handleBeforeChange = (from, to) => {
    setCurrentIndex(to);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl my-2">Projects have High Points</p>
        <Link href={`/${currentLanguage}/public/project`}>
          <Button className="text-blue-500 hover:!text-blue-400" type="text">
            <p className="text-lg">View all project</p>
            <FaArrowCircleRight size={16} />
          </Button>
        </Link>
      </div>
      <div className="relative">
        <Carousel
          ref={carouselRef}
          dots={false}
          infinite={false} // Set infinite to false to track the start and end
          slidesToShow={4}
          slidesToScroll={4} // Scroll 4 items at a time
          beforeChange={handleBeforeChange} // Track the current index
          className="overflow-hidden"
        >
          {data.map((item, index) => (
            <div className="px-2" key={`index-${index}`}>
              <CardItem item={item} />
            </div>
          ))}
        </Carousel>

        {currentIndex > 0 && (
          <Button
            className="absolute top-1/2 transform hover:!scale-125 -translate-y-1/2 left-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 focus:outline-none"
            onClick={prev}
          >
            <LeftOutlined />
          </Button>
        )}

        {currentIndex < data.length - 4 && (
          <Button
            className="absolute top-1/2 transform hover:!scale-125 -translate-y-1/2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 focus:outline-none"
            onClick={next}
          >
            <RightOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListProjectHightPoint;
