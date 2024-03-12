'use client';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseDetector } from '@/app/pose_detection/poseDetector';
import { Pose } from '@tensorflow-models/pose-detection';
import LandMarkCanvas from '@/app/shared/components/LandMarkCanvas/LandMarkCanvas';
import { PosePrediction, PosePredictor } from '@/app/pose_detection/posePredictor';

export default function Pose() {
  const webcamRef = useRef<Webcam>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | undefined>(undefined);
  const [poseDetector, setPoseDetector] = useState<PoseDetector | undefined>(undefined);
  const [posePredictor, setPosePredictor] = useState<PosePredictor | undefined>(undefined);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [posePrediction, setPosePrediction] = useState<PosePrediction | undefined>(undefined);

  useEffect(() => {
    async function fetchCamera() {
      if (userMedia && document && poseDetector === undefined) {
        const poseDetector = new PoseDetector();
        const posePredictor = new PosePredictor();
        await poseDetector.init(userMedia);
        await posePredictor.init(userMedia);
        setPoseDetector(poseDetector);
        setPosePredictor(posePredictor);
      }
    }
    fetchCamera();
  }, [userMedia, poseDetector]);

  useEffect(() => {
    function handlePoseStream() {
      if (poseDetector) {
        const loop = async () => {
          poseDetector.renderResult().then((poses) => {
            setPoses(poses);
          });
          requestAnimationFrame(loop);
        };
        loop();
      }
    }
    handlePoseStream();
  }, [poseDetector]);

  useEffect(() => {
    function handlePoseStream() {
      if (posePredictor) {
        const loop = async () => {
          posePredictor.predict().then((newPosePrediction) => {
            if (newPosePrediction) {
              setPosePrediction(newPosePrediction);
            }
          });
          requestAnimationFrame(loop);
        };
        loop();
      }
    }
    handlePoseStream();
  }, [posePredictor]);
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
        <LandMarkCanvas
          className="absolute -scale-x-100"
          poses={poses}
          posePrediction={posePrediction}
          video={webcamRef.current.video}
          canvasHeight={webcamRef.current.video.offsetHeight}
          canvasWidth={webcamRef.current.video.offsetWidth}
        />
      )}
    </main>
  );
}
