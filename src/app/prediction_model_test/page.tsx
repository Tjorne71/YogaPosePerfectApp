'use client';
import React, { useEffect, useState } from 'react';
import { PosePrediction, PosePredictor } from '../pose_detection/posePredictor';
import ImageAndPrediction from '../shared/components/ImageAndPrediction/ImageAndPrediction';
import testPoses from '@/app/assets/trainPoses.json';

interface PredictionResult {
  actualPose: string;
  pridictedPose: string;
}

interface PredictionResultCount extends PredictionResult {
  sum: number;
}

const poses = ['Downward-Facing Dog', 'Four-Limbed Staff', 'Tree Pose', 'Warrior 2'];

export default function PridictionModelTest() {
  const [correctPrediction, setCorrectPrediction] = useState(0);
  const [predictionResultsCount, setPredictionResultsCount] = useState<PredictionResultCount[]>([]);
  const [posePredictor, setPosePredictor] = useState<PosePredictor | undefined>(undefined);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  useEffect(() => {
    async function initializePosePredictor() {
      const newPosePredictor = new PosePredictor();
      await newPosePredictor.init();
      setPosePredictor(newPosePredictor);
    }
    initializePosePredictor();
  }, []);

  const importAll = (r: any) => {
    let images: { [key: string]: any } = {};
    r.keys().map((item: string, index: number) => {
      images[item.replace('./', '')] = r(item);
      return null;
    });
    return images;
  };

  const files = importAll(require.context('@/app/assets/trainImages', false, /\.(png|jpe?g|svg)$/));

  const handleNewPrediction = (prediction: PosePrediction, filename: String) => {
    const correct = testPoses.files.find((file) => file.filename === filename);
    if (correct) {
      const result: PredictionResult = { actualPose: correct.pose, pridictedPose: prediction.className };
      posePredictor;

      const foundEntreIndex = predictionResultsCount.findIndex(
        (resultCount) =>
          resultCount.actualPose === result.actualPose && resultCount.pridictedPose === result.pridictedPose
      );

      if (foundEntreIndex !== -1) {
        predictionResultsCount[foundEntreIndex] = {
          ...predictionResultsCount[foundEntreIndex],
          sum: predictionResultsCount[foundEntreIndex].sum + 1,
        };
        setPredictionResultsCount(predictionResultsCount);
      } else {
        const resultCount: PredictionResultCount = {
          actualPose: correct.pose,
          pridictedPose: prediction.className,
          sum: 1,
        };
        setPredictionResultsCount([...predictionResultsCount, resultCount]);
      }
      setCorrectPrediction(correctPrediction + 1);
    }
    setCurrentFileIndex(currentFileIndex + 1);
  };

  return (
    <div className="h-screen w-full">
      <h1>Files</h1>
      <div className=" w-1/2 h-1/2 mx-auto bg-slate-500 flex justify-center items-center z-20 relative">
        <div className="text-white bg-slate-900 rounded-full aspect-square h-24 flex justify-center items-center">
          {currentFileIndex} / {Object.keys(files).length}
        </div>
        {posePredictor && (
          <div className="absolute w-full h-full z-10 opacity-45">
            {currentFileIndex < Object.keys(files).length && (
              <ImageAndPrediction
                key={currentFileIndex}
                imageSrc={files[Object.keys(files)[currentFileIndex]].default}
                handleNewPrediction={handleNewPrediction}
                filename={Object.keys(files)[currentFileIndex]}
                posePredictor={posePredictor}
              />
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-5 grid-rows-5 h-1/2 w-1/2 mx-auto">
        {poses.map((actualPose) => (
          <>
            <div>{actualPose}</div>
            {poses.map((pridictedPose) => (
              <div key={actualPose + pridictedPose} className="flex flex-col justify-center">
                <span>
                  {predictionResultsCount.find(
                    (resultCount) =>
                      resultCount.actualPose === actualPose && resultCount.pridictedPose === pridictedPose
                  )?.sum || 0}
                </span>
                <span className="text-xs">
                  {actualPose} , {pridictedPose}
                </span>
              </div>
            ))}
          </>
        ))}
        <div></div>
        {poses.map((pridictedPose) => (
          <div key={pridictedPose + 'x'}> {pridictedPose}</div>
        ))}
      </div>
    </div>
  );
}
