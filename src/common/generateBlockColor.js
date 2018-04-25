import Color from '../lib/Color';

export default function (topLeftColor) {
  if (!(topLeftColor instanceof Color)) {
    throw new TypeError();
  }
  const topRightColor = topLeftColor.hue(-20).saturation(-10);
  const bottomLeftColor = topLeftColor.lightness(-8);
  const bottomRightColor = bottomLeftColor.hue(-10).lightness(-8);
  return {topLeftColor, topRightColor, bottomLeftColor, bottomRightColor};
};
