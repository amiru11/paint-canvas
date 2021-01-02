import {
  paintState,
  setPaintStatus,
  setStrokeWidth,
  setFillColor,
  setColorMode,
  setStrokeColor
} from "./paint.js";
const canvas = document.querySelector("#paint-canvas");
const rangeElement = document.querySelector("#stroke-range");
const colorElements = document.querySelectorAll(".controls__color");
const colorModeElements = document.querySelectorAll(".btn-mode");
const saveElement = document.querySelector(".btn-save");
if (canvas && rangeElement) {
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = paintState.get("strokeWidth");
  ctx.strokeStyle = paintState.get("strokeColor");
  ctx.fillStyle = paintState.get("fillColor");
  function onMouseMove(event) {
    const {offsetX, offsetY} = event;
    const canvasX = offsetX;
    const canvasY = offsetY;
    if (!paintState.get("paintStatus")) {
      ctx?.beginPath();
      ctx?.moveTo(canvasX, canvasY);
    } else {
      ctx?.lineTo(canvasX, canvasY);
      ctx?.stroke();
    }
  }
  function onMouseDown(event) {
    setPaintStatus(true);
    if (paintState.get("colorMode") === "fill") {
      ctx.fillStyle = paintState.get("fillColor");
      ctx.fillRect(0, 0, 700, 700);
    } else {
      ctx.strokeStyle = paintState.get("strokeColor");
    }
  }
  function onMouseUp(event) {
    setPaintStatus(false);
  }
  function onMouseLeave(event) {
    setPaintStatus(false);
    ctx?.closePath();
  }
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", onMouseLeave);
  rangeElement.addEventListener("change", (event) => {
    const strokeWidth = event.target.value;
    setStrokeWidth(Number(strokeWidth));
    console.log(paintState.get("strokeWidth"));
    ctx.lineWidth = paintState.get("strokeWidth");
  });
  if (saveElement) {
    saveElement.addEventListener("click", () => {
      const aTag = document.createElement("a");
      aTag.href = canvas.toDataURL();
      aTag.download = "my_paint.png";
      aTag.click();
    });
  }
}
if (colorElements) {
  Array.from(colorElements).forEach((element) => {
    element.addEventListener("click", (event) => {
      if (element.classList.contains("on"))
        return;
      Array.from(colorElements).forEach((element2) => {
        element2.classList.remove("on");
      });
      element.classList.add("on");
      const color = event.target.value;
      const colorMode = paintState.get("colorMode");
      switch (colorMode) {
        case "stroke":
          setStrokeColor(color);
          break;
        case "fill":
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
    element.addEventListener("click", (event) => {
      if (element.classList.contains("on"))
        return;
      Array.from(colorModeElements).forEach((element2) => {
        element2.classList.remove("on");
      });
      element.classList.add("on");
      const colorMode = event.target.value;
      setColorMode(colorMode);
    });
  });
}
