function calculatePercentageError(actualAngle: number, perfectAngle: number, threshold: number): number {
  const error: number = Math.abs(actualAngle - perfectAngle);
  if (error <= threshold) {
    return 100.0;
  } else {
    return Math.max(0, (1 - error / perfectAngle) * 100);
  }
}

export function calculateAngleScore(angle: number, perfectAngle: number, threshold: number): number {
  return calculatePercentageError(angle, perfectAngle, threshold);
}
