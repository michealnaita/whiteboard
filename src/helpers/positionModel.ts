export default function determineModelCoords(
  initPosition: [number, number],
  window
): [number, number] {
  const model = {
    height: 320,
    width: 250,
  };
  const [initX, initY] = initPosition;
  let startX = initX;
  let startY = initY;
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (height - initY < model.height) {
    startY = height - model.height;
  }
  if (width - initX < model.width) {
    startX = width - model.width;
  }
  return [startX, startY];
}
