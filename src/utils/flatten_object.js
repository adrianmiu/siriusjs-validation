import is_nested from "./is_nested";

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
