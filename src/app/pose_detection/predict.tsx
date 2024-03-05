import * as tmPose from '@teachablemachine/pose';

const URL = "https://teachablemachine.withgoogle.com/models/Z0BykVMpn/";


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
    let predictions = [];
    if(this.model != null){
      const { posenetOutput } = await this.model.estimatePose(canvas);
  
      const prediction = await this.model.predict(posenetOutput);
      for (let i = 0; i < this.maxPredictions; i++) {
          const classPrediction =
              prediction[i].className + ": " + prediction[i].probability.toFixed(2);
              predictions.push(classPrediction);
              let element = document.getElementById("predictionText" + i);
              if(element != null) element.innerText = classPrediction;
      }
    }
    return predictions;
  }
}