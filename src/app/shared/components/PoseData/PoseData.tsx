import { cn } from '@/app/util/cn';
import React from 'react';
import ScoreCircle from '../ScoreCircle/ScoreCircle';

interface PoseDataProps {
  score: number;
  className?: string;
}

export default function PoseData({ score, className }: PoseDataProps) {
  return (
    <div className={cn(' bg-slate-500 bg-opacity-55 rounded-b-4xl flex justify-center items-center', className)}>
      <ScoreCircle score={score} />
    </div>
  );
}
