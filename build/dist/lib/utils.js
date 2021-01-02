export function setColorToHex(color) {
  let changedColor = "";
  switch (color) {
    case "black":
      changedColor = "#000000";
      break;
    case "white":
      changedColor = "#ffffff";
      break;
    case "red":
      changedColor = "#ff3b30";
      break;
    case "orange":
      changedColor = "#ff9500";
      break;
    case "yellow":
      changedColor = "#ffcc00";
      break;
    case "green":
      changedColor = "#4cd962";
      break;
    case "blue":
      changedColor = "#0011ff";
      break;
    case "navy":
      changedColor = "#252081";
      break;
    case "purple":
      changedColor = "#6f00ff";
      break;
    default:
      break;
  }
  return changedColor;
}
