export default function(obj, callback) {
  return Object.keys(obj).forEach(function(key) {
    return callback(key, obj[key]);
  });
}
