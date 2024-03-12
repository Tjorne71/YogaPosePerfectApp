'use client';

import { app } from './pose_detection/index';
import { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Home() {
  useEffect(() => {
    app();
  }, []);

  const handle = useFullScreenHandle();

  return (
    <main className="flex min-h-screen flex-col">
      <div id="main">
        <div className="container">
          <button onClick={handle.enter} className='absolute'>Open fullscreen</button>
          <FullScreen handle={handle}>
            <canvas id="output"></canvas>
          </FullScreen>
          <video id="video" playsInline className="scale-x-[-1] hidden invisible w-auto h-auto"></video>
        </div>
        <div id="scatter-gl-container"></div>
      </div>
    </main>
  );
}
