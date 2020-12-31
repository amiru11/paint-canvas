import { paintState, setPaintStatus, setStrokeWidth } from './paint';

const canvas: HTMLCanvasElement = document.querySelector('#paint-canvas');
const rangeElement: HTMLInputElement = document.querySelector('#stroke-range');

if (canvas && rangeElement) {
  /**
   * Canvas
   */
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  /**
   * CTX style
   */
  ctx.lineWidth = paintState.get('strokeWidth'); // 선굵기
  ctx.fillStyle = '#ffffff';
  /**
   * Canvas addEventListener
   */
  function onMouseMove(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const canvasX = offsetX;
    const canvasY = offsetY;

    if (!paintState.get('paintStatus')) {
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

  /**
   * RangeElement
   */
  rangeElement.addEventListener('change', (event) => {
    const strokeWidth = (event.target as HTMLInputElement).value;

    setStrokeWidth(Number(strokeWidth));
    console.log(paintState.get('strokeWidth'));
    ctx.lineWidth = paintState.get('strokeWidth');
  });
}
