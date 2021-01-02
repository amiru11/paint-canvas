import {setColorToHex} from "./lib/utils.js";
function initialPaintState() {
  return new Map().set("paintStatus", false).set("strokeWidth", 2.5).set("strokeColor", "#000000").set("fillColor", "#ffffff").set("colorMode", "stroke");
}
export const paintState = initialPaintState();
export function setPaintStatus(isPainting) {
  paintState.set("paintStatus", isPainting);
}
export function setStrokeWidth(width) {
  paintState.set("strokeWidth", width);
}
export function setStrokeColor(color) {
  paintState.set("strokeColor", setColorToHex(color));
}
export function setFillColor(color) {
  paintState.set("fillColor", setColorToHex(color));
}
export function setColorMode(mode) {
  paintState.set("colorMode", mode);
}
