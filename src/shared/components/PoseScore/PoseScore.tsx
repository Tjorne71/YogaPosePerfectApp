import React from "react";
import { Progress } from "@nextui-org/react";
import { cn } from "@/util/cn";

interface PoseScoreProps {
  value: number;
  className?: string;
}

export default function PoseScore({ value, className }: PoseScoreProps) {
  return (
    <div className={cn("bg-slate-900 min-w-96 min-h-96", className)}>
      hallo
      {/* <Progress
        size="lg"
        aria-label="Pose Score"
        value={value}
        color="secondary"
      /> */}
    </div>
  );
}
