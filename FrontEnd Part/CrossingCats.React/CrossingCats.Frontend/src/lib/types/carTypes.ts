export type carType = {
  x: number;
  y: number;
  speed: number;
  handleCarMovement: () => void;
  drawCar: () => void;
  imageNumber: number;
  direction: string;
  width: number;
  height: number;
};