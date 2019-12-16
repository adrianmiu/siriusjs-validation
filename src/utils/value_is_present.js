export default function (value) {
  return Array.isArray(value) ? value.length > 0 : (value === false || value === 0) ? true : !!value;
}
