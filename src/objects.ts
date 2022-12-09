// Recursively removes keys in array
const removeKeys = (obj: any, keys: string[] = []) => {
  for (const key in obj) {
    if (keys.includes(key)) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeKeys(obj[key], keys);
    }
  }
  return obj;
};

/**
 * Recursively checks object to see if it contains property
 * @param object - Object to check
 * @param propertyName - Property name to look for
 */
const hasDeepProperty = (object: any, propertyName: string): boolean => !!Object.keys(object).find((k) => {
  if (k === propertyName) {
    return true;
  }
  if (object[k] && typeof object[k] === 'object') {
    return hasDeepProperty(object[k], propertyName);
  }

  return false;
});

export default {
  hasDeepProperty,
  removeKeys,
}