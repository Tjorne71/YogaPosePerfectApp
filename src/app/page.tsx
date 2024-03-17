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
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Pose() {
  const webcamRef = useRef<Webcam>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | undefined>(undefined);
  const [poseDetector, setPoseDetector] = useState<PoseDetector | undefined>(undefined);
  const [posePredictor, setPosePredictor] = useState<PosePredictor | undefined>(undefined);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [posePrediction, setPosePrediction] = useState<PosePrediction | undefined>(undefined);
  const [isLandscape, setIsLandscape] = useState(false);
  const [loading, setLoading] = useState(true);
  const handle = useFullScreenHandle();

  useEffect(() => {
    const onResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    // Add event listener for resize
    window.addEventListener('resize', onResize);
    setIsLandscape(window.innerWidth > window.innerHeight);
    // Clean up
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    async function fetchCamera() {
      if (userMedia && document && poseDetector === undefined) {
        const poseDetector = new PoseDetector();
        const posePredictor = new PosePredictor();
        await poseDetector.init(userMedia);
        await posePredictor.init(userMedia);
        setPoseDetector(poseDetector);
        setPosePredictor(posePredictor);
        setLoading(false);
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
    if(isLandscape) handlePoseStream();
  }, [poseDetector, isLandscape]);

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
    if(isLandscape) handlePoseStream();
  }, [posePredictor, isLandscape]);

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
    <main className="overflow-hidden bg-gradient-to-r from-indigo-500 to-white2">
      {!isLandscape &&
        <div className='justify-center items-center h-screen w-screen absolute z-10 flex bg-white'>
          <p className='text-2xl text-black'>{loading ? "Loading ..." : "Please switch to landscape !"}</p>
        </div> 
      }
      <FullScreen handle={handle}>
        <div className={`flex overflow-hidden flex-col items-center justify-between h-screen w-screen`}>
          <Webcam
            id="video"
            className="relative h-full rounded-xl border-white border-4"
            ref={webcamRef}
            onUserMedia={(userMedia) => setUserMedia(userMedia)}
            mirrored
            videoConstraints={videoConstraints} />
          {webcamRef.current?.video && (
            <LandMarkCanvas
              className={`absolute -scale-x-100 h-full ${isLandscape ? "absolute" : "hidden"}`}
              poses={poses}
              posePrediction={posePrediction}
              video={webcamRef.current.video}
              canvasHeight={webcamRef.current.video.videoHeight}
              canvasWidth={webcamRef.current.video.videoWidth} />
          )}
        </div>
        <ScoreCircle score={score} className="fixed top-5 left-5" />
      </FullScreen>
      <button className='fixed top-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handle.enter}>Open Fullscreen</button>
    </main>
  );
}
