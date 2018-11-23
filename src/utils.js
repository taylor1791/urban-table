export function get(obj, path) {
  let result = obj;
  for (var i = 0; i < path.length; i++) {
    const key = path[i];
    result = result != null && result.hasOwnProperty(key) ? result[key] : null;
  }

  return result;
}
