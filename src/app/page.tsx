'use client';

import { app } from './pose_detection/index';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    app();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <div id="main">
        <div className="container">
          <canvas id="output"></canvas>
          <video id="video" playsInline className="scale-x-[-1] hidden invisible w-auto h-auto"></video>
        </div>
        <div id="scatter-gl-container"></div>
      </div>
    </main>
  );
}
