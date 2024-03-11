import * as tmPose from '@teachablemachine/pose';
import warrior2 from '@/app/assets/warrior_2.svg'
import fourLimbedStaff from '@/app/assets/four_limbed_staff.svg'
import treePose from '@/app/assets/tree_pose.svg'
import downwardFacingDog from '@/app/assets/downward_facing_dog.svg'

const URL = "https://teachablemachine.withgoogle.com/models/FBlTxM2T3/";

interface PosePrediction {
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
  
  async predict(canvas : HTMLVideoElement) {
    let predictions : PosePrediction[] = [];
    if(this.model != null){
      const { posenetOutput } = await this.model.estimatePose(canvas);
      predictions = await this.model.predict(posenetOutput);
    }
    return predictions;
  }

  getHighestProbabilityPose(predictions : PosePrediction[]){
    let highestPrediction = predictions[0];
    for (const prediction of predictions) {
      if (prediction.probability > highestPrediction.probability) {
        highestPrediction = prediction;
      }
    }
    console.log(highestPrediction);
    switch (highestPrediction.className) {
      case 'Downward-Facing Dog':
        return downwardFacingDog;
      case 'Four-Limbed Staff':
        return fourLimbedStaff;
      case 'Tree Pose':
        return treePose;
      case 'Warrior 2':
        return warrior2;
    }
  }
}