import {
  paintState,
  setPaintStatus,
  setStrokeWidth,
  setFillColor,
  setColorMode,
  setStrokeColor,
} from './paint';

const canvas: HTMLCanvasElement = document.querySelector('#paint-canvas');
const rangeElement: HTMLInputElement = document.querySelector('#stroke-range');
const colorElements: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  '.controls__color',
);
const colorModeElements: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  '.btn-mode',
);
const saveElement: HTMLButtonElement = document.querySelector('.btn-save');

if (canvas && rangeElement) {
  /**
   * Canvas
   */
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  /**
   * CTX style
   */
  ctx.lineWidth = paintState.get('strokeWidth'); // 선굵기
  ctx.strokeStyle = paintState.get('strokeColor');
  ctx.fillStyle = paintState.get('fillColor');
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
    if (paintState.get('colorMode') === 'fill') {
      ctx.fillStyle = paintState.get('fillColor');
      ctx.fillRect(0, 0, 700, 700);
    } else {
      ctx.strokeStyle = paintState.get('strokeColor');
    }
  }
  function onMouseUp(event: MouseEvent) {
    setPaintStatus(false);
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

  /**
   * SaveElement
   */
  if (saveElement) {
    saveElement.addEventListener('click', () => {
      const aTag = document.createElement('a');

      aTag.href = canvas.toDataURL();
      aTag.download = 'my_paint.png';
      aTag.click();
    });
  }
}

/**
 * Color Button Element
 */
if (colorElements) {
  Array.from(colorElements).forEach((element) => {
    element.addEventListener('click', (event) => {
      if (element.classList.contains('on')) return;
      Array.from(colorElements).forEach((element) => {
        element.classList.remove('on');
      });
      element.classList.add('on');

      const color = (event.target as HTMLButtonElement).value;
      const colorMode = paintState.get('colorMode');

      switch (colorMode) {
        case 'stroke':
          setStrokeColor(color);
          break;
        case 'fill':
          setFillColor(color);
          break;
        default:
          break;
      }
    });
  });
}

if (colorModeElements) {
  Array.from(colorModeElements).forEach((element) => {
    element.addEventListener('click', (event) => {
      if (element.classList.contains('on')) return;
      Array.from(colorModeElements).forEach((element) => {
        element.classList.remove('on');
      });
      element.classList.add('on');
      const colorMode = (event.target as HTMLButtonElement).value;
      setColorMode(colorMode);
    });
  });
}
