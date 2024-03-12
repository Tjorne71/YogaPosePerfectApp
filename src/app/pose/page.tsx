'use client';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseDetector } from '@/app/pose_detection/poseDetector';
import { Pose } from '@tensorflow-models/pose-detection';
import PoseCanvas from '../shared/components/PoseCanvas/PoseCanvas';

export default function Pose() {
  const webcamRef = useRef<Webcam>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | undefined>(undefined);
  const [poseDetector, setPoseDetector] = useState<PoseDetector | undefined>(undefined);
  const [poses, setPoses] = useState<Pose[]>([]);

  useEffect(() => {
    async function fetchCamera() {
      if (userMedia && document && poseDetector === undefined) {
        const poseDetector = new PoseDetector();
        await poseDetector.init(userMedia);
        setPoseDetector(poseDetector);
      }
    }
    fetchCamera();
  }, [userMedia, poseDetector]);

  useEffect(() => {
    function handlePoseStream() {
      if (poseDetector) {
        const loop = async () => {
          poseDetector.renderResult().then((poses) => setPoses(poses));
          requestAnimationFrame(loop);
        };
        loop();
      }
    }
    handlePoseStream();
  }, [poseDetector]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Webcam
        id="video"
        className="relative"
        ref={webcamRef}
        onUserMedia={(userMedia) => setUserMedia(userMedia)}
        mirrored
      />
      {webcamRef.current?.video && (
        <PoseCanvas
          className="absolute"
          poses={poses}
          video={webcamRef.current.video}
          canvasHeight={webcamRef.current.video.offsetHeight}
          canvasWidth={webcamRef.current.video.offsetWidth}
          mirrored
        />
      )}
    </main>
  );
}
