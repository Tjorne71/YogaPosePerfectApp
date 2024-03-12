import { PoseAngles } from '../model/PoseAngles';
import { angleScore } from './calculateAngleScore';

export const calculatePoseScore = (angles: PoseAngles, perfectAngles: PoseAngles): number => {
  const allAngleKeys: (keyof PoseAngles)[] = Object.keys(angles) as (keyof PoseAngles)[];

  let totalScore: number = 0;
  let totalPossibleScore: number = 0;

  allAngleKeys.forEach((key: keyof PoseAngles) => {
    const angle: number = angles[key];
    const perfectAngle: number | null = perfectAngles[key];

    const score: number = angleScore(angle, perfectAngle);
    totalScore += score;
    if (perfectAngle !== null) {
      totalPossibleScore += 100;
    }
  });

  return (totalScore / totalPossibleScore) * 100;
};
