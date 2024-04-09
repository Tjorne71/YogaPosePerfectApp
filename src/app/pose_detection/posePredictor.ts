import * as tmPose from '@teachablemachine/pose';
import { Camera } from './camera';

const URL = 'https://teachablemachine.withgoogle.com/models/Mhu-cJulf/';

export interface PosePrediction {
  className: string;
  probability: number;
}

export class PosePredictor {
  model?: tmPose.CustomPoseNet;
  maxPredictions: number;
  _camera: Camera | undefined;

  constructor() {
    this.model = undefined;
    this.maxPredictions = 0;
  }

  async init(webcamStream: MediaStream) {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    this._camera = await Camera.setup(webcamStream);

    this.model = await tmPose.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();
  }

  async predict(): Promise<PosePrediction | undefined> {
    if (!this._camera?.video) return;
    let predictions: PosePrediction[] = [];
    if (this.model != null) {
      const { pose, posenetOutput } = await this.model.estimatePose(this._camera.video);
      predictions = await this.model.predict(posenetOutput);
    }
    return this.getHighestProbabilityPose(predictions);
  }

  getHighestProbabilityPose(predictions: PosePrediction[]): PosePrediction | undefined {
    if (predictions.length === 0) return;
    let highestPrediction = predictions[0];
    console.log(predictions);
    for (const prediction of predictions) {
      if (prediction.probability > highestPrediction.probability) {
        highestPrediction = prediction;
      }
    }
    return {
      className: mapRawClassNameToClassName[highestPrediction.className],
      probability: highestPrediction.probability,
    };
  }
}

const mapRawClassNameToClassName: { [key: string]: string } = {
  'Downward-Facing Dog': 'Downward-Facing Dog',
  'Four-Limbed Staff': 'Four-Limbed Staff',
  'Tree Pose': 'Tree Pose',
  'Warrior 2': 'Warrior 2',
};
