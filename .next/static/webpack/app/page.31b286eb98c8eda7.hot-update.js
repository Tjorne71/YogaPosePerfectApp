"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/pose_detection/index.js":
/*!*****************************************!*\
  !*** ./src/app/pose_detection/index.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: function() { return /* binding */ app; }\n/* harmony export */ });\n/* harmony import */ var _tensorflow_tfjs_backend_webgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tensorflow/tfjs-backend-webgl */ \"(app-pages-browser)/./node_modules/@tensorflow/tfjs-backend-webgl/dist/index.js\");\n/* harmony import */ var _tensorflow_tfjs_backend_webgpu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tensorflow/tfjs-backend-webgpu */ \"(app-pages-browser)/./node_modules/@tensorflow/tfjs-backend-webgpu/dist/index.js\");\n/* harmony import */ var _mediapipe_pose__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mediapipe/pose */ \"(app-pages-browser)/./node_modules/@mediapipe/pose/pose.js\");\n/* harmony import */ var _mediapipe_pose__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mediapipe_pose__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _tensorflow_tfjs_backend_wasm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tensorflow/tfjs-backend-wasm */ \"(app-pages-browser)/./node_modules/@tensorflow/tfjs-backend-wasm/dist/index.js\");\n/* harmony import */ var _tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tensorflow/tfjs-core */ \"(app-pages-browser)/./node_modules/@tensorflow/tfjs-core/dist/index.js\");\n/* harmony import */ var _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tensorflow-models/pose-detection */ \"(app-pages-browser)/./node_modules/@tensorflow-models/pose-detection/dist/pose-detection.esm.js\");\n/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./camera */ \"(app-pages-browser)/./src/app/pose_detection/camera.js\");\n/* harmony import */ var _renderer_webgpu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renderer_webgpu */ \"(app-pages-browser)/./src/app/pose_detection/renderer_webgpu.js\");\n/* harmony import */ var _renderer_canvas2d__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./renderer_canvas2d */ \"(app-pages-browser)/./src/app/pose_detection/renderer_canvas2d.js\");\n/* harmony import */ var _option_panel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./option_panel */ \"(app-pages-browser)/./src/app/pose_detection/option_panel.js\");\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./params */ \"(app-pages-browser)/./src/app/pose_detection/params.js\");\n/* harmony import */ var _stats_panel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stats_panel */ \"(app-pages-browser)/./src/app/pose_detection/stats_panel.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./util */ \"(app-pages-browser)/./src/app/pose_detection/util.js\");\n/**\n * @license\n * Copyright 2021 Google LLC. All Rights Reserved.\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * https://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n * =============================================================================\n */ \n\n\n\n\n_tensorflow_tfjs_backend_wasm__WEBPACK_IMPORTED_MODULE_2__.setWasmPaths(\"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@\".concat(_tensorflow_tfjs_backend_wasm__WEBPACK_IMPORTED_MODULE_2__.version_wasm, \"/dist/\"));\n\n\n\n\n\n\n\n\n\nlet detector, camera, stats;\nlet startInferenceTime, numInferences = 0;\nlet inferenceTimeSum = 0, lastPanelUpdate = 0;\nlet rafId;\nlet renderer = null;\nlet useGpuRenderer = false;\nasync function createDetector() {\n    switch(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model){\n        case _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.SupportedModels.PoseNet:\n            return _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.createDetector(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model, {\n                quantBytes: 4,\n                architecture: \"MobileNetV1\",\n                outputStride: 16,\n                inputResolution: {\n                    width: 500,\n                    height: 500\n                },\n                multiplier: 0.75\n            });\n        case _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.SupportedModels.BlazePose:\n            const runtime = _params__WEBPACK_IMPORTED_MODULE_9__.STATE.backend.split(\"-\")[0];\n            if (runtime === \"mediapipe\") {\n                return _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.createDetector(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model, {\n                    runtime,\n                    modelType: _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.type,\n                    solutionPath: \"https://cdn.jsdelivr.net/npm/@mediapipe/pose@\".concat(_mediapipe_pose__WEBPACK_IMPORTED_MODULE_12__.VERSION)\n                });\n            } else if (runtime === \"tfjs\") {\n                return _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.createDetector(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model, {\n                    runtime,\n                    modelType: _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.type\n                });\n            }\n        case _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.SupportedModels.MoveNet:\n            let modelType;\n            if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.type == \"lightning\") {\n                modelType = _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.movenet.modelType.SINGLEPOSE_LIGHTNING;\n            } else if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.type == \"thunder\") {\n                modelType = _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.movenet.modelType.SINGLEPOSE_THUNDER;\n            } else if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.type == \"multipose\") {\n                modelType = _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.movenet.modelType.MULTIPOSE_LIGHTNING;\n            }\n            const modelConfig = {\n                modelType\n            };\n            if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.customModel !== \"\") {\n                modelConfig.modelUrl = _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.customModel;\n            }\n            if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.type === \"multipose\") {\n                modelConfig.enableTracking = _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.enableTracking;\n            }\n            return _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.createDetector(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model, modelConfig);\n    }\n}\nasync function checkGuiUpdate() {\n    if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.isTargetFPSChanged || _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isSizeOptionChanged) {\n        camera = await _camera__WEBPACK_IMPORTED_MODULE_5__.Camera.setupCamera(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.camera);\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isTargetFPSChanged = false;\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isSizeOptionChanged = false;\n    }\n    if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.isModelChanged || _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isFlagChanged || _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isBackendChanged) {\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isModelChanged = true;\n        window.cancelAnimationFrame(rafId);\n        if (detector != null) {\n            detector.dispose();\n        }\n        if (_params__WEBPACK_IMPORTED_MODULE_9__.STATE.isFlagChanged || _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isBackendChanged) {\n            await (0,_util__WEBPACK_IMPORTED_MODULE_11__.setBackendAndEnvFlags)(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.flags, _params__WEBPACK_IMPORTED_MODULE_9__.STATE.backend);\n        }\n        try {\n            detector = await createDetector(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model);\n        } catch (error) {\n            detector = null;\n            alert(error);\n        }\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isFlagChanged = false;\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isBackendChanged = false;\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isModelChanged = false;\n    }\n}\nfunction beginEstimatePosesStats() {\n    startInferenceTime = (performance || Date).now();\n}\nfunction endEstimatePosesStats() {\n    const endInferenceTime = (performance || Date).now();\n    inferenceTimeSum += endInferenceTime - startInferenceTime;\n    ++numInferences;\n    const panelUpdateMilliseconds = 1000;\n    if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {\n        const averageInferenceTime = inferenceTimeSum / numInferences;\n        inferenceTimeSum = 0;\n        numInferences = 0;\n        stats.customFpsPanel.update(1000.0 / averageInferenceTime, 120 /* maxValue */ );\n        lastPanelUpdate = endInferenceTime;\n    }\n}\nasync function renderResult() {\n    if (camera.video.readyState < 2) {\n        await new Promise((resolve)=>{\n            camera.video.onloadeddata = ()=>{\n                resolve(video);\n            };\n        });\n    }\n    let poses = null;\n    let canvasInfo = null;\n    // Detector can be null if initialization failed (for example when loading\n    // from a URL that does not exist).\n    if (detector != null) {\n        // FPS only counts the time it takes to finish estimatePoses.\n        beginEstimatePosesStats();\n        if (useGpuRenderer && _params__WEBPACK_IMPORTED_MODULE_9__.STATE.model !== \"PoseNet\") {\n            throw new Error(\"Only PoseNet supports GPU renderer!\");\n        }\n        // Detectors can throw errors, for example when using custom URLs that\n        // contain a model that doesn't provide the expected output.\n        try {\n            if (useGpuRenderer) {\n                const [posesTemp, canvasInfoTemp] = await detector.estimatePosesGPU(camera.video, {\n                    maxPoses: _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.maxPoses,\n                    flipHorizontal: false\n                }, true);\n                poses = posesTemp;\n                canvasInfo = canvasInfoTemp;\n            } else {\n                poses = await detector.estimatePoses(camera.video, {\n                    maxPoses: _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.maxPoses,\n                    flipHorizontal: false\n                });\n            }\n        } catch (error) {\n            detector.dispose();\n            detector = null;\n            alert(error);\n        }\n        endEstimatePosesStats();\n    }\n    const rendererParams = useGpuRenderer ? [\n        camera.video,\n        poses,\n        canvasInfo,\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.modelConfig.scoreThreshold\n    ] : [\n        camera.video,\n        poses,\n        _params__WEBPACK_IMPORTED_MODULE_9__.STATE.isModelChanged\n    ];\n    renderer.draw(rendererParams);\n}\nasync function renderPrediction() {\n    await checkGuiUpdate();\n    if (!_params__WEBPACK_IMPORTED_MODULE_9__.STATE.isModelChanged) {\n        await renderResult();\n    }\n    rafId = requestAnimationFrame(renderPrediction);\n}\n;\nasync function app() {\n    // Gui content will change depending on which model is in the query string.\n    const urlParams = new URLSearchParams(window.location.search);\n    _params__WEBPACK_IMPORTED_MODULE_9__.STATE.model = _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_4__.SupportedModels.BlazePose;\n    const backends = _params__WEBPACK_IMPORTED_MODULE_9__.MODEL_BACKEND_MAP[_params__WEBPACK_IMPORTED_MODULE_9__.STATE.model];\n    _params__WEBPACK_IMPORTED_MODULE_9__.STATE.backend = backends[0];\n    stats = (0,_stats_panel__WEBPACK_IMPORTED_MODULE_10__.setupStats)();\n    const isWebGPU = _params__WEBPACK_IMPORTED_MODULE_9__.STATE.backend === \"tfjs-webgpu\";\n    const importVideo = urlParams.get(\"importVideo\") === \"true\" && isWebGPU;\n    camera = await _camera__WEBPACK_IMPORTED_MODULE_5__.Camera.setup(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.camera);\n    await (0,_util__WEBPACK_IMPORTED_MODULE_11__.setBackendAndEnvFlags)(_params__WEBPACK_IMPORTED_MODULE_9__.STATE.flags, _params__WEBPACK_IMPORTED_MODULE_9__.STATE.backend);\n    await _tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_3__.ready();\n    detector = await createDetector();\n    const canvas = document.getElementById(\"output\");\n    canvas.width = camera.video.width;\n    canvas.height = camera.video.height;\n    useGpuRenderer = urlParams.get(\"gpuRenderer\") === \"true\" && isWebGPU;\n    if (useGpuRenderer) {\n        renderer = new _renderer_webgpu__WEBPACK_IMPORTED_MODULE_6__.RendererWebGPU(canvas, importVideo);\n    } else {\n        renderer = new _renderer_canvas2d__WEBPACK_IMPORTED_MODULE_7__.RendererCanvas2d(canvas);\n    }\n    renderPrediction();\n}\n;\napp();\nif (useGpuRenderer) {\n    renderer.dispose();\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcG9zZV9kZXRlY3Rpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztDQWVDLEdBRXVDO0FBQ0M7QUFFQztBQUNnQjtBQUNkO0FBRTVDQyx1RUFBcUIsQ0FDakIsOERBQzBCLE9BQXRCQSx1RUFBcUIsRUFBQztBQUVxQztBQUVuQztBQUNpQjtBQUNJO0FBQ1Y7QUFDWjtBQUNVO0FBQ0k7QUFDVjtBQUduQyxJQUFJYSxVQUFVQyxRQUFRQztBQUN0QixJQUFJQyxvQkFBb0JDLGdCQUFnQjtBQUN4QyxJQUFJQyxtQkFBbUIsR0FBR0Msa0JBQWtCO0FBQzVDLElBQUlDO0FBQ0osSUFBSUMsV0FBVztBQUNmLElBQUlDLGlCQUFpQjtBQUVyQixlQUFlQztJQUNiLE9BQVFkLDBDQUFLQSxDQUFDZSxLQUFLO1FBQ2pCLEtBQUtwQiw4RUFBNkIsQ0FBQ3NCLE9BQU87WUFDeEMsT0FBT3RCLDZFQUE0QixDQUFDSywwQ0FBS0EsQ0FBQ2UsS0FBSyxFQUFFO2dCQUMvQ0csWUFBWTtnQkFDWkMsY0FBYztnQkFDZEMsY0FBYztnQkFDZEMsaUJBQWlCO29CQUFDQyxPQUFPO29CQUFLQyxRQUFRO2dCQUFHO2dCQUN6Q0MsWUFBWTtZQUNkO1FBQ0YsS0FBSzdCLDhFQUE2QixDQUFDOEIsU0FBUztZQUMxQyxNQUFNQyxVQUFVMUIsMENBQUtBLENBQUMyQixPQUFPLENBQUNDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQyxJQUFJRixZQUFZLGFBQWE7Z0JBQzNCLE9BQU8vQiw2RUFBNEIsQ0FBQ0ssMENBQUtBLENBQUNlLEtBQUssRUFBRTtvQkFDL0NXO29CQUNBRyxXQUFXN0IsMENBQUtBLENBQUM4QixXQUFXLENBQUNDLElBQUk7b0JBQ2pDQyxjQUNJLGdEQUErRCxPQUFmMUMscURBQWM7Z0JBQ3BFO1lBQ0YsT0FBTyxJQUFJb0MsWUFBWSxRQUFRO2dCQUM3QixP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LE1BQU0sR0FBR2xCLE9BQU82RCxLQUFLLENBQUMzQyxNQUFNO0lBQ25DVixpQkFBaUIsVUFBV2lGLEdBQUcsQ0FBQyxtQkFBbUIsVUFBV0Y7SUFDOUQsSUFBSS9FLGdCQUFnQjtRQUNsQkQsV0FBVyxJQUFJZiw0REFBY0EsQ0FBQ29HLFFBQVFKO0lBQ3hDLE9BQU87UUFDTGpGLFdBQVcsSUFBSWQsZ0VBQWdCQSxDQUFDbUc7SUFDbEM7SUFFQWQ7QUFDRjs7QUFFQUU7QUFFQSxJQUFJeEUsZ0JBQWdCO0lBQ2xCRCxTQUFTdUMsT0FBTztBQUNsQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3Bvc2VfZGV0ZWN0aW9uL2luZGV4LmpzPzliMjAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwczovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0ICdAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2ViZ2wnO1xuaW1wb3J0ICdAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2ViZ3B1JztcblxuaW1wb3J0ICogYXMgbXBQb3NlIGZyb20gJ0BtZWRpYXBpcGUvcG9zZSc7XG5pbXBvcnQgKiBhcyB0ZmpzV2FzbSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2FzbSc7XG5pbXBvcnQgKiBhcyB0ZiBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG50ZmpzV2FzbS5zZXRXYXNtUGF0aHMoXG4gICAgYGh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQHRlbnNvcmZsb3cvdGZqcy1iYWNrZW5kLXdhc21AJHtcbiAgICAgICAgdGZqc1dhc20udmVyc2lvbl93YXNtfS9kaXN0L2ApO1xuXG5pbXBvcnQgKiBhcyBwb3NlZGV0ZWN0aW9uIGZyb20gJ0B0ZW5zb3JmbG93LW1vZGVscy9wb3NlLWRldGVjdGlvbic7XG5cbmltcG9ydCB7Q2FtZXJhfSBmcm9tICcuL2NhbWVyYSc7XG5pbXBvcnQge1JlbmRlcmVyV2ViR1BVfSBmcm9tICcuL3JlbmRlcmVyX3dlYmdwdSc7XG5pbXBvcnQge1JlbmRlcmVyQ2FudmFzMmR9IGZyb20gJy4vcmVuZGVyZXJfY2FudmFzMmQnO1xuaW1wb3J0IHtzZXR1cERhdEd1aX0gZnJvbSAnLi9vcHRpb25fcGFuZWwnO1xuaW1wb3J0IHtTVEFURX0gZnJvbSAnLi9wYXJhbXMnO1xuaW1wb3J0IHtzZXR1cFN0YXRzfSBmcm9tICcuL3N0YXRzX3BhbmVsJztcbmltcG9ydCB7c2V0QmFja2VuZEFuZEVudkZsYWdzfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0ICogYXMgcGFyYW1zIGZyb20gJy4vcGFyYW1zJztcblxuXG5sZXQgZGV0ZWN0b3IsIGNhbWVyYSwgc3RhdHM7XG5sZXQgc3RhcnRJbmZlcmVuY2VUaW1lLCBudW1JbmZlcmVuY2VzID0gMDtcbmxldCBpbmZlcmVuY2VUaW1lU3VtID0gMCwgbGFzdFBhbmVsVXBkYXRlID0gMDtcbmxldCByYWZJZDtcbmxldCByZW5kZXJlciA9IG51bGw7XG5sZXQgdXNlR3B1UmVuZGVyZXIgPSBmYWxzZTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRGV0ZWN0b3IoKSB7XG4gIHN3aXRjaCAoU1RBVEUubW9kZWwpIHtcbiAgICBjYXNlIHBvc2VkZXRlY3Rpb24uU3VwcG9ydGVkTW9kZWxzLlBvc2VOZXQ6XG4gICAgICByZXR1cm4gcG9zZWRldGVjdGlvbi5jcmVhdGVEZXRlY3RvcihTVEFURS5tb2RlbCwge1xuICAgICAgICBxdWFudEJ5dGVzOiA0LFxuICAgICAgICBhcmNoaXRlY3R1cmU6ICdNb2JpbGVOZXRWMScsXG4gICAgICAgIG91dHB1dFN0cmlkZTogMTYsXG4gICAgICAgIGlucHV0UmVzb2x1dGlvbjoge3dpZHRoOiA1MDAsIGhlaWdodDogNTAwfSxcbiAgICAgICAgbXVsdGlwbGllcjogMC43NVxuICAgICAgfSk7XG4gICAgY2FzZSBwb3NlZGV0ZWN0aW9uLlN1cHBvcnRlZE1vZGVscy5CbGF6ZVBvc2U6XG4gICAgICBjb25zdCBydW50aW1lID0gU1RBVEUuYmFja2VuZC5zcGxpdCgnLScpWzBdO1xuICAgICAgaWYgKHJ1bnRpbWUgPT09ICdtZWRpYXBpcGUnKSB7XG4gICAgICAgIHJldHVybiBwb3NlZGV0ZWN0aW9uLmNyZWF0ZURldGVjdG9yKFNUQVRFLm1vZGVsLCB7XG4gICAgICAgICAgcnVudGltZSxcbiAgICAgICAgICBtb2RlbFR5cGU6IFNUQVRFLm1vZGVsQ29uZmlnLnR5cGUsXG4gICAgICAgICAgc29sdXRpb25QYXRoOlxuICAgICAgICAgICAgICBgaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9AbWVkaWFwaXBlL3Bvc2VAJHttcFBvc2UuVkVSU0lPTn1gXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChydW50aW1lID09PSAndGZqcycpIHtcbiAgICAgICAgcmV0dXJuIHBvc2VkZXRlY3Rpb24uY3JlYXRlRGV0ZWN0b3IoXG4gICAgICAgICAgICBTVEFURS5tb2RlbCwge3J1bnRpbWUsIG1vZGVsVHlwZTogU1RBVEUubW9kZWxDb25maWcudHlwZX0pO1xuICAgICAgfVxuICAgIGNhc2UgcG9zZWRldGVjdGlvbi5TdXBwb3J0ZWRNb2RlbHMuTW92ZU5ldDpcbiAgICAgIGxldCBtb2RlbFR5cGU7XG4gICAgICBpZiAoU1RBVEUubW9kZWxDb25maWcudHlwZSA9PSAnbGlnaHRuaW5nJykge1xuICAgICAgICBtb2RlbFR5cGUgPSBwb3NlZGV0ZWN0aW9uLm1vdmVuZXQubW9kZWxUeXBlLlNJTkdMRVBPU0VfTElHSFROSU5HO1xuICAgICAgfSBlbHNlIGlmIChTVEFURS5tb2RlbENvbmZpZy50eXBlID09ICd0aHVuZGVyJykge1xuICAgICAgICBtb2RlbFR5cGUgPSBwb3NlZGV0ZWN0aW9uLm1vdmVuZXQubW9kZWxUeXBlLlNJTkdMRVBPU0VfVEhVTkRFUjtcbiAgICAgIH0gZWxzZSBpZiAoU1RBVEUubW9kZWxDb25maWcudHlwZSA9PSAnbXVsdGlwb3NlJykge1xuICAgICAgICBtb2RlbFR5cGUgPSBwb3NlZGV0ZWN0aW9uLm1vdmVuZXQubW9kZWxUeXBlLk1VTFRJUE9TRV9MSUdIVE5JTkc7XG4gICAgICB9XG4gICAgICBjb25zdCBtb2RlbENvbmZpZyA9IHttb2RlbFR5cGV9O1xuXG4gICAgICBpZiAoU1RBVEUubW9kZWxDb25maWcuY3VzdG9tTW9kZWwgIT09ICcnKSB7XG4gICAgICAgIG1vZGVsQ29uZmlnLm1vZGVsVXJsID0gU1RBVEUubW9kZWxDb25maWcuY3VzdG9tTW9kZWw7XG4gICAgICB9XG4gICAgICBpZiAoU1RBVEUubW9kZWxDb25maWcudHlwZSA9PT0gJ211bHRpcG9zZScpIHtcbiAgICAgICAgbW9kZWxDb25maWcuZW5hYmxlVHJhY2tpbmcgPSBTVEFURS5tb2RlbENvbmZpZy5lbmFibGVUcmFja2luZztcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb3NlZGV0ZWN0aW9uLmNyZWF0ZURldGVjdG9yKFNUQVRFLm1vZGVsLCBtb2RlbENvbmZpZyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tHdWlVcGRhdGUoKSB7XG4gIGlmIChTVEFURS5pc1RhcmdldEZQU0NoYW5nZWQgfHwgU1RBVEUuaXNTaXplT3B0aW9uQ2hhbmdlZCkge1xuICAgIGNhbWVyYSA9IGF3YWl0IENhbWVyYS5zZXR1cENhbWVyYShTVEFURS5jYW1lcmEpO1xuICAgIFNUQVRFLmlzVGFyZ2V0RlBTQ2hhbmdlZCA9IGZhbHNlO1xuICAgIFNUQVRFLmlzU2l6ZU9wdGlvbkNoYW5nZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChTVEFURS5pc01vZGVsQ2hhbmdlZCB8fCBTVEFURS5pc0ZsYWdDaGFuZ2VkIHx8IFNUQVRFLmlzQmFja2VuZENoYW5nZWQpIHtcbiAgICBTVEFURS5pc01vZGVsQ2hhbmdlZCA9IHRydWU7XG5cbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xuXG4gICAgaWYgKGRldGVjdG9yICE9IG51bGwpIHtcbiAgICAgIGRldGVjdG9yLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoU1RBVEUuaXNGbGFnQ2hhbmdlZCB8fCBTVEFURS5pc0JhY2tlbmRDaGFuZ2VkKSB7XG4gICAgICBhd2FpdCBzZXRCYWNrZW5kQW5kRW52RmxhZ3MoU1RBVEUuZmxhZ3MsIFNUQVRFLmJhY2tlbmQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBkZXRlY3RvciA9IGF3YWl0IGNyZWF0ZURldGVjdG9yKFNUQVRFLm1vZGVsKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGV0ZWN0b3IgPSBudWxsO1xuICAgICAgYWxlcnQoZXJyb3IpO1xuICAgIH1cblxuICAgIFNUQVRFLmlzRmxhZ0NoYW5nZWQgPSBmYWxzZTtcbiAgICBTVEFURS5pc0JhY2tlbmRDaGFuZ2VkID0gZmFsc2U7XG4gICAgU1RBVEUuaXNNb2RlbENoYW5nZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiZWdpbkVzdGltYXRlUG9zZXNTdGF0cygpIHtcbiAgc3RhcnRJbmZlcmVuY2VUaW1lID0gKHBlcmZvcm1hbmNlIHx8IERhdGUpLm5vdygpO1xufVxuXG5mdW5jdGlvbiBlbmRFc3RpbWF0ZVBvc2VzU3RhdHMoKSB7XG4gIGNvbnN0IGVuZEluZmVyZW5jZVRpbWUgPSAocGVyZm9ybWFuY2UgfHwgRGF0ZSkubm93KCk7XG4gIGluZmVyZW5jZVRpbWVTdW0gKz0gZW5kSW5mZXJlbmNlVGltZSAtIHN0YXJ0SW5mZXJlbmNlVGltZTtcbiAgKytudW1JbmZlcmVuY2VzO1xuXG4gIGNvbnN0IHBhbmVsVXBkYXRlTWlsbGlzZWNvbmRzID0gMTAwMDtcbiAgaWYgKGVuZEluZmVyZW5jZVRpbWUgLSBsYXN0UGFuZWxVcGRhdGUgPj0gcGFuZWxVcGRhdGVNaWxsaXNlY29uZHMpIHtcbiAgICBjb25zdCBhdmVyYWdlSW5mZXJlbmNlVGltZSA9IGluZmVyZW5jZVRpbWVTdW0gLyBudW1JbmZlcmVuY2VzO1xuICAgIGluZmVyZW5jZVRpbWVTdW0gPSAwO1xuICAgIG51bUluZmVyZW5jZXMgPSAwO1xuICAgIHN0YXRzLmN1c3RvbUZwc1BhbmVsLnVwZGF0ZShcbiAgICAgICAgMTAwMC4wIC8gYXZlcmFnZUluZmVyZW5jZVRpbWUsIDEyMCAvKiBtYXhWYWx1ZSAqLyk7XG4gICAgbGFzdFBhbmVsVXBkYXRlID0gZW5kSW5mZXJlbmNlVGltZTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZW5kZXJSZXN1bHQoKSB7XG4gIGlmIChjYW1lcmEudmlkZW8ucmVhZHlTdGF0ZSA8IDIpIHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY2FtZXJhLnZpZGVvLm9ubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh2aWRlbyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IHBvc2VzID0gbnVsbDtcbiAgbGV0IGNhbnZhc0luZm8gPSBudWxsO1xuXG4gIC8vIERldGVjdG9yIGNhbiBiZSBudWxsIGlmIGluaXRpYWxpemF0aW9uIGZhaWxlZCAoZm9yIGV4YW1wbGUgd2hlbiBsb2FkaW5nXG4gIC8vIGZyb20gYSBVUkwgdGhhdCBkb2VzIG5vdCBleGlzdCkuXG4gIGlmIChkZXRlY3RvciAhPSBudWxsKSB7XG4gICAgLy8gRlBTIG9ubHkgY291bnRzIHRoZSB0aW1lIGl0IHRha2VzIHRvIGZpbmlzaCBlc3RpbWF0ZVBvc2VzLlxuICAgIGJlZ2luRXN0aW1hdGVQb3Nlc1N0YXRzKCk7XG5cbiAgICBpZiAodXNlR3B1UmVuZGVyZXIgJiYgU1RBVEUubW9kZWwgIT09ICdQb3NlTmV0Jykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IFBvc2VOZXQgc3VwcG9ydHMgR1BVIHJlbmRlcmVyIScpO1xuICAgIH1cbiAgICAvLyBEZXRlY3RvcnMgY2FuIHRocm93IGVycm9ycywgZm9yIGV4YW1wbGUgd2hlbiB1c2luZyBjdXN0b20gVVJMcyB0aGF0XG4gICAgLy8gY29udGFpbiBhIG1vZGVsIHRoYXQgZG9lc24ndCBwcm92aWRlIHRoZSBleHBlY3RlZCBvdXRwdXQuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh1c2VHcHVSZW5kZXJlcikge1xuICAgICAgICBjb25zdCBbcG9zZXNUZW1wLCBjYW52YXNJbmZvVGVtcF0gPSBhd2FpdCBkZXRlY3Rvci5lc3RpbWF0ZVBvc2VzR1BVKFxuICAgICAgICAgICAgY2FtZXJhLnZpZGVvLFxuICAgICAgICAgICAge21heFBvc2VzOiBTVEFURS5tb2RlbENvbmZpZy5tYXhQb3NlcywgZmxpcEhvcml6b250YWw6IGZhbHNlfSxcbiAgICAgICAgICAgIHRydWUpO1xuICAgICAgICBwb3NlcyA9IHBvc2VzVGVtcDtcbiAgICAgICAgY2FudmFzSW5mbyA9IGNhbnZhc0luZm9UZW1wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zZXMgPSBhd2FpdCBkZXRlY3Rvci5lc3RpbWF0ZVBvc2VzKFxuICAgICAgICAgICAgY2FtZXJhLnZpZGVvLFxuICAgICAgICAgICAge21heFBvc2VzOiBTVEFURS5tb2RlbENvbmZpZy5tYXhQb3NlcywgZmxpcEhvcml6b250YWw6IGZhbHNlfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRldGVjdG9yLmRpc3Bvc2UoKTtcbiAgICAgIGRldGVjdG9yID0gbnVsbDtcbiAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9XG5cbiAgICBlbmRFc3RpbWF0ZVBvc2VzU3RhdHMoKTtcbiAgfVxuICBjb25zdCByZW5kZXJlclBhcmFtcyA9IHVzZUdwdVJlbmRlcmVyID9cbiAgICAgIFtjYW1lcmEudmlkZW8sIHBvc2VzLCBjYW52YXNJbmZvLCBTVEFURS5tb2RlbENvbmZpZy5zY29yZVRocmVzaG9sZF0gOlxuICAgICAgW2NhbWVyYS52aWRlbywgcG9zZXMsIFNUQVRFLmlzTW9kZWxDaGFuZ2VkXTtcbiAgcmVuZGVyZXIuZHJhdyhyZW5kZXJlclBhcmFtcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlclByZWRpY3Rpb24oKSB7XG4gIGF3YWl0IGNoZWNrR3VpVXBkYXRlKCk7XG5cbiAgaWYgKCFTVEFURS5pc01vZGVsQ2hhbmdlZCkge1xuICAgIGF3YWl0IHJlbmRlclJlc3VsdCgpO1xuICB9XG5cbiAgcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyUHJlZGljdGlvbik7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwKCkge1xuICAvLyBHdWkgY29udGVudCB3aWxsIGNoYW5nZSBkZXBlbmRpbmcgb24gd2hpY2ggbW9kZWwgaXMgaW4gdGhlIHF1ZXJ5IHN0cmluZy5cbiAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuICBwYXJhbXMuU1RBVEUubW9kZWwgPSBwb3NlZGV0ZWN0aW9uLlN1cHBvcnRlZE1vZGVscy5CbGF6ZVBvc2U7XG4gIGNvbnN0IGJhY2tlbmRzID0gcGFyYW1zLk1PREVMX0JBQ0tFTkRfTUFQW3BhcmFtcy5TVEFURS5tb2RlbF07XG4gIHBhcmFtcy5TVEFURS5iYWNrZW5kID0gYmFja2VuZHNbMF07XG5cbiAgc3RhdHMgPSBzZXR1cFN0YXRzKCk7XG4gIGNvbnN0IGlzV2ViR1BVID0gU1RBVEUuYmFja2VuZCA9PT0gJ3RmanMtd2ViZ3B1JztcbiAgY29uc3QgaW1wb3J0VmlkZW8gPSAodXJsUGFyYW1zLmdldCgnaW1wb3J0VmlkZW8nKSA9PT0gJ3RydWUnKSAmJiBpc1dlYkdQVTtcblxuICBjYW1lcmEgPSBhd2FpdCBDYW1lcmEuc2V0dXAoU1RBVEUuY2FtZXJhKTtcblxuICBhd2FpdCBzZXRCYWNrZW5kQW5kRW52RmxhZ3MoU1RBVEUuZmxhZ3MsIFNUQVRFLmJhY2tlbmQpO1xuICBhd2FpdCB0Zi5yZWFkeSgpO1xuICBkZXRlY3RvciA9IGF3YWl0IGNyZWF0ZURldGVjdG9yKCk7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQnKTtcbiAgY2FudmFzLndpZHRoID0gY2FtZXJhLnZpZGVvLndpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gY2FtZXJhLnZpZGVvLmhlaWdodDtcbiAgdXNlR3B1UmVuZGVyZXIgPSAodXJsUGFyYW1zLmdldCgnZ3B1UmVuZGVyZXInKSA9PT0gJ3RydWUnKSAmJiBpc1dlYkdQVTtcbiAgaWYgKHVzZUdwdVJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXJXZWJHUFUoY2FudmFzLCBpbXBvcnRWaWRlbyk7XG4gIH0gZWxzZSB7XG4gICAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXJDYW52YXMyZChjYW52YXMpO1xuICB9XG5cbiAgcmVuZGVyUHJlZGljdGlvbigpO1xufTtcblxuYXBwKCk7XG5cbmlmICh1c2VHcHVSZW5kZXJlcikge1xuICByZW5kZXJlci5kaXNwb3NlKCk7XG59XG4iXSwibmFtZXMiOlsibXBQb3NlIiwidGZqc1dhc20iLCJ0ZiIsInNldFdhc21QYXRocyIsInZlcnNpb25fd2FzbSIsInBvc2VkZXRlY3Rpb24iLCJDYW1lcmEiLCJSZW5kZXJlcldlYkdQVSIsIlJlbmRlcmVyQ2FudmFzMmQiLCJzZXR1cERhdEd1aSIsIlNUQVRFIiwic2V0dXBTdGF0cyIsInNldEJhY2tlbmRBbmRFbnZGbGFncyIsInBhcmFtcyIsImRldGVjdG9yIiwiY2FtZXJhIiwic3RhdHMiLCJzdGFydEluZmVyZW5jZVRpbWUiLCJudW1JbmZlcmVuY2VzIiwiaW5mZXJlbmNlVGltZVN1bSIsImxhc3RQYW5lbFVwZGF0ZSIsInJhZklkIiwicmVuZGVyZXIiLCJ1c2VHcHVSZW5kZXJlciIsImNyZWF0ZURldGVjdG9yIiwibW9kZWwiLCJTdXBwb3J0ZWRNb2RlbHMiLCJQb3NlTmV0IiwicXVhbnRCeXRlcyIsImFyY2hpdGVjdHVyZSIsIm91dHB1dFN0cmlkZSIsImlucHV0UmVzb2x1dGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwibXVsdGlwbGllciIsIkJsYXplUG9zZSIsInJ1bnRpbWUiLCJiYWNrZW5kIiwic3BsaXQiLCJtb2RlbFR5cGUiLCJtb2RlbENvbmZpZyIsInR5cGUiLCJzb2x1dGlvblBhdGgiLCJWRVJTSU9OIiwiTW92ZU5ldCIsIm1vdmVuZXQiLCJTSU5HTEVQT1NFX0xJR0hUTklORyIsIlNJTkdMRVBPU0VfVEhVTkRFUiIsIk1VTFRJUE9TRV9MSUdIVE5JTkciLCJjdXN0b21Nb2RlbCIsIm1vZGVsVXJsIiwiZW5hYmxlVHJhY2tpbmciLCJjaGVja0d1aVVwZGF0ZSIsImlzVGFyZ2V0RlBTQ2hhbmdlZCIsImlzU2l6ZU9wdGlvbkNoYW5nZWQiLCJzZXR1cENhbWVyYSIsImlzTW9kZWxDaGFuZ2VkIiwiaXNGbGFnQ2hhbmdlZCIsImlzQmFja2VuZENoYW5nZWQiLCJ3aW5kb3ciLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImRpc3Bvc2UiLCJmbGFncyIsImVycm9yIiwiYWxlcnQiLCJiZWdpbkVzdGltYXRlUG9zZXNTdGF0cyIsInBlcmZvcm1hbmNlIiwiRGF0ZSIsIm5vdyIsImVuZEVzdGltYXRlUG9zZXNTdGF0cyIsImVuZEluZmVyZW5jZVRpbWUiLCJwYW5lbFVwZGF0ZU1pbGxpc2Vjb25kcyIsImF2ZXJhZ2VJbmZlcmVuY2VUaW1lIiwiY3VzdG9tRnBzUGFuZWwiLCJ1cGRhdGUiLCJyZW5kZXJSZXN1bHQiLCJ2aWRlbyIsInJlYWR5U3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9ubG9hZGVkZGF0YSIsInBvc2VzIiwiY2FudmFzSW5mbyIsIkVycm9yIiwicG9zZXNUZW1wIiwiY2FudmFzSW5mb1RlbXAiLCJlc3RpbWF0ZVBvc2VzR1BVIiwibWF4UG9zZXMiLCJmbGlwSG9yaXpvbnRhbCIsImVzdGltYXRlUG9zZXMiLCJyZW5kZXJlclBhcmFtcyIsInNjb3JlVGhyZXNob2xkIiwiZHJhdyIsInJlbmRlclByZWRpY3Rpb24iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhcHAiLCJ1cmxQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImJhY2tlbmRzIiwiTU9ERUxfQkFDS0VORF9NQVAiLCJpc1dlYkdQVSIsImltcG9ydFZpZGVvIiwiZ2V0Iiwic2V0dXAiLCJyZWFkeSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/pose_detection/index.js\n"));

/***/ })

});