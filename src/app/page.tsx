'use client';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseDetector } from '@/app/pose_detection/poseDetector';
import { Pose } from '@tensorflow-models/pose-detection';
import LandMarkCanvas from '@/app/shared/components/LandMarkCanvas/LandMarkCanvas';
import { PosePrediction, PosePredictor } from '@/app/pose_detection/posePredictor';
import { calculatePoseAngles } from './util/calculatePoseAngles';
import { getPerfectPoseAngles } from './util/getPerfectPoseAngles';
import { calculatePoseScore } from './util/calculatePoseAnglesScore';
import ScoreCircle from './shared/components/ScoreCircle/ScoreCircle';

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
  let score = 0;
  if (poses.length > 0 && posePrediction) {
    const poseAngles = calculatePoseAngles(poses[0]);
    const perfectAngles = getPerfectPoseAngles(posePrediction);
    const scoreFloat = calculatePoseScore(poseAngles, perfectAngles);
    score = Math.round(scoreFloat);
  }

  const videoConstraints: MediaTrackConstraints = {
    facingMode: 'user',
  };
  return (
    <main className="overflow-hidden">
      <div className="flex max-h-screen overflow-hidden flex-col items-center justify-between">
        <Webcam
          id="video"
          className="relative min-w-full"
          ref={webcamRef}
          onUserMedia={(userMedia) => setUserMedia(userMedia)}
          mirrored
          videoConstraints={videoConstraints}
        />
        {webcamRef.current?.video && (
          <LandMarkCanvas
            className="absolute -scale-x-100 w-full"
            poses={poses}
            posePrediction={posePrediction}
            video={webcamRef.current.video}
            canvasHeight={webcamRef.current.video.offsetHeight}
            canvasWidth={webcamRef.current.video.offsetWidth}
          />
        )}
      </div>
      <ScoreCircle score={score} className="fixed top-0 left-10" />
    </main>
  );
}
