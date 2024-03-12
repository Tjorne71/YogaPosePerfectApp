import { PoseAngles } from '@/app/model/PoseAngles';
import React from 'react';

interface AngleDiagramProps {
  poseAngles: PoseAngles;
}

export default function AngleDiagram({ poseAngles }: AngleDiagramProps) {
  return (
    <div>
      <p>leftElbowAngle: {Math.round(poseAngles.leftElbowAngle)}</p>
      <p>rightElbowAngle: {Math.round(poseAngles.rightElbowAngle)}</p>
      <p>leftShoulderAngle: {Math.round(poseAngles.leftShoulderAngle)}</p>
      <p>rightShoulderAngle: {Math.round(poseAngles.rightShoulderAngle)}</p>
      <p>leftHipAngle: {Math.round(poseAngles.leftHipAngle)}</p>
      <p>rightHipAngle: {Math.round(poseAngles.rightHipAngle)}</p>
      <p>leftKneeAngle: {Math.round(poseAngles.leftKneeAngle)}</p>
      <p>rightKneeAngle: {Math.round(poseAngles.rightKneeAngle)}</p>
      <p>leftAnkle: {Math.round(poseAngles.leftAnkle)}</p>
      <p>rightAnkle: {Math.round(poseAngles.rightAnkle)}</p>
    </div>
  );
}
