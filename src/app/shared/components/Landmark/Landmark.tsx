import React from 'react';
import { Pose } from '@tensorflow-models/pose-detection';

interface LandmarkProps {
  x: number;
  y: number;
  score: number;
  name: string;
}

export default function Landmark({ x, y, score, name }: LandmarkProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx={x} cy={y} r="5" fill="red" />
    </svg>
  );
}
