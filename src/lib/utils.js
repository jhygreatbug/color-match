export function typeOf (obj) {
  return Object.prototype.toString.call(obj).slice(8).slice(0, -1);
}
