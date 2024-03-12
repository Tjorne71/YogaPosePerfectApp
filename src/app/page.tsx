'use client';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseDetector } from '@/app/pose_detection/poseDetector';
import { Pose } from '@tensorflow-models/pose-detection';
import LandMarkCanvas from '@/app/shared/components/LandMarkCanvas/LandMarkCanvas';
import { PosePrediction, PosePredictor } from '@/app/pose_detection/posePredictor';
import { calculatePoseAngles } from './util/calculatePoseAngles';
import { PoseAngles } from './model/PoseAngles';
import AngleDiagram from './shared/components/AngleDiagram/AngleDiagram';
import { getPerfectPoseAngles } from './util/getPerfectPoseAngles';
import { flipPoseAngles } from './util/flipPoseAngles';
import { calculatePoseScore } from './util/calculatePoseAnglesScore';

export default function Pose() {
  const webcamRef = useRef<Webcam>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | undefined>(undefined);
  const [poseDetector, setPoseDetector] = useState<PoseDetector | undefined>(undefined);
  const [posePredictor, setPosePredictor] = useState<PosePredictor | undefined>(undefined);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [posePrediction, setPosePrediction] = useState<PosePrediction | undefined>(undefined);
  const [poseAngles, setPoseAngles] = useState<PoseAngles | undefined>(undefined);

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
            setPoseAngles(calculatePoseAngles(poses[0]));
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
    const poseAnglesFlipped = flipPoseAngles(poseAngles);
    const perfectAngles = getPerfectPoseAngles(posePrediction);
    const score1 = calculatePoseScore(poseAngles, perfectAngles);
    const score2 = calculatePoseScore(poseAnglesFlipped, perfectAngles);
    if (score1 > score2) {
      score = Math.round(score1);
    } else {
      score = Math.round(score1);
    }
  }
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
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
      </div>
      <div className="fixed top-0 left-10 text-6xl">{score}</div>
    </main>
  );
}
