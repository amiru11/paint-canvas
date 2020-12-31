import { paintStatus, setPaintStatus } from './paint';

const canvas: HTMLCanvasElement = document.querySelector('#paint-canvas');

if (canvas) {
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  /**
   * addEventListener
   */
  function onMouseMove(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const canvasX = offsetX;
    const canvasY = offsetY;
    console.log({ offsetX, offsetY });
    if (!paintStatus) {
      ctx?.beginPath();
      ctx?.moveTo(canvasX, canvasY);
    } else {
      ctx?.lineTo(canvasX, canvasY);
      ctx?.stroke();
    }
  }
  function onMouseDown(event: MouseEvent) {
    setPaintStatus(true);
  }
  function onMouseUp(event: MouseEvent) {
    setPaintStatus(false);
    ctx?.closePath();
  }
  function onMouseLeave(event: MouseEvent) {
    setPaintStatus(false);
    ctx?.closePath();
  }

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mouseleave', onMouseLeave);
}
