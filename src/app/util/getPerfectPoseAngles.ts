import { PoseAngles } from '../model/PoseAngles';
import { PosePrediction } from '../pose_detection/posePredictor';

export const getPerfectPoseAngles = (posePrediction: PosePrediction): PoseAngles => {
  const defaultPose: PoseAngles = {
    leftKneeAngle: 0,
    rightKneeAngle: 0,
    leftHipAngle: 0,
    rightHipAngle: 0,
    leftShoulderAngle: 0,
    rightShoulderAngle: 0,
    leftElbowAngle: 0,
    rightElbowAngle: 0,
    leftAnkle: 0,
    rightAnkle: 0,
  };

  switch (posePrediction.className) {
    case 'Downward-Facing Dog':
      return defaultPose;
    case 'Four-Limbed Staff':
      return defaultPose;
    case 'Tree Pose':
      return {
        leftKneeAngle: 151,
        rightKneeAngle: 36,
        leftHipAngle: 173,
        rightHipAngle: 117,
        leftShoulderAngle: 0,
        rightShoulderAngle: 0,
        leftElbowAngle: 45,
        rightElbowAngle: 80,
        leftAnkle: 147,
        rightAnkle: 149,
      };
    default:
      return defaultPose;
  }
};
