import landmarkKeys from '@/app/assets/mediapipeIndexes/mediapipeIndexes.json';
export interface PoseAngle {
  landmarkKey: keyof typeof landmarkKeys;
  angle: number;
  visibilityScore?: number | undefined;
}
