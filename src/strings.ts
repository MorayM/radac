const TRUTHY_VALUES = ['yes', 'true', '1', 'y'];
const FALSY_VALUES = ['no', 'false', '0', 'n', ''];
const NULL_VALUES = ['null', 'na', 'n/a', 'no', 'n', '-', ''];

/**
 * Tests to see if a string is a value that could be considered truthy
 * e.g. 'TRUE', 'y', '1' etc.
 * @param str The string to be tested
 */
const isTruthy = (str: string) => TRUTHY_VALUES.includes(str.toLowerCase());

/**
 * Tests to see if a string is a value that could be considered falsy
 * e.g. 'FALSE', 'n', '0' etc.
 * @param str The string to be tested
 */
const isFalsy = (str: string) => FALSY_VALUES.includes(str.toLowerCase());

/**
 * Tests to see if a string is a value that could be considered null
 * e.g. 'null', 'n/a', '' etc.
 * @param str The string to be tested
 */
const isNull = (str: string) => NULL_VALUES.includes(str.toLowerCase());

/**
 * Automatically format a word into plural or singular against a count
 */
 const formatPlural = (word: string, count: number):string => {
  // Singular
  if (count === 1) return word;

  // Plural
  // Ends with s
  if (word.match(/s$/)) return `${word}'`;

  // Ends with y
  if (word.match(/[^aeiou]y$/)) return word.replace(/y$/, 'ies');

  // Default
  return `${word}s`;
};

/**
 * capitalise the first letter of every word in a scentence.
 * @param sentence
 */
 const convertWordsToUpperCase = (sentence: string) => sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

 export default {
  convertWordsToUpperCase,
  formatPlural,
  isFalsy,
  isNull,
  isTruthy,
 }