/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-webgpu';

import * as mpPose from '@mediapipe/pose';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import * as tf from '@tensorflow/tfjs-core';

tfjsWasm.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

import * as posedetection from '@tensorflow-models/pose-detection';

import { Camera } from './camera';
import { RendererCanvas2d } from './renderer_canvas2d';
import { STATE } from './params';
import { setupStats } from './stats_panel';
import { setBackendAndEnvFlags } from './util';
import { PosePredictor } from './predict';
import * as params from './params';
import warrior2 from '@/app/assets/warrior_2.svg'
import fourLimbedStaff from '@/app/assets/four_limbed_staff.svg'
import treePose from '@/app/assets/tree_pose.svg'
import downwardFacingDog from '@/app/assets/downward_facing_dog.svg'

let detector, camera, stats;
let startInferenceTime,
  numInferences = 0;
let inferenceTimeSum = 0,
  lastPanelUpdate = 0;
let rafId;
let renderer = null;
let posePredictor = null;
let lastPredictionTime = 0;

async function createDetector() {
  return posedetection.createDetector(posedetection.SupportedModels.BlazePose, {
    runtime: 'mediapipe',
    modelType: 'light',
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}`,
  });
}

async function checkGuiUpdate() {
  if (STATE.isTargetFPSChanged || STATE.isSizeOptionChanged) {
    camera = await Camera.setupCamera(STATE.camera);
    STATE.isTargetFPSChanged = false;
    STATE.isSizeOptionChanged = false;
  }

  if (STATE.isModelChanged || STATE.isFlagChanged || STATE.isBackendChanged) {
    STATE.isModelChanged = true;

    window.cancelAnimationFrame(rafId);

    if (detector != null) {
      detector.dispose();
    }

    if (STATE.isFlagChanged || STATE.isBackendChanged) {
      await setBackendAndEnvFlags(STATE.flags, STATE.backend);
    }

    try {
      detector = await createDetector(STATE.model);
    } catch (error) {
      detector = null;
      alert(error);
    }

    STATE.isFlagChanged = false;
    STATE.isBackendChanged = false;
    STATE.isModelChanged = false;
  }
}

function beginEstimatePosesStats() {
  startInferenceTime = (performance || Date).now();
}

function endEstimatePosesStats() {
  const endInferenceTime = (performance || Date).now();
  inferenceTimeSum += endInferenceTime - startInferenceTime;
  ++numInferences;

  const panelUpdateMilliseconds = 1000;
  if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
    const averageInferenceTime = inferenceTimeSum / numInferences;
    inferenceTimeSum = 0;
    numInferences = 0;
    stats.customFpsPanel.update(1000.0 / averageInferenceTime, 120 /* maxValue */);
    lastPanelUpdate = endInferenceTime;
  }
}

async function renderResult() {
  if (camera.video.readyState < 2) {
    await new Promise((resolve) => {
      camera.video.onloadeddata = () => {
        resolve(video);
      };
    });
  }

  let poses = null;

  // Detector can be null if initialization failed (for example when loading
  // from a URL that does not exist).
  if (detector != null) {
    // FPS only counts the time it takes to finish estimatePoses.
    beginEstimatePosesStats();
    // Detectors can throw errors, for example when using custom URLs that
    // contain a model that doesn't provide the expected output.
    try {
      poses = await detector.estimatePoses(camera.video, {
        maxPoses: STATE.modelConfig.maxPoses,
        flipHorizontal: false,
      });
    } catch (error) {
      detector.dispose();
      detector = null;
      alert(error);
    }
    
    // Check if a second has passed since the last prediction
    const currentTime = performance.now();
    if (currentTime - lastPredictionTime >= 1000) {
      const predictions = await posePredictor.predict(camera.video);
      const image = posePredictor.getHighestProbabilityPose(predictions);
      renderer.setOverlayImage(image.src, 400);
      lastPredictionTime = currentTime; // Update last prediction time
    }

    endEstimatePosesStats();
  }
  const rendererParams = [camera.video, poses, STATE.isModelChanged];
  renderer.draw(rendererParams);
}

async function renderPrediction() {
  await checkGuiUpdate();

  await renderResult();

  rafId = requestAnimationFrame(renderPrediction);
}

export async function app() {
  params.STATE.model = posedetection.SupportedModels.BlazePose;
  const backends = params.MODEL_BACKEND_MAP[params.STATE.model];
  params.STATE.backend = backends[0];

  stats = setupStats();

  camera = await Camera.setup(STATE.camera);

  await setBackendAndEnvFlags(STATE.flags, STATE.backend);
  await tf.ready();
  detector = await createDetector();
  const canvas = document.getElementById('output');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //canvas.width = camera.video.width;
  //canvas.height = camera.video.height;
  renderer = new RendererCanvas2d(canvas);

  posePredictor = new PosePredictor();
  await posePredictor.init();

  renderPrediction();
}

app();
