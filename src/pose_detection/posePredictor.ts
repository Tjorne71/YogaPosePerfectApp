import * as tmPose from "@teachablemachine/pose";
import { Camera } from "./camera";

const URL = "https://teachablemachine.withgoogle.com/models/iKZuChygt/";
// const URL = "https://teachablemachine.withgoogle.com/models/Mhu-cJulf/";

export interface PosePrediction {
  className: string;
  probability: number;
}

export class PosePredictor {
  model?: tmPose.CustomPoseNet;
  maxPredictions: number;

  constructor() {
    this.model = undefined;
    this.maxPredictions = 0;
  }

  async init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    this.model = await tmPose.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();
  }

  async predictVideo(
    video: HTMLVideoElement
  ): Promise<PosePrediction | undefined> {
    let predictions: PosePrediction[] = [];
    if (this.model != null) {
      const { posenetOutput } = await this.model.estimatePose(video);
      predictions = await this.model.predict(posenetOutput);
    }
    return this.getHighestProbabilityPose(predictions);
  }

  async predictImage(
    image: HTMLImageElement
  ): Promise<PosePrediction | undefined> {
    let predictions: PosePrediction[] = [];
    if (this.model != null) {
      const { posenetOutput } = await this.model.estimatePose(image);
      predictions = await this.model.predict(posenetOutput);
    }
    return this.getHighestProbabilityPose(predictions);
  }

  getHighestProbabilityPose(
    predictions: PosePrediction[]
  ): PosePrediction | undefined {
    if (predictions.length === 0) return;
    let highestPrediction = predictions[0];
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
  "Downward-Facing Do...": "Downward-Facing Dog",
  "Four-Limbed Staff": "Four-Limbed Staff",
  "Tree Pose": "Tree Pose",
  "Warrior 2": "Warrior 2",
};
