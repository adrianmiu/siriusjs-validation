import isNested from "./isNested";
import foreachInObject from './foreachInObject'

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
function flattenObject (obj, branch) {
  let result = {};
  if (isNested(obj)) {
    foreachInObject(obj, function(key, value) {
      let path = branch ? branch + '[' + key + ']' : key;
      result[path] = value;
      if (isNested(value)) {
        Object.assign(result, flattenObject(value, path));
      }
    });
  }
  return result;
}
export default flattenObject;
