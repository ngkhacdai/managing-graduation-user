"use client";

import { RootState } from "@/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export const isPhaseFinished = () => {
  let phase = [];
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (pathName.includes("/project/detail")) {
    phase = useSelector((state: RootState) => state.projectDetail.phase);
    const params = new URLSearchParams();
    params.set("studentName", searchParams.get("studentName"));
    params.set("teacherName", searchParams.get("teacherName"));
    params.set("projectName", searchParams.get("projectName"));
    if (phase.length > 0 && !searchParams.get("phase")) {
      params.set("phase", `${phase[0].id}`);
      router.push(
        `/${pathName.split("/")[1]}/project/detail?${params.toString()}`
      );
    } else if (phase.length > 0 && searchParams.get("phase")) {
      params.set("phase", `${phase[0].id}`);
      const checkPhaseUrl = phase.some(
        (i) => i.id == searchParams.get("phase")
      );
      if (!checkPhaseUrl) {
        router.push(
          `/${pathName.split("/")[1]}/project/detail?${params.toString()}`
        );
      }
    }
  }

  const currentPhaseId = searchParams.get("phase");

  if (phase.length === 0) {
    return true;
  }
  return phase.some((item) => item?.id == currentPhaseId && item?.completed);
};
