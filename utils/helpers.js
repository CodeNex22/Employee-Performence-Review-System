/**
 * Common Helper Functions
 * Utility functions used across the application
 */

const crypto = require('crypto');

/**
 * Generate a random token
 * @param {number} length - Token length in bytes
 * @returns {string} Random hex token
 */
const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Check if value is empty
 * @param {any} value - Value to check
 * @returns {boolean} True if empty
 */
const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

/**
 * Check if value is a valid MongoDB ObjectId
 * @param {string} id - ID to check
 * @returns {boolean} True if valid ObjectId
 */
const isValidObjectId = (id) => {
  return id && id.match(/^[0-9a-fA-F]{24}$/);
};

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge objects recursively
 * @param {object} target - Target object
 * @param {object} source - Source object
 * @returns {object} Merged object
 */
const deepMerge = (target, source) => {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

/**
 * Check if value is an object
 * @param {any} value - Value to check
 * @returns {boolean} True if object
 */
const isObject = (value) => {
  return value && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert camelCase to snake_case
 * @param {string} str - String to convert
 * @returns {string} snake_case string
 */
const camelCaseToSnakeCase = (str) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

/**
 * Convert snake_case to camelCase
 * @param {string} str - String to convert
 * @returns {string} camelCase string
 */
const snakeCaseToCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function execution with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Initial delay in ms
 * @returns {Promise} Function result
 */
const retry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(delay * Math.pow(2, i));
    }
  }
};

/**
 * Get difference between two dates in seconds
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Difference in seconds
 */
const getDateDiffInSeconds = (date1, date2) => {
  return Math.abs(Math.floor((date1 - date2) / 1000));
};

/**
 * Format bytes to human readable format
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

module.exports = {
  generateToken,
  isEmpty,
  isValidObjectId,
  deepClone,
  deepMerge,
  isObject,
  capitalizeFirstLetter,
  camelCaseToSnakeCase,
  snakeCaseToCamelCase,
  sleep,
  retry,
  getDateDiffInSeconds,
  formatBytes,
};
