import { PoseAngles } from '../model/PoseAngles';

export function flipPoseAngles(angles: PoseAngles): PoseAngles {
  return {
    leftKneeAngle: angles.rightKneeAngle,
    rightKneeAngle: angles.leftKneeAngle,
    leftHipAngle: angles.rightHipAngle,
    rightHipAngle: angles.leftHipAngle,
    leftShoulderAngle: angles.rightShoulderAngle,
    rightShoulderAngle: angles.leftShoulderAngle,
    leftElbowAngle: angles.rightElbowAngle,
    rightElbowAngle: angles.leftElbowAngle,
    leftAnkle: angles.rightAnkle,
    rightAnkle: angles.leftAnkle,
  };
}
