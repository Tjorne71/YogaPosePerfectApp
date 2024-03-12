import { Pose, Keypoint } from '@tensorflow-models/pose-detection';
import * as posedetection from '@tensorflow-models/pose-detection';

export class RendererCanvas2d {
  _DEFAULT_LINE_WIDTH = 3;
  _model = posedetection.SupportedModels.BlazePose;

  _canvasContext: CanvasRenderingContext2D;
  _videoWidth: number;
  _videoHeight: number;
  _overlayImage: HTMLImageElement | null;
  _overlayImageX: number;
  _overlayImageY: number;
  _overlayImageWidth: number;
  _overlayImageHeight: number;
  _scaleX: number;
  _scaleY: number;
  _offsetX: number;
  _offsetY: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      throw Error('Fuck');
    }
    this._canvasContext = ctx;
    this._videoWidth = canvas.width;
    this._videoHeight = canvas.height;
    this.flip(canvas.width);
    this._overlayImage = null; // This will store the Image object
    this._overlayImageX = 0; // X position of the overlay image
    this._overlayImageY = 0; // Y position of the overlay image
    this._overlayImageWidth = 0; // Width of the overlay image
    this._overlayImageHeight = 0; // Height of the overlay image
    this._scaleX = 1;
    this._scaleY = 1;
    this._offsetX = 0;
    this._offsetY = 0;
  }

  flip(videoWidth: number) {
    // Check if canvas context exists and if the video is flipped
    if (this._canvasContext && this._canvasContext.getTransform().a !== -1) {
      // Because the image from the camera is mirrored, need to flip horizontally.
      this._canvasContext.translate(videoWidth, 0);
      this._canvasContext.scale(-1, 1);
    }
  }

  draw(video: HTMLVideoElement, poses: Pose[]) {
    this.draw_canvasContext(video);

    // The null check makes sure the UI is not in the middle of changing to a
    // different model. If during model change, the result is from an old model,
    // which shouldn't be rendered.
    if (poses && poses.length > 0) {
      this.drawResults(poses);
    }

    this.drawOverlayImage();
  }

  draw_canvasContext(video: HTMLVideoElement) {
    // Calculate aspect ratios
    const canvasAspectRatio = this._videoWidth / this._videoHeight;
    const videoAspectRatio = video.videoWidth / video.videoHeight;

    let drawWidth, drawHeight, drawX, drawY;

    // Compare aspect ratios to determine scaling
    if (videoAspectRatio > canvasAspectRatio) {
      // Video is wider than canvas, scale by height
      drawHeight = this._videoHeight;
      drawWidth = video.videoWidth * (drawHeight / video.videoHeight);
      drawX = (this._videoWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      // Video is taller than canvas, scale by width
      drawWidth = this._videoWidth;
      drawHeight = video.videoHeight * (drawWidth / video.videoWidth);
      drawX = 0;
      drawY = (this._videoHeight - drawHeight) / 2;
    }

    // Clear the canvas before redrawing
    this.clear_canvasContext();

    // Store scale factors and offsets for use in drawing keypoints and skeletons
    this._scaleX = drawWidth / video.videoWidth;
    this._scaleY = drawHeight / video.videoHeight;
    this._offsetX = drawX;
    this._offsetY = drawY;

    // this._canvasContext.drawImage(video, drawX, drawY, drawWidth, drawHeight);
  }

  clear_canvasContext() {
    this._canvasContext.clearRect(0, 0, this._videoWidth, this._videoHeight);
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  drawResults(poses: Pose[]) {
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose: Pose) {
    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);
      if (pose.id != undefined) {
        this.drawSkeleton(pose.keypoints, pose.id);
      }
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  drawKeypoints(keypoints: Keypoint[]) {
    const keypointInd = posedetection.util.getKeypointIndexBySide(this._model);
    this._canvasContext.fillStyle = 'Red';
    this._canvasContext.strokeStyle = 'White';
    this._canvasContext.lineWidth = 1;

    for (const i of keypointInd.middle) {
      this.drawKeypoint(keypoints[i]);
    }

    this._canvasContext.fillStyle = 'Green';
    for (const i of keypointInd.left) {
      this.drawKeypoint(keypoints[i]);
    }

    this._canvasContext.fillStyle = 'Orange';
    for (const i of keypointInd.right) {
      this.drawKeypoint(keypoints[i]);
    }
  }

  drawKeypoint(keypoint: Keypoint) {
    const videoWidth = this._videoWidth;

    // Apply scaling and offset to keypoint coordinates
    let x = keypoint.x * this._scaleX + this._offsetX;
    const y = keypoint.y * this._scaleY + this._offsetY;

    // If the video is flipped, adjust the x-coordinate accordingly
    if (this._canvasContext.getTransform().a === -1) {
      x = videoWidth - x;
    }

    // Existing code to draw the keypoint using the transformed coordinates
    const circle = new Path2D();
    circle.arc(x, y, 2, 0, 2 * Math.PI);
    this._canvasContext.fill(circle);
    this._canvasContext.stroke(circle);
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(keypoints: Keypoint[], poseId: number) {
    // Each poseId is mapped to a color in the color palette.
    const color = 'White';
    this._canvasContext.fillStyle = color;
    this._canvasContext.strokeStyle = color;
    this._canvasContext.lineWidth = this._DEFAULT_LINE_WIDTH;

    posedetection.util.getAdjacentPairs(this._model).forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // Apply scaling and offset to keypoint coordinates
      const x1 = kp1.x * this._scaleX + this._offsetX;
      const y1 = kp1.y * this._scaleY + this._offsetY;
      const x2 = kp2.x * this._scaleX + this._offsetX;
      const y2 = kp2.y * this._scaleY + this._offsetY;

      // Existing code to draw the line if keypoints are above the threshold
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
      const scoreThreshold = 0;
      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        this._canvasContext!.beginPath();
        this._canvasContext!.moveTo(x1, y1);
        this._canvasContext!.lineTo(x2, y2);
        this._canvasContext!.stroke();
      }
    });
  }

  setOverlayImage(imageSrc: string, newWidth = null) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      this._overlayImage = img;

      // Calculate the new height to maintain the aspect ratio
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      const scaledHeight = newWidth ? newWidth * aspectRatio : img.naturalHeight;
      const scaledWidth = newWidth ?? img.naturalWidth;

      // Center the image
      this._overlayImageX = (this._videoWidth - scaledWidth) / 2; // Center horizontally
      this._overlayImageY = (this._videoHeight - scaledHeight) / 2; // Center vertically

      this._overlayImageWidth = scaledWidth;
      this._overlayImageHeight = scaledHeight;

      // Optionally, redraw the overlay image immediately
      // this.drawOverlayImage();
    };
  }

  drawOverlayImage() {
    if (this._overlayImage) {
      this._canvasContext.drawImage(
        this._overlayImage,
        this._overlayImageX,
        this._overlayImageY,
        this._overlayImageWidth,
        this._overlayImageHeight
      );
    }
  }
}
