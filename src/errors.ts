/**
 * Converts something that's been thrown with `throw` to a JavaScript Object Notation (JSON) string.
 * `throw` can throw anything, including things that can't be reliably stringified.
 * @param e The thrown object to be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns 
 */
const stringifyThrown = (e: any, space?: string | number) => JSON.stringify(e, Object.getOwnPropertyNames(e), space);

export default {
  stringifyThrown,
};
