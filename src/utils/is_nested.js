export default function (obj) {
  return obj && (Array.isArray(obj) || (typeof obj === 'object' && Object.keys(obj).length > 0));
}
