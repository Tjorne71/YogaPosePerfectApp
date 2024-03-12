'use client';
import React, { useEffect, useRef } from 'react';
import { Pose } from '@tensorflow-models/pose-detection';
import { RendererCanvas2d } from '@/app/util/RendererCanvas2d';

interface PoseCanvasProps {
  poses: Pose[];
  video: HTMLVideoElement;
  mirrored?: boolean;
  canvasWidth: number;
  canvasHeight: number;
  className?: string;
}

export default function PoseCanvas({ poses, video, mirrored, canvasWidth, canvasHeight, className }: PoseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || poses === undefined || poses.length === 0) return;
    const rendererCanvas2d = new RendererCanvas2d(canvas);
    rendererCanvas2d.draw(video, poses);
  }, [poses, mirrored, video]);

  return <canvas className={className} width={canvasWidth} height={canvasHeight} ref={canvasRef} />;
}
