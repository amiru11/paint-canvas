/**
 * Initial paintState
 */

function initialPaintState(): Map<string, any> {
  return new Map().set('paintStatus', false).set('strokeWidth', 2.5);
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
