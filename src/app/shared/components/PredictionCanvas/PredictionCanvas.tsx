'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@tensorflow-models/pose-detection';
import { RendererCanvas2d } from '@/app/util/RendererCanvas2d';
import { PosePrediction } from '@/app/pose_detection/posePredictor';

interface PredictionCanvasProps {
  posePrediction?: PosePrediction;
  video: HTMLVideoElement;
  canvasWidth: number;
  canvasHeight: number;
  className?: string;
}

export default function PredictionCanvas({
  posePrediction,
  video,
  canvasWidth,
  canvasHeight,
  className,
}: PredictionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendererCanvas2d, setRendererCanvas2d] = useState<RendererCanvas2d | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (rendererCanvas2d === undefined) {
      setRendererCanvas2d(new RendererCanvas2d(canvas));
    } else {
      if (posePrediction) {
        rendererCanvas2d.setOverlayImage(posePrediction);
      }
      rendererCanvas2d.drawOverlayImage();
    }
  }, [posePrediction, video, rendererCanvas2d]);

  return <canvas className={className} width={canvasWidth} height={canvasHeight} ref={canvasRef} />;
}
