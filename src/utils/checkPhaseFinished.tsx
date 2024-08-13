"use client";

import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export const isPhaseFinished = () => {
  const phase = useSelector((state: RootState) => state.projectDetail.phase);
  const searchParams = useSearchParams();

  const currentPhaseId = searchParams.get("phase")?.split("phase")[1];
  return phase.some(
    (item) => item.id == parseInt(currentPhaseId) && item.finished
  );
};
