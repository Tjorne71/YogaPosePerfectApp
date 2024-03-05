import * as posedetection from '@tensorflow-models/pose-detection';
import { isiOS } from './util';

export const DEFAULT_LINE_WIDTH: number = 2;
export const DEFAULT_RADIUS: number = 4;

export const VIDEO_SIZE: { [key: string]: { width: number; height: number } } = {
  '640 X 480': { width: 640, height: 480 },
  '640 X 360': { width: 640, height: 360 },
  '360 X 270': { width: 360, height: 270 },
};

export const STATE: { camera: { targetFPS: number; sizeOption: string }; backend: string; flags: {}; modelConfig: {} } =
  {
    camera: { targetFPS: 60, sizeOption: '640 X 480' },
    backend: '',
    flags: {},
    modelConfig: {},
  };

export const BLAZEPOSE_CONFIG: { maxPoses: number; type: string; scoreThreshold: number; render3D: boolean } = {
  maxPoses: 1,
  type: 'full',
  scoreThreshold: 0.65,
  render3D: true,
};

export const TUNABLE_FLAG_VALUE_RANGE_MAP: { [key: string]: (boolean | number)[] } = {
  WEBGL_VERSION: [1, 2],
  WASM_HAS_SIMD_SUPPORT: [true, false],
  WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
  WEBGL_CPU_FORWARD: [true, false],
  WEBGL_PACK: [true, false],
  WEBGL_FORCE_F16_TEXTURES: [true, false],
  WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
  WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  CHECK_COMPUTATION_FOR_ERRORS: [true, false],
};

export const BACKEND_FLAGS_MAP: { [key: string]: string[] } = {
  'tfjs-wasm': ['WASM_HAS_SIMD_SUPPORT', 'WASM_HAS_MULTITHREAD_SUPPORT'],
  'tfjs-webgl': [
    'WEBGL_VERSION',
    'WEBGL_CPU_FORWARD',
    'WEBGL_PACK',
    'WEBGL_FORCE_F16_TEXTURES',
    'WEBGL_RENDER_FLOAT32_CAPABLE',
    'WEBGL_FLUSH_THRESHOLD',
  ],
  'tfjs-webgpu': [],
  'mediapipe-gpu': [],
};

export const MODEL_BACKEND_MAP: { [key: string]: string[] } = {
  [posedetection.SupportedModels.PoseNet]: ['tfjs-webgl', 'tfjs-webgpu'],
  [posedetection.SupportedModels.MoveNet]: ['tfjs-webgl', 'tfjs-wasm', 'tfjs-webgpu'],
  [posedetection.SupportedModels.BlazePose]: ['mediapipe-gpu', 'tfjs-webgl', 'tfjs-webgpu'],
};

export const TUNABLE_FLAG_NAME_MAP: { [key: string]: string } = {
  PROD: 'production mode',
  WEBGL_VERSION: 'webgl version',
  WASM_HAS_SIMD_SUPPORT: 'wasm SIMD',
  WASM_HAS_MULTITHREAD_SUPPORT: 'wasm multithread',
  WEBGL_CPU_FORWARD: 'cpu forward',
  WEBGL_PACK: 'webgl pack',
  WEBGL_FORCE_F16_TEXTURES: 'enforce float16',
  WEBGL_RENDER_FLOAT32_CAPABLE: 'enable float32',
  WEBGL_FLUSH_THRESHOLD: 'GL flush wait time(ms)',
};
