import { setColorToHex } from './lib/utils';
/**
 * Initial paintState
 */

function initialPaintState(): Map<string, any> {
  return new Map<string, any>()
    .set('paintStatus', false)
    .set('strokeWidth', 2.5)
    .set('strokeColor', '#000000')
    .set('fillColor', '#ffffff')
    .set('colorMode', 'stroke');
}

export const paintState: Map<string, any> = initialPaintState();

// Setting paint status
export function setPaintStatus(isPainting: boolean) {
  paintState.set('paintStatus', isPainting);
}

// Setting stroke width
export function setStrokeWidth(width: number) {
  paintState.set('strokeWidth', width);
}

// Setting stroke color
export function setStrokeColor(color: string) {
  paintState.set('strokeColor', setColorToHex(color));
}

// Setting fill color
export function setFillColor(color: string) {
  paintState.set('fillColor', setColorToHex(color));
}

// Setting ColorMode
export function setColorMode(mode: string) {
  paintState.set('colorMode', mode);
}
