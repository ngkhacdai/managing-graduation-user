"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import React from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Page = ({ params }: { params: { url: string } }) => {
  const decodeUrl = (url: string) => {
    // Replace underscores with slashes
    const adjustedUrl = url.replace(/_/g, "/");
    // Decode the URL using decodeURIComponent
    return decodeURIComponent(adjustedUrl);
  };

  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={decodeUrl(params.url)} />
      </Worker>
    </div>
  );
};

export default Page;
