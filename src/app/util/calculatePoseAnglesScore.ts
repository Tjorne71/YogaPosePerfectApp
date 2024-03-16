import { PoseAngles } from '../model/PoseAngles';
import { calculateAngleScore } from './calculateAngleScore';

export const calculatePoseScore = (recordedAngles: PoseAngles, perfectAngles: PoseAngles): number => {
  let totalScore: number = 0;
  let flippedScore: number = 0;
  let totalPossibleScore: number = 0;
  const threshold = 10;

  perfectAngles.angles.forEach((perfectAngle) => {
    const recordedAngle = recordedAngles.angles.find(
      (recordedAngle) => recordedAngle.landmarkKey === perfectAngle.landmarkKey
    );

    if (recordedAngle?.landmarkKey === 'left elbow') {
      console.log(recordedAngle.visibilityScore);
    }

    if (recordedAngle) {
      const angleScore = calculateAngleScore(recordedAngle.angle, perfectAngle.angle, threshold);
      totalScore += angleScore;
      totalPossibleScore += 100;
    }

    if (recordedAngles.flippedAngles) {
      const flippedAngle = recordedAngles.flippedAngles.find(
        (recordedAngle) => recordedAngle.landmarkKey === perfectAngle.landmarkKey
      );
      if (flippedAngle) {
        const angleScore = calculateAngleScore(flippedAngle.angle, perfectAngle.angle, threshold);
        flippedScore += angleScore;
      }
    }
  });

  if (totalScore > flippedScore) {
    return (totalScore / totalPossibleScore) * 100;
  }
  return (flippedScore / totalPossibleScore) * 100;
};
