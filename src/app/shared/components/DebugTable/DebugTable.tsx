import { PoseAngles } from '@/app/model/PoseAngles';
import { PosePrediction } from '@/app/pose_detection/posePredictor';
import { calculateLandmarkScore } from '@/app/util/calculateLandmarkScore';
import React from 'react';

interface DebugTableProps {
  poseAngles: PoseAngles;
  poseAnglesGoal: PoseAngles;
  posePrediction: PosePrediction;
}

export default function DebugTable({ poseAngles, poseAnglesGoal, posePrediction }: DebugTableProps) {
  return (
    <div className="text-white text-lg">
      <div>
        <span className="font-bold">{posePrediction.className} </span>
        <span>{Math.round(posePrediction.probability * 100)}%</span>
      </div>
      {poseAngles.angles.map((poseAngle) => {
        const perfectAngle = poseAnglesGoal.angles.find((angle) => angle.landmarkKey === poseAngle.landmarkKey);
        const angleScore = perfectAngle ? calculateLandmarkScore(poseAngle.angle, perfectAngle.angle, 10, 30) : 0;
        const color = `rgb(${255 - (angleScore * 255) / 100}, ${(angleScore * 255) / 100}, 0)`;
        return (
          <div key={poseAngle.landmarkKey}>
            <span>{poseAngle.landmarkKey}: </span>
            <span>{Math.round(poseAngle.angle / 5) * 5}</span>
            {perfectAngle && <span>/ {perfectAngle.angle}</span>}
            <span style={{ color: color }}>/ {Math.round(angleScore / 5) * 5}%</span>
          </div>
        );
      })}
    </div>
  );
}
