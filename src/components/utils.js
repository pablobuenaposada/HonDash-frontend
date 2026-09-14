// Small color helpers shared between the dashboard components.
// Colors come from the setup so they can be anything the browser understands
// (named colors, hex, rgb()...), that's why they get resolved through a canvas.
const colorCache = {};
let colorCanvas = null;

function colorToRgb(color) {
  if (!color) {
    return null;
  }
  if (color in colorCache) {
    return colorCache[color];
  }

  if (colorCanvas === null) {
    colorCanvas = document.createElement("canvas");
    colorCanvas.width = 1;
    colorCanvas.height = 1;
  }
  const context = colorCanvas.getContext("2d");
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = "#000000";
  context.fillStyle = color; // an invalid color leaves the previous one in place
  context.fillRect(0, 0, 1, 1);

  const pixel = context.getImageData(0, 0, 1, 1).data;
  // fully transparent colors ("transparent", "none"...) count as no color
  const rgb = pixel[3] === 0 ? null : { r: pixel[0], g: pixel[1], b: pixel[2] };
  colorCache[color] = rgb;
  return rgb;
}

function rgbChannels(color) {
  const rgb = colorToRgb(color);
  return rgb === null ? "0,0,0" : `${rgb.r},${rgb.g},${rgb.b}`;
}

function isDarkColor(color) {
  const rgb = colorToRgb(color);
  if (rgb === null) {
    return false;
  }
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 < 0.55;
}

// black or white, whichever reads better on top of the given color
function contrastingColor(color) {
  return isDarkColor(color) ? "#ffffff" : "#111111";
}

// mixes a color towards black (amount < 0) or white (amount > 0)
function shadeColor(color, amount) {
  const rgb = colorToRgb(color);
  if (rgb === null) {
    return color;
  }
  const target = amount > 0 ? 255 : 0;
  const ratio = Math.abs(amount);
  const mix = (channel) => Math.round(channel + (target - channel) * ratio);
  return `rgb(${mix(rgb.r)},${mix(rgb.g)},${mix(rgb.b)})`;
}
