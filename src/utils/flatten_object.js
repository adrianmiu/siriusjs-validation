import is_nested from "./is_nested";

/**
 * Recursive function to convert an deeply nested object into a 1-level object
 * [
 *    address: {
 *        'city': 'New York'
 *    }
 * }
 *
 * After flattenting will look like this
 * [
 *    address: {
 *        'city': 'New York'
 *    }
 *    'address[city]': 'New York'
 * }
 *
 * This way we will have all possible paths available in an object to compare with the selectors in the validator
 *
 * @param obj
 * @param branch
 * @returns {{}}
 */
function flatten_object (obj, branch) {
  let result = {};
  if (is_nested(obj)) {
    Object.keys(obj).forEach((key) => {
      let path = branch ? branch + '[' + key + ']' : key;
      let value = obj[key];
      result[path] = value;
      if (is_nested(value)) {
        Object.assign(result, flatten_object(value, path));
      }
    });
  }
  return result;
}
export default flatten_object;
