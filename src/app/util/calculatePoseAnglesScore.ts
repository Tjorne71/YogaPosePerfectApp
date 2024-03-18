import { PoseAngles } from '../model/PoseAngles';
import { calculateLandmarkScore } from './calculateLandmarkScore';

export const calculatePoseScore = (recordedAngles: PoseAngles, perfectAngles: PoseAngles): number => {
  let totalScore: number = 0;
  let flippedScore: number = 0;
  let totalPossibleScore: number = 0;

  perfectAngles.angles.forEach((perfectAngle) => {
    const recordedAngle = recordedAngles.angles.find(
      (recordedAngle) => recordedAngle.landmarkKey === perfectAngle.landmarkKey
    );

    if (recordedAngle) {
      const angleScore = calculateLandmarkScore(recordedAngle.angle, perfectAngle.angle, 5, 20);
      totalScore += angleScore;
      totalPossibleScore += 100;
    }

    if (recordedAngles.flippedAngles) {
      const flippedAngle = recordedAngles.flippedAngles.find(
        (recordedAngle) => recordedAngle.landmarkKey === perfectAngle.landmarkKey
      );
      if (flippedAngle) {
        const angleScore = calculateLandmarkScore(flippedAngle.angle, perfectAngle.angle, 5, 20);
        flippedScore += angleScore;
      }
    }
  });

  if (totalScore > flippedScore) {
    return (totalScore / totalPossibleScore) * 100;
  }
  return (flippedScore / totalPossibleScore) * 100;
};
