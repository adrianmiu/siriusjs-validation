/**
 * Returns a value from an object based on a path
 *
 * @param obj
 * @param path - ex: "username", "address[city]", "invoice_lines[2][product_id]"
 * @param default_value
 * @returns {*}
 */
function get (obj, path, default_value) {
  let first_open_braket = path.indexOf('[');
  let first_close_braket = path.indexOf(']');

  if (first_open_braket === -1) {
    return !obj ? default_value : (obj[path] || default_value);
  }

  let container = path.substr(0, first_open_braket);
  let remaining_path = path.substr(first_open_braket + 1, first_close_braket - first_open_braket - 1) + path.substr(first_close_braket + 1);

  return get(obj[container], remaining_path, default_value);
}

export default get
