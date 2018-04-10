import { typeOf } from './utils';

const modes = ['rgba', 'rgb', 'hsla', 'hsl'];

const RgbRightBondary = 255;
const hexTestReg = /^#([0-9a-f]{2}){3,4}$/;
const hexMatchReg = /[0-9a-f]{2}/g;
const hexToDecimal = hex => parseInt(hex, 16);
const decimalToHex = decimal => decimal.toString(16);

function addVector(v1, v2) {
  return v1.map((item, index) => v1[index] + v2[index]);
}

function subtractVector(v1, v2) {
  return v1.map((item, index) => v1[index] - v2[index]);
}

function divisionVector(v1, num) {
  return v1.map(item => item / num);
}

function zoom01(num, rightBondary) {
  if (rightBondary === 0) throw new Error('zoom01: divisor is 0');
  return Math.max(Math.min(num, rightBondary), 0) / rightBondary;
}

function rgbToHsl(r, g, b) {
  r = zoom01(r, RgbRightBondary);
  g = zoom01(g, RgbRightBondary);
  b = zoom01(b, RgbRightBondary);
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const dist = max - min;
  const sum = max + min;
  let h, s, l;
  if (dist === 0) {
    h = 0;
    s = 0;
  } else {
    s = l <= 0.5 ? dist / sum : dist / (2 - sum);
    switch (max) {
      case r:
        h = (g - b) / dist * 60 + (g >= dist ? 0 : 360);
        break;
      case g:
        h = (b - r) / dist * 60 + 120;
        break;
      case b:
        h = (r - g) / dist * 60 + 240;
        break;
    }
  }
  l = sum / 2;
  return [h, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  const m1 = l * 2 - m2;
  const r = hueToRgb(m1, m2, h + 1 / 3) * RgbRightBondary;
  const g = hueToRgb(m1, m2, h) * RgbRightBondary;
  const b = hueToRgb(m1, m2, h - 1 / 3) * RgbRightBondary;
  return [r, g, b];
}

function hueToRgb(m1, m2, h) {
  if (h < 0) h += 1;
  if (h > 1) h -= 1;
  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
  if (h * 2 < 1) return m2;
  if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  return m1;
}

class Color {
  value = []
  alpha = 1
  mode = ''
  constructor(value, mode) {
    if (value instanceof Color) {
      this.value = value.value;
      this.alpha = value.alpha;
      this.mode = value.mode;
    }
    if (typeof value === 'string') {
      if (!hexTestReg.test(value)) return;
      const hexMatch = value.match(hexMatchReg);
      if (hexMatch && hexMatch.length >= 3) {
        const value = [];
        for (let i = 0; i < 3; i++) {
          value.push(hexToDecimal(hexMatch[i]));
        }
        if (hexMatch.length === 4) {
          this.alpha = hexMatch[3] / 255;
          this.mode = 'rgba';
        } else {
          this.mode = 'rgb';
        }
        this.value = value;
      }
    }
    if (typeOf(value) === 'Array') {
      if (!modes.includes(mode)) return;
      this.value = value.slice(0, 3);
      if (value.length === 4) {
        this.alpha = value[3];
      }
      this.mode = mode;
    }
  }
  toRgb() {
    if (this.mode.indexOf('rgb') >= 0) return new Color(this);
    let value = hslToRgb(...this.value);
    let mode = 'rgb';
    if (this.alpha !== 1) {
      value[3] = alpha;
      mode = 'rgba';
    }
    return new Color(value, mode);
  }
  toString() {
    const value = this.value;
    switch (this.mode) {
      case 'hsl':
        return `hsl(${value[0]}, ${Math.round(value[1])}%, ${Math.round(value[2])}%)`;
      case 'hsla':
        return `hsla(${value[0]}, ${Math.round(value[1])}%, ${Math.round(value[2])}%, ${this.alpha})`;
      case 'rgb':
        return `rgb(${value.map(n => Math.round(n)).join(', ')})`;
      case 'rgba':
      default:
        return `rgba(${value.map(n => Math.round(n)).join(', ')}, ${this.alpha})`;
    }
  }
  toHexString() {
    return this.value.map(n => decimalToHex(Math.round(n))).join('');
  }
  static interpolation(startColor, endColor, count) {
    if (!(startColor instanceof Color) ||
      !(endColor instanceof Color)
    ) {
      throw new TypeError();
    }
    if (count === 0) return [];
    const start = startColor.toRgb();
    if (count === 1) return [start];
    const end = endColor.toRgb();
    const step = divisionVector(subtractVector(end.value, start.value), count - 1);
    const colors = [start];
    for (let i = 1; i <= count - 2; i++) {
      const cellColor = new Color(addVector(colors[colors.length - 1].value, step), 'rgb');
      colors.push(cellColor);
    }
    colors.push(end);
    return colors;
  }
  static interpolation2d(topLeftColor, topRightColor, bottomLeftColor, bottomRightColor, width, height) {
    if (!(topLeftColor instanceof Color) ||
      !(topRightColor instanceof Color) ||
      !(bottomLeftColor instanceof Color) ||
      !(bottomRightColor instanceof Color)
    ) {
      throw new TypeError();
    }
    if (width === 0 || height === 0) return [];
    if (height === 1) {
      return [Color.interpolation(topLeftColor.toRgb(), bottomRightColor.toRgb(), width)];
    }
    const lineHeads = Color.interpolation(topLeftColor.toRgb(), bottomLeftColor.toRgb(), height);
    const lineTails = Color.interpolation(topRightColor.toRgb(), bottomRightColor.toRgb(), height);
    return lineHeads.map((item, index) => Color.interpolation(lineHeads[index], lineTails[index], width));
  }
  hue(num) {
    const value = this.mode.indexOf('hsl') >= 0 ? this.value.concat([]) : rgbToHsl(...this.value);
    let mode = 'hsl';
    value[0] += num;
    if (this.alpha !== 1) {
      mode = 'hsla';
      value[3] = this.alpha;
    }
    return new Color(value, mode);
  }
  saturation(num) {
    const value = this.mode.indexOf('hsl') >= 0 ? this.value.concat([]) : rgbToHsl(...this.value);
    let mode = 'hsl';
    value[1] += num;
    if (this.alpha !== 1) {
      mode = 'hsla';
      value[3] = this.alpha;
    }
    return new Color(value, mode);
  }
  lightness(num) {
    const value = this.mode.indexOf('hsl') >= 0 ? this.value.concat([]) : rgbToHsl(...this.value);
    let mode = 'hsl';
    value[2] += num;
    if (this.alpha !== 1) {
      mode = 'hsla';
      value[3] = this.alpha;
    }
    return new Color(value, mode);
  }
}

export default Color;
