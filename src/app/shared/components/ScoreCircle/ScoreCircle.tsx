import { cn } from '@/app/util/cn';
import React from 'react';

interface ScoreCircle {
  score: number;
  className?: string;
}

export default function ScoreCircle({ score, className }: ScoreCircle) {
  // Calculate color based on the score

  const roundedScore = Math.round(score / 5) * 5;
  const color = `rgb(${255 - (roundedScore * 255) / 100}, ${(roundedScore * 255) / 100}, 0)`;

  return (
    <div
      className={cn('aspect-square h-44 rounded-full flex justify-center items-center', className)}
      style={{ backgroundColor: color }}
    >
      <span className="text-6xl">{roundedScore}</span>
    </div>
  );
}
