'use client';

import { useEffect } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="stats"></div>
      <div id="main">
        <div className="container">
          <div className="canvas-wrapper">
            <canvas id="output"></canvas>
            <video id="video" playsInline className="scale-x-[-1] w-auto h-auto"></video>
          </div>
          <div id="scatter-gl-container"></div>
        </div>
      </div>
    </main>
  );
}
