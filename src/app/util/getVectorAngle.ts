import math from 'mathjs';
import { Coordinate3D } from '../model/Coordinate3D';

function length(coordinate3D: Coordinate3D): number {
  return Math.sqrt(coordinate3D.x ** 2 + coordinate3D.y ** 2 + coordinate3D.y ** 2);
}

function dotproduct(coordinate3D: Coordinate3D, coordinate3D_2: Coordinate3D): number {
  return coordinate3D.x * coordinate3D_2.x + coordinate3D.y * coordinate3D_2.y + coordinate3D.y * coordinate3D_2.y;
}

export function calculate_angle(point1: Coordinate3D, targetPoint: Coordinate3D, point3: Coordinate3D): number {
  const v1: Coordinate3D = { x: point1.x - targetPoint.x, y: point1.y - targetPoint.y, z: point1.z - targetPoint.z };

  const v2: Coordinate3D = { x: point3.x - targetPoint.x, y: point3.y - targetPoint.y, z: point3.z - targetPoint.z };

  const dot_prod: number = dotproduct(v1, v2);
  const len_v1: number = length(v1);
  const len_v2: number = length(v2);

  const cos_angle: number = dot_prod / (len_v1 * len_v2);
  const angle_radians: number = Math.acos(cos_angle);
  const angle_degrees: number = angle_radians * (180 / Math.PI);

  return angle_degrees;
}
