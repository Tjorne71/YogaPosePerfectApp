import * as posedetection from '@tensorflow-models/pose-detection';

export const STATE: {
  camera: { targetFPS: number; sizeOption: string };
  backend: string;
  flags: {};
  modelConfig: {};
  model: posedetection.SupportedModels;
} = {
  camera: { targetFPS: 60, sizeOption: '640 X 480' },
  backend: '',
  flags: {},
  modelConfig: {},
  model: posedetection.SupportedModels.BlazePose,
};
