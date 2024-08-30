import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Drawer, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FaDownload } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { getPublicProjectByProjectId } from "@/api/Public";

const DrawerDetail = ({ open, onClose, item }) => {
  const t = useTranslations("HomePage");
  const [showDetail, setShowDetail] = useState(false);
  const [projectDetail, setProjectDetail] = useState<any>();

  const getData = async () => {
    const response = await getPublicProjectByProjectId(item.projectId);
    setProjectDetail(response);
  };

  useEffect(() => {
    if (item?.projectId) {
      getData();
    }
  }, [item]);
  if (!projectDetail) {
    return;
  }
  return (
    <div>
      <Drawer
        placement="bottom"
        title={t("details")}
        onClose={onClose}
        open={open}
        width="100%"
        height="100%"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col h-full">
          <div className="relative flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 py-2 px-5 bg-gray-300 flex items-center justify-between">
              <Tooltip title="Detail profile">
                <AiOutlineBars
                  size={20}
                  onClick={() => setShowDetail(true)}
                  className="cursor-pointer"
                />
              </Tooltip>
              <Tooltip title="Download">
                <a href={projectDetail?.filePdf}>
                  <FaDownload size={20} className="cursor-pointer" />
                </a>
              </Tooltip>
            </div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                httpHeaders={{ mode: "no-cors" }}
                fileUrl={projectDetail?.filePdf}
              />
            </Worker>
          </div>
        </div>
      </Drawer>

      <Drawer
        placement="left"
        onClose={() => setShowDetail(false)}
        open={showDetail}
        width={350}
      >
        <div>
          <img
            alt=""
            src=""
            className="rounded-full border-2 border-inherit w-16 h-16 mx-auto my-2"
          />
          <p className="text-center text-xl font-semibold">
            {projectDetail?.projectName}
          </p>
          <div className="flex">
            <p className="min-w-24 font-medium">{t("madeBy")}:</p>
            <p className="break-all">{projectDetail?.projectAuthor}</p>
          </div>
          <div className="flex">
            <p className="min-w-24 font-medium">{t("Branch")}:</p>
            <p className="break-all">{projectDetail?.branch}</p>
          </div>
          <div className="flex">
            <p className="min-w-24 font-medium">{t("mark")}:</p>
            <p className="break-all">{projectDetail?.mark}</p>
          </div>
          <div className="flex">
            <p className="min-w-24 font-medium">{t("descriptionDetail")}:</p>
            <p className="break-all">{projectDetail?.projectDescription}</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerDetail;
