import { Coordinate3D } from '../model/Coordinate3D';
import { Keypoint } from '@tensorflow-models/pose-detection/dist/types';

// function length(coordinate3D: Keypoint): number {
//   return Math.sqrt(coordinate3D.x ** 2 + coordinate3D.y ** 2 + coordinate3D.y ** 2);
// }

// function dotproduct(coordinate3D: Keypoint, coordinate3D_2: Keypoint): number {
//   return coordinate3D.x * coordinate3D_2.x + coordinate3D.y * coordinate3D_2.y + coordinate3D.y * coordinate3D_2.y;
// }

// export function calculateAngle(point1: Keypoint, targetPoint: Keypoint, point3: Keypoint): number {
//   if (!point1.z || !targetPoint.z || !point3.z) {
//     return 0;
//   }
//   const v1: Coordinate3D = { x: point1.x - targetPoint.x, y: point1.y - targetPoint.y, z: point1.z - targetPoint.z };

//   const v2: Coordinate3D = { x: point3.x - targetPoint.x, y: point3.y - targetPoint.y, z: point3.z - targetPoint.z };

//   const dot_prod: number = dotproduct(v1, v2);
//   const len_v1: number = length(v1);
//   const len_v2: number = length(v2);

//   const cos_angle: number = dot_prod / (len_v1 * len_v2);
//   const angle_radians: number = Math.acos(cos_angle);
//   const angle_degrees: number = angle_radians * (180 / Math.PI);

//   return angle_degrees;
// }

export function calculateAngle(pointA: Keypoint, pointB: Keypoint, pointC: Keypoint): number {
  // Calculate vectors AB and BC
  const vectorAB: Keypoint = {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y,
    z: pointB.z && pointA.z && pointB.z - pointA.z,
  };

  const vectorBC: Keypoint = {
    x: pointC.x - pointB.x,
    y: pointC.y - pointB.y,
    z: pointC.z && pointB.z && pointC.z - pointB.z,
  };

  // Calculate dot product of AB and BC
  const dotProduct: number =
    vectorAB.z && vectorBC.z
      ? vectorAB.x * vectorBC.x + vectorAB.y * vectorBC.y + vectorAB.z * vectorBC.z
      : vectorAB.x * vectorBC.x + vectorAB.y * vectorBC.y;

  // Calculate magnitudes of vectors AB and BC
  const magnitudeAB: number = vectorAB.z
    ? Math.sqrt(vectorAB.x * vectorAB.x + vectorAB.y * vectorAB.y + vectorAB.z * vectorAB.z)
    : Math.sqrt(vectorAB.x * vectorAB.x + vectorAB.y * vectorAB.y);
  const magnitudeBC: number = vectorBC.z
    ? Math.sqrt(vectorBC.x * vectorBC.x + vectorBC.y * vectorBC.y + vectorBC.z * vectorBC.z)
    : Math.sqrt(vectorBC.x * vectorBC.x + vectorBC.y * vectorBC.y);

  // Calculate cosine of the angle between AB and BC
  const cosineTheta: number = dotProduct / (magnitudeAB * magnitudeBC);

  // Calculate angle in radians
  const angleRadians: number = Math.acos(cosineTheta);

  // Convert radians to degrees
  const angleDegrees: number = angleRadians * (180 / Math.PI);

  return angleDegrees;
}
