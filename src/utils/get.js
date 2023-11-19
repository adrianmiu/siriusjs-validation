/**
 * Returns a value from an object based on a path
 *
 * @param {Object|null} obj
 * @param {string} path - ex: "username", "address[city]", "invoice_lines[2][product_id]"
 * @param {*} defaultValue
 * @returns {*}
 */
function get (obj, path, defaultValue) {
  let firstOpenBracket = path.indexOf('[');
  let firstCloseBracket = path.indexOf(']');

  if (firstOpenBracket === -1) {
    return !obj ? defaultValue : (obj[path] || defaultValue);
  }

  let container = path.substring(0, firstOpenBracket);
  let remaining_path = path.substring(firstOpenBracket + 1, firstCloseBracket) + path.substring(firstCloseBracket + 1);

  return get(obj[container], remaining_path, defaultValue);
}

export default get
