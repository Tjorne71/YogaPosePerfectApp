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
            angle: 160,
          },
          {
            landmarkKey: 'right knee',
            angle: 160,
          },
          {
            landmarkKey: 'left hip',
            angle: 85,
          },
          {
            landmarkKey: 'right hip',
            angle: 85,
          },
          {
            landmarkKey: 'left elbow',
            angle: 135,
          },
          {
            landmarkKey: 'right elbow',
            angle: 135,
          },
          // {
          //   landmarkKey: 'left ankle',
          //   angle: 100,
          // },
          // {
          //   landmarkKey: 'right ankle',
          //   angle: 100,
          // },
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
          // {
          //   landmarkKey: 'left ankle',
          //   angle: 86,
          // },
          // {
          //   landmarkKey: 'right ankle',
          //   angle: 86,
          // },
        ],
      };
    case 'Tree Pose':
      return {
        angles: [
          {
            landmarkKey: 'left shoulder',
            angle: 165,
          },
          {
            landmarkKey: 'right shoulder',
            angle: 165,
          },
          {
            landmarkKey: 'left knee',
            angle: 160,
          },
          {
            landmarkKey: 'right knee',
            angle: 80,
          },
          {
            landmarkKey: 'left hip',
            angle: 170,
          },
          {
            landmarkKey: 'right hip',
            angle: 125,
          },
          {
            landmarkKey: 'left elbow',
            angle: 140,
          },
          {
            landmarkKey: 'right elbow',
            angle: 140,
          },
          // {
          //   landmarkKey: 'right ankle',
          //   angle: 125,
          // },
          // {
          //   landmarkKey: 'left ankle',
          //   angle: 125,
          // },
        ],
      };
    case 'Warrior 2':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 150,
          },
          {
            landmarkKey: 'right knee',
            angle: 110,
          },
          {
            landmarkKey: 'left hip',
            angle: 130,
          },
          {
            landmarkKey: 'right hip',
            angle: 100,
          },
          {
            landmarkKey: 'left elbow',
            angle: 165,
          },
          {
            landmarkKey: 'right elbow',
            angle: 165,
          },
          // {
          //   landmarkKey: 'left ankle',
          //   angle: 65,
          // },
          // {
          //   landmarkKey: 'right ankle',
          //   angle: 95,
          // },
        ],
      };
    default:
      return defaultPose;
  }
};
