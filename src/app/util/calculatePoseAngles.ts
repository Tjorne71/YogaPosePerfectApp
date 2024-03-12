import { Pose } from '@tensorflow-models/pose-detection/dist/types';
import { PoseAngles } from '@/app/model/PoseAngles';
import { calculateAngle } from './calculateAngle';
import landmarkIndexes from '@/app/assets/mediapipeIndexes/mediapipeIndexes.json';

export function calculatePoseAngles(pose: Pose): PoseAngles {
  const keypoints = pose.keypoints3D || pose.keypoints;
  return {
    leftElbowAngle: calculateAngle(
      keypoints[landmarkIndexes['left wrist']],
      keypoints[landmarkIndexes['left elbow']],
      keypoints[landmarkIndexes['left shoulder']]
    ),
    rightElbowAngle: calculateAngle(
      keypoints[landmarkIndexes['right wrist']],
      keypoints[landmarkIndexes['right elbow']],
      keypoints[landmarkIndexes['right shoulder']]
    ),
    leftHipAngle: calculateAngle(
      keypoints[landmarkIndexes['left knee']],
      keypoints[landmarkIndexes['left hip']],
      keypoints[landmarkIndexes['left shoulder']]
    ),
    rightHipAngle: calculateAngle(
      keypoints[landmarkIndexes['right knee']],
      keypoints[landmarkIndexes['right hip']],
      keypoints[landmarkIndexes['right shoulder']]
    ),
    leftKneeAngle: calculateAngle(
      keypoints[landmarkIndexes['left hip']],
      keypoints[landmarkIndexes['left knee']],
      keypoints[landmarkIndexes['left ankle']]
    ),
    rightKneeAngle: calculateAngle(
      keypoints[landmarkIndexes['right hip']],
      keypoints[landmarkIndexes['right knee']],
      keypoints[landmarkIndexes['right ankle']]
    ),
    leftShoulderAngle: calculateAngle(
      keypoints[landmarkIndexes['left hip']],
      keypoints[landmarkIndexes['left shoulder']],
      keypoints[landmarkIndexes['left elbow']]
    ),
    rightShoulderAngle: calculateAngle(
      keypoints[landmarkIndexes['right hip']],
      keypoints[landmarkIndexes['right shoulder']],
      keypoints[landmarkIndexes['right elbow']]
    ),
    leftAnkle: calculateAngle(
      keypoints[landmarkIndexes['left knee']],
      keypoints[landmarkIndexes['left ankle']],
      keypoints[landmarkIndexes['left foot index']]
    ),
    rightAnkle: calculateAngle(
      keypoints[landmarkIndexes['right knee']],
      keypoints[landmarkIndexes['right ankle']],
      keypoints[landmarkIndexes['right foot index']]
    ),
  };
}
