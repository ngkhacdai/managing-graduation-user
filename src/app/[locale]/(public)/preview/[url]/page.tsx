"use client";

import React from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const Page = ({ params }: { params: { url: string } }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const decodeUrl = (url: string) => {
    // Replace underscores with slashes
    const adjustedUrl = url.replace(/_/g, "/");
    // Decode the URL using decodeURIComponent
    return decodeURIComponent(adjustedUrl);
  };

  return (
    <div className="w-3/4 mx-auto">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            padding: "4px",
          }}
        >
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                Download,
                EnterFullScreen,
                Print,
                ShowSearchPopover,
                Zoom,
                ZoomIn,
                ZoomOut,
                CurrentPageInput,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
              } = props;
              return (
                <>
                  <div style={{ padding: "0px 2px" }}>
                    <ShowSearchPopover />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <ZoomOut />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Zoom />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <ZoomIn />
                  </div>
                  <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                    <GoToPreviousPage />
                  </div>
                  <div style={{ padding: "0px 2px", width: "4rem" }}>
                    <CurrentPageInput />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    / <NumberOfPages />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <GoToNextPage />
                  </div>
                  <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                    <EnterFullScreen />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Download />
                  </div>
                  <div style={{ padding: "0px 2px" }}>
                    <Print />
                  </div>
                </>
              );
            }}
          </Toolbar>
        </div>
        <div
          className="overflow-auto"
          style={{
            height: "600px", // Limit height to 600px
          }}
        >
          <Viewer
            fileUrl={decodeUrl(params.url)}
            httpHeaders={{ mode: "no-cors" }}
            plugins={[toolbarPluginInstance]}
            defaultScale={1}
            renderError={(error) => (
              <div className="text-center p-4 bg-red-100 border border-red-400 rounded">
                <h2 className="text-lg font-semibold mb-2">
                  Error when loading the file
                </h2>
                <p>{error.message}</p>
                <p className="mt-2">
                  <a
                    href={decodeUrl(params.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Click here to download the file
                  </a>
                </p>
              </div>
            )}
          />
        </div>
      </Worker>
    </div>
  );
};

export default Page;
