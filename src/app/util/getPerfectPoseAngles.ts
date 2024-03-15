import { PoseAngles } from '../model/PoseAngles';
import { PosePrediction } from '../pose_detection/posePredictor';

export const getPerfectPoseAngles = (posePrediction: PosePrediction): PoseAngles => {
  const defaultPose: PoseAngles = {
    angles: [],
  };

  switch (posePrediction.className) {
    case 'Downward-Facing Dog':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 165,
          },
          {
            landmarkKey: 'right knee',
            angle: 165,
          },
          {
            landmarkKey: 'left hip',
            angle: 80,
          },
          {
            landmarkKey: 'right hip',
            angle: 80,
          },
          {
            landmarkKey: 'left elbow',
            angle: 135,
          },
          {
            landmarkKey: 'right elbow',
            angle: 135,
          },
          {
            landmarkKey: 'left ankle',
            angle: 85,
          },
          {
            landmarkKey: 'right ankle',
            angle: 85,
          },
        ],
      };
    case 'Four-Limbed Staff':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 165,
          },
          {
            landmarkKey: 'right knee',
            angle: 165,
          },
          {
            landmarkKey: 'left hip',
            angle: 168,
          },
          {
            landmarkKey: 'right hip',
            angle: 168,
          },
          {
            landmarkKey: 'left elbow',
            angle: 86,
          },
          {
            landmarkKey: 'right elbow',
            angle: 86,
          },
          {
            landmarkKey: 'left ankle',
            angle: 86,
          },
          {
            landmarkKey: 'right ankle',
            angle: 86,
          },
        ],
      };
    case 'Tree Pose':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 151,
          },
          {
            landmarkKey: 'right knee',
            angle: 36,
          },
          {
            landmarkKey: 'left hip',
            angle: 173,
          },
          {
            landmarkKey: 'right hip',
            angle: 117,
          },
          {
            landmarkKey: 'left elbow',
            angle: 173,
          },
          {
            landmarkKey: 'right elbow',
            angle: 117,
          },
          {
            landmarkKey: 'left ankle',
            angle: 173,
          },
          {
            landmarkKey: 'right ankle',
            angle: 117,
          },
        ],
      };
    case 'Warrior 2':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 120,
          },
          {
            landmarkKey: 'right knee',
            angle: 150,
          },
          {
            landmarkKey: 'left hip',
            angle: 90,
          },
          {
            landmarkKey: 'right hip',
            angle: 135,
          },
          {
            landmarkKey: 'left elbow',
            angle: 165,
          },
          {
            landmarkKey: 'right elbow',
            angle: 165,
          },
          {
            landmarkKey: 'left ankle',
            angle: 120,
          },
          {
            landmarkKey: 'right ankle',
            angle: 80,
          },
        ],
      };
    default:
      return defaultPose;
  }
};
