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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: function() { return /* binding */ app; }\n/* harmony export */ });\n/* harmony import */ var _tensorflow_tfjs_backend_webgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tensorflow/tfjs-backend-webgl */ \"(app-pages-browser)/./node_modules/@tensorflow/tfjs-backend-webgl/dist/index.js\");\n/* harmony import */ var _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tensorflow-models/pose-detection */ \"(app-pages-browser)/./node_modules/@tensorflow-models/pose-detection/dist/pose-detection.esm.js\");\n/* harmony import */ var _tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tensorflow/tfjs-core */ \"(app-pages-browser)/./node_modules/@tensorflow/tfjs-core/dist/index.js\");\n/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./camera */ \"(app-pages-browser)/./src/app/pose_detection/camera.js\");\n/* harmony import */ var _renderer_canvas2d__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderer_canvas2d */ \"(app-pages-browser)/./src/app/pose_detection/renderer_canvas2d.js\");\n/* harmony import */ var _stats_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stats_panel */ \"(app-pages-browser)/./src/app/pose_detection/stats_panel.js\");\n/**\n * Simplified script to run BlazePose with MediaPipe.\n * Removes unnecessary models, imports, and configurations.\n */  // WebGL backend is still needed for TensorFlow.js operations\n\n\n\n\n\nlet detector, camera, stats;\nlet rafId;\nlet renderer = null;\nasync function createDetector() {\n    // Directly use BlazePose with MediaPipe without checking the model type from STATE\n    return _tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_1__.createDetector(_tensorflow_models_pose_detection__WEBPACK_IMPORTED_MODULE_1__.SupportedModels.BlazePose, {\n        runtime: \"mediapipe\",\n        modelType: \"full\"\n    });\n}\nasync function renderResult() {\n    if (camera.video.readyState < 2) {\n        await new Promise((resolve)=>{\n            camera.video.onloadeddata = ()=>{\n                resolve(video);\n            };\n        });\n    }\n    let poses = null;\n    if (detector != null) {\n        // Estimate poses without GPU rendering as it's simplified\n        try {\n            poses = await detector.estimatePoses(camera.video, {\n                maxPoses: 1,\n                flipHorizontal: false\n            }); // Assuming single pose; adjust maxPoses as needed\n        } catch (error) {\n            console.error(error);\n            detector.dispose();\n            detector = null;\n        }\n    }\n    renderer.draw([\n        camera.video,\n        poses,\n        false\n    ]); // No need for modelChanged flag in simplified version\n}\nasync function renderPrediction() {\n    if (!camera) {\n        camera = await _camera__WEBPACK_IMPORTED_MODULE_3__.Camera.setupCamera();\n    }\n    await renderResult();\n    rafId = requestAnimationFrame(renderPrediction);\n}\n;\nasync function app() {\n    stats = (0,_stats_panel__WEBPACK_IMPORTED_MODULE_5__.setupStats)();\n    camera = await _camera__WEBPACK_IMPORTED_MODULE_3__.Camera.setupCamera();\n    await _tensorflow_tfjs_core__WEBPACK_IMPORTED_MODULE_2__.ready();\n    detector = await createDetector();\n    const canvas = document.getElementById(\"output\");\n    canvas.width = camera.video.width;\n    canvas.height = camera.video.height;\n    renderer = new _renderer_canvas2d__WEBPACK_IMPORTED_MODULE_4__.RendererCanvas2d(canvas);\n    renderPrediction();\n}\n;\napp();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcG9zZV9kZXRlY3Rpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Q0FHQyxHQUV1QyxDQUFDLDZEQUE2RDtBQUVuQztBQUN2QjtBQUVaO0FBQ3FCO0FBQ1o7QUFFekMsSUFBSUssVUFBVUMsUUFBUUM7QUFDdEIsSUFBSUM7QUFDSixJQUFJQyxXQUFXO0FBRWYsZUFBZUM7SUFDYixtRkFBbUY7SUFDbkYsT0FBT1YsNkVBQTRCLENBQUNBLDhFQUE2QixDQUFDWSxTQUFTLEVBQUU7UUFDM0VDLFNBQVM7UUFDVEMsV0FBVztJQUNiO0FBQ0Y7QUFFQSxlQUFlQztJQUNiLElBQUlULE9BQU9VLEtBQUssQ0FBQ0MsVUFBVSxHQUFHLEdBQUc7UUFDL0IsTUFBTSxJQUFJQyxRQUFRLENBQUNDO1lBQ2pCYixPQUFPVSxLQUFLLENBQUNJLFlBQVksR0FBRztnQkFDMUJELFFBQVFIO1lBQ1Y7UUFDRjtJQUNGO0lBRUEsSUFBSUssUUFBUTtJQUVaLElBQUloQixZQUFZLE1BQU07UUFDcEIsMERBQTBEO1FBQzFELElBQUk7WUFDRmdCLFFBQVEsTUFBTWhCLFNBQVNpQixhQUFhLENBQ2hDaEIsT0FBT1UsS0FBSyxFQUNaO2dCQUFDTyxVQUFVO2dCQUFHQyxnQkFBZ0I7WUFBSyxJQUFJLGtEQUFrRDtRQUMvRixFQUFFLE9BQU9DLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkcEIsU0FBU3NCLE9BQU87WUFDaEJ0QixXQUFXO1FBQ2I7SUFDRjtJQUVBSSxTQUFTbUIsSUFBSSxDQUFDO1FBQUN0QixPQUFPVSxLQUFLO1FBQUVLO1FBQU87S0FBTSxHQUFHLHNEQUFzRDtBQUNyRztBQUVBLGVBQWVRO0lBQ2IsSUFBSSxDQUFDdkIsUUFBUTtRQUNYQSxTQUFTLE1BQU1KLDJDQUFNQSxDQUFDNEIsV0FBVztJQUNuQztJQUVBLE1BQU1mO0lBRU5QLFFBQVF1QixzQkFBc0JGO0FBQ2hDOztBQUVPLGVBQWVHO0lBQ3BCekIsUUFBUUgsd0RBQVVBO0lBQ2xCRSxTQUFTLE1BQU1KLDJDQUFNQSxDQUFDNEIsV0FBVztJQUVqQyxNQUFNN0Isd0RBQVE7SUFDZEksV0FBVyxNQUFNSztJQUNqQixNQUFNd0IsU0FBU0MsU0FBU0MsY0FBYyxDQUFDO0lBQ3ZDRixPQUFPRyxLQUFLLEdBQUcvQixPQUFPVSxLQUFLLENBQUNxQixLQUFLO0lBQ2pDSCxPQUFPSSxNQUFNLEdBQUdoQyxPQUFPVSxLQUFLLENBQUNzQixNQUFNO0lBQ25DN0IsV0FBVyxJQUFJTixnRUFBZ0JBLENBQUMrQjtJQUVoQ0w7QUFDRjs7QUFFQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9wb3NlX2RldGVjdGlvbi9pbmRleC5qcz85YjIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU2ltcGxpZmllZCBzY3JpcHQgdG8gcnVuIEJsYXplUG9zZSB3aXRoIE1lZGlhUGlwZS5cbiAqIFJlbW92ZXMgdW5uZWNlc3NhcnkgbW9kZWxzLCBpbXBvcnRzLCBhbmQgY29uZmlndXJhdGlvbnMuXG4gKi9cblxuaW1wb3J0ICdAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2ViZ2wnOyAvLyBXZWJHTCBiYWNrZW5kIGlzIHN0aWxsIG5lZWRlZCBmb3IgVGVuc29yRmxvdy5qcyBvcGVyYXRpb25zXG5cbmltcG9ydCAqIGFzIHBvc2VkZXRlY3Rpb24gZnJvbSAnQHRlbnNvcmZsb3ctbW9kZWxzL3Bvc2UtZGV0ZWN0aW9uJztcbmltcG9ydCAqIGFzIHRmIGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7Q2FtZXJhfSBmcm9tICcuL2NhbWVyYSc7XG5pbXBvcnQge1JlbmRlcmVyQ2FudmFzMmR9IGZyb20gJy4vcmVuZGVyZXJfY2FudmFzMmQnO1xuaW1wb3J0IHtzZXR1cFN0YXRzfSBmcm9tICcuL3N0YXRzX3BhbmVsJztcblxubGV0IGRldGVjdG9yLCBjYW1lcmEsIHN0YXRzO1xubGV0IHJhZklkO1xubGV0IHJlbmRlcmVyID0gbnVsbDtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRGV0ZWN0b3IoKSB7XG4gIC8vIERpcmVjdGx5IHVzZSBCbGF6ZVBvc2Ugd2l0aCBNZWRpYVBpcGUgd2l0aG91dCBjaGVja2luZyB0aGUgbW9kZWwgdHlwZSBmcm9tIFNUQVRFXG4gIHJldHVybiBwb3NlZGV0ZWN0aW9uLmNyZWF0ZURldGVjdG9yKHBvc2VkZXRlY3Rpb24uU3VwcG9ydGVkTW9kZWxzLkJsYXplUG9zZSwge1xuICAgIHJ1bnRpbWU6ICdtZWRpYXBpcGUnLFxuICAgIG1vZGVsVHlwZTogJ2Z1bGwnLCAvLyBBc3N1bWluZyAnZnVsbCcgbW9kZWwgdHlwZTsgYWRqdXN0IGFzIG5lZWRlZFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVuZGVyUmVzdWx0KCkge1xuICBpZiAoY2FtZXJhLnZpZGVvLnJlYWR5U3RhdGUgPCAyKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNhbWVyYS52aWRlby5vbmxvYWRlZGRhdGEgPSAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUodmlkZW8pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBwb3NlcyA9IG51bGw7XG5cbiAgaWYgKGRldGVjdG9yICE9IG51bGwpIHtcbiAgICAvLyBFc3RpbWF0ZSBwb3NlcyB3aXRob3V0IEdQVSByZW5kZXJpbmcgYXMgaXQncyBzaW1wbGlmaWVkXG4gICAgdHJ5IHtcbiAgICAgIHBvc2VzID0gYXdhaXQgZGV0ZWN0b3IuZXN0aW1hdGVQb3NlcyhcbiAgICAgICAgICBjYW1lcmEudmlkZW8sXG4gICAgICAgICAge21heFBvc2VzOiAxLCBmbGlwSG9yaXpvbnRhbDogZmFsc2V9KTsgLy8gQXNzdW1pbmcgc2luZ2xlIHBvc2U7IGFkanVzdCBtYXhQb3NlcyBhcyBuZWVkZWRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBkZXRlY3Rvci5kaXNwb3NlKCk7XG4gICAgICBkZXRlY3RvciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyZXIuZHJhdyhbY2FtZXJhLnZpZGVvLCBwb3NlcywgZmFsc2VdKTsgLy8gTm8gbmVlZCBmb3IgbW9kZWxDaGFuZ2VkIGZsYWcgaW4gc2ltcGxpZmllZCB2ZXJzaW9uXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlclByZWRpY3Rpb24oKSB7XG4gIGlmICghY2FtZXJhKSB7XG4gICAgY2FtZXJhID0gYXdhaXQgQ2FtZXJhLnNldHVwQ2FtZXJhKCk7XG4gIH1cblxuICBhd2FpdCByZW5kZXJSZXN1bHQoKTtcblxuICByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJQcmVkaWN0aW9uKTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhcHAoKSB7XG4gIHN0YXRzID0gc2V0dXBTdGF0cygpO1xuICBjYW1lcmEgPSBhd2FpdCBDYW1lcmEuc2V0dXBDYW1lcmEoKTtcblxuICBhd2FpdCB0Zi5yZWFkeSgpO1xuICBkZXRlY3RvciA9IGF3YWl0IGNyZWF0ZURldGVjdG9yKCk7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQnKTtcbiAgY2FudmFzLndpZHRoID0gY2FtZXJhLnZpZGVvLndpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gY2FtZXJhLnZpZGVvLmhlaWdodDtcbiAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXJDYW52YXMyZChjYW52YXMpO1xuXG4gIHJlbmRlclByZWRpY3Rpb24oKTtcbn07XG5cbmFwcCgpO1xuIl0sIm5hbWVzIjpbInBvc2VkZXRlY3Rpb24iLCJ0ZiIsIkNhbWVyYSIsIlJlbmRlcmVyQ2FudmFzMmQiLCJzZXR1cFN0YXRzIiwiZGV0ZWN0b3IiLCJjYW1lcmEiLCJzdGF0cyIsInJhZklkIiwicmVuZGVyZXIiLCJjcmVhdGVEZXRlY3RvciIsIlN1cHBvcnRlZE1vZGVscyIsIkJsYXplUG9zZSIsInJ1bnRpbWUiLCJtb2RlbFR5cGUiLCJyZW5kZXJSZXN1bHQiLCJ2aWRlbyIsInJlYWR5U3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9ubG9hZGVkZGF0YSIsInBvc2VzIiwiZXN0aW1hdGVQb3NlcyIsIm1heFBvc2VzIiwiZmxpcEhvcml6b250YWwiLCJlcnJvciIsImNvbnNvbGUiLCJkaXNwb3NlIiwiZHJhdyIsInJlbmRlclByZWRpY3Rpb24iLCJzZXR1cENhbWVyYSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFwcCIsInJlYWR5IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndpZHRoIiwiaGVpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/pose_detection/index.js\n"));

/***/ })

});