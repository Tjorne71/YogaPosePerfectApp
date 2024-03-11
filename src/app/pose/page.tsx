'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseDetector } from '@/app/pose_detection/poseDetector';

export default function Pose() {
  const webcamRef = useRef(null);
  const [userMedia, setUserMedia] = useState<MediaStream | undefined>(undefined);
  const [poseDetector, setPoseDetector] = useState<PoseDetector | undefined>(undefined);

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
          await poseDetector.renderResult();

          requestAnimationFrame(loop);
        };
        loop();
      }
    }
    handlePoseStream();
  }, [poseDetector]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="stats"></div>
      <div id="main">
        <div className="container">
          <div className="canvas-wrapper">
            <canvas id="output"></canvas>
            <Webcam id="video" className="" ref={webcamRef} onUserMedia={(userMedia) => setUserMedia(userMedia)} />
            <div id="predictionText0" className="text-xl"></div>
            <div id="predictionText1" className="text-xl"></div>
            <div id="predictionText2" className="text-xl"></div>
            <div id="predictionText3" className="text-xl"></div>
          </div>
          <div id="scatter-gl-container"></div>
        </div>
      </div>
    </main>
  );
}
