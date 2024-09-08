"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useIsPhaseFinished = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const phase = useSelector((state: RootState) => state.projectDetail.phase);

  useEffect(() => {
    if (pathName.includes("/project/detail")) {
      const params = new URLSearchParams();
      params.set("projectName", searchParams.get("projectName") || "");

      if (phase.length > 0) {
        const phaseId = `${phase[0].id}`;
        if (!searchParams.get("phase")) {
          params.set("phase", phaseId);
          router.push(
            `/${pathName.split("/")[1]}/project/detail?${params.toString()}`
          );
        } else {
          const currentPhaseId = searchParams.get("phase");
          if (!phase.some((i) => i.id == currentPhaseId)) {
            params.set("phase", phaseId);
            router.push(
              `/${pathName.split("/")[1]}/project/detail?${params.toString()}`
            );
          }
        }
      }
    }
  }, [pathName, searchParams, phase, router]);

  const currentPhaseId = searchParams.get("phase");

  if (phase.length === 0) {
    return true;
  }
  return phase.some((item) => item?.id == currentPhaseId && item?.completed);
};
