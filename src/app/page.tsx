'use client';

import { app } from './pose_detection/index';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    app();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="stats"></div>
      <div id="main">
        <div className="container">
          <div className="canvas-wrapper">
            <canvas id="output"></canvas>
            <video id="video" playsInline className="scale-x-[-1] invisible w-auto h-auto"></video>
            <div id='predictionText0' className='text-xl'></div>
            <div id='predictionText1' className='text-xl'></div>
            <div id='predictionText2' className='text-xl'></div>
            <div id='predictionText3' className='text-xl'></div>
          </div>
          <div id="scatter-gl-container"></div>
        </div>
      </div>
    </main>
  );
}
