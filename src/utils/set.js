/**
 * Set a value for a path into an object
 *
 * @param obj
 * @param path - ex: "username", "address[city]", "invoice_lines[2][product_id]"
 * @param value
 * @returns {*}
 */
function set(obj, path, value) {
  let parts = path.replace(/\]/g, '').split('[');
  let working_obj = obj;

  parts.map(function(part, idx) {
    if (idx === parts.length - 1) {
      working_obj[part] = value;
      return;
    }

    if (!working_obj[part]) {
      let next_part = parts[idx + 1];
      working_obj[part] = (next_part == parseInt(next_part)) ? [] : {};
    }

    working_obj = working_obj[part];

  });

  return obj;

}

export default set
