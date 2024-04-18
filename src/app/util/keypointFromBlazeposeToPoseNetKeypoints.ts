import { Keypoint as PoseNetKeypoint } from '@tensorflow-models/posenet';
import { Keypoint as BlazePoseKeypoint } from '@tensorflow-models/pose-detection';

const keypointMapper = {
  0: 0, // nose remains the same
  1: 2, // left_eye
  2: 5, // right_eye
  3: 7, // left_ear
  4: 8, // right_ear
  5: 11, // left_shoulder
  6: 12, // right_shoulder
  7: 13, // left_elbow
  8: 14, // right_elbow
  9: 15, // left_wrist
  10: 16, // right_wrist
  11: 23, // left_hip
  12: 24, // right_hip
  13: 25, // left_knee
  14: 26, // right_knee
  15: 27, // left_ankle
  16: 28, // right_ankle
};

export function keypointFromBlazeposeToPoseNetKeypoints(keypoints: BlazePoseKeypoint[]): PoseNetKeypoint[] {
  const output: PoseNetKeypoint[] = [];

  Object.entries(keypointMapper).map(([poseNetIndex, blazePoseIndex]) => {
    const keypoint = keypoints[blazePoseIndex];

    const poseNetKeypoint = {
      position: {
        x: keypoint.x,
        y: keypoint.y,
      },
      score: keypoint.score ?? 0,
      part: keypoint.name ?? '',
    };
    output.push(poseNetKeypoint);
  });

  return output;
}
