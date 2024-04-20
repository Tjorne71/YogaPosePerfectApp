import React from "react";
import { Button } from "@nextui-org/react";
import PoseScore from "@/shared/components/PoseScore/PoseScore";

export default function page() {
  return (
    <div>
      <PoseScore value={30} />
    </div>
  );
}
