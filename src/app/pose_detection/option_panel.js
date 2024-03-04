import * as posedetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import * as params from './params';
import * as dat from 'dat.gui';

export async function setupDatGui() {

  showBackendConfigs();
}

function showBackendConfigs() {
  params.STATE.model = posedetection.SupportedModels.BlazePose;
  const backends = params.MODEL_BACKEND_MAP[params.STATE.model];
  params.STATE.backend = backends[0]; // Default to the first backend, adjust as necessary
}

function addBlazePoseControllers(modelConfigFolder) {
  params.STATE.modelConfig = {...params.BLAZEPOSE_CONFIG};
  modelConfigFolder.add(params.STATE.modelConfig, 'type', ['lite', 'full', 'heavy']);
  modelConfigFolder.add(params.STATE.modelConfig, 'scoreThreshold', 0, 1);
}

// This function initializes the GUI for BlazePose configurations
export async function init() {
  const gui = await setupDatGui();
  const modelConfigFolder = gui.addFolder('BlazePose Configs');
  addBlazePoseControllers(modelConfigFolder);
  modelConfigFolder.open();
}
