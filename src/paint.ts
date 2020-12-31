export let paintStatus = false;

// Setting paint status
export function setPaintStatus(isPainting: boolean) {
  paintStatus = isPainting;
  console.log({ paintStatus });
}
