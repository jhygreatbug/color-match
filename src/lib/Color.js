import { typeOf } from './utils';

const modes = ['rgba', 'rgb', 'hsla', 'hsl'];

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

class Color {
  value = []
  mode = ''
  constructor (value, mode) {
    if (typeof value === 'string') {
      if (!hexTestReg.test(value)) return;
      const hexMatch = value.match(hexMatchReg);
      if (hexMatch && hexMatch.length >= 3) {
        const value = [];
        for (let i = 0; i < 3; i ++) {
          value.push(hexToDecimal(hexMatch[i]));
        }
        if (hexMatch.length === 4) {
          value.push(hexMatch[3] / 255);
          this.mode = 'rgba';
        } else {
          this.mode = 'rgb';
        }
        this.value = value;
      }
    }
    if (typeOf(value) === 'Array') {
      if (!modes.includes(mode)) return;
      this.value = value.map(item => Math.round(item));
      this.mode = mode;
    }
  }
  toString () {
    const value = this.value;
    switch (this.mode) {
      case 'hsla':
        return `hsla(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`;
      case 'hsl':
        return `hsl(${value[0]}, ${value[1]}, ${value[2]})`;
      case 'rgba':
        return `rgb(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`;
      case 'rgb':
      default:
        return `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }
  }
  toHexString () {
    const value = this.value;
    if (value.length > 3) {
      return `#${decimalToHex(value[0])}${decimalToHex(value[1])}${decimalToHex(value[2])}${decimalToHex(value[3])}`;
    } else {
      return `#${decimalToHex(value[0])}${decimalToHex(value[1])}${decimalToHex(value[2])}`;
    }
  }
  interpolation (color, count) {
    if (!(color instanceof Color)) throw new TypeError();
    const start = this;
    const end = color;
    const step = divisionVector(subtractVector(end.value, start.value), count - 1);
    const colors = [start];
    for (let i = 1; i <= count - 2; i ++) {
      const cellColor = new Color(addVector(colors[colors.length - 1].value, step), 'rgb');
      colors.push(cellColor);
    }
    colors.push(end);
    return colors;
  }
}

export default Color;
