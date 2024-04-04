import React, { useEffect, useRef, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { PosePrediction, PosePredictor } from '@/app/pose_detection/posePredictor';

interface ImageAndPredictionProps {
  imageSrc: StaticImport;
  filename: string;
  posePredictor: PosePredictor;
  handleNewPrediction: (prediction: PosePrediction, filename: string) => void;
}

export default function ImageAndPrediction({
  imageSrc,
  filename,
  posePredictor,
  handleNewPrediction,
}: ImageAndPredictionProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!isImageLoaded) return; // Wait until the image is loaded

    const makePredictionWithTimeout = async () => {
      // Introduce a 0.5-second timeout before making the prediction
      const prediction = await posePredictor.predictImage(imageRef.current!);
      if (prediction) {
        handleNewPrediction(prediction, filename);
      }
    };

    makePredictionWithTimeout();
  }, [isImageLoaded, handleNewPrediction, filename, posePredictor]);

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set image loaded flag when image is loaded
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imageRef}
      src={(imageSrc as StaticImport).src}
      alt={filename}
      className="object-contain max-w-full max-h-full mx-auto"
      onLoad={handleImageLoad}
    />
  );
}
