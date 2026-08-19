/**
 * Input Validation Utilities
 * Provides common validation patterns for user inputs
 */

const { AppError } = require('../middleware/errorHandler');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @throws {AppError} If email is invalid
 */
const validateEmail = (email) => {
  if (!email || !emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }
};

/**
 * Validate password strength
 * Requirements: min 8 chars, uppercase, lowercase, number, special char
 * @param {string} password - Password to validate
 * @throws {AppError} If password is weak
 */
const validatePassword = (password) => {
  if (!password || password.length < 8) {
    throw new AppError('Password must be at least 8 characters long', 400);
  }
  if (!passwordRegex.test(password)) {
    throw new AppError(
      'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)',
      400
    );
  }
};

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @throws {AppError} If username is invalid
 */
const validateUsername = (username) => {
  if (!username || !usernameRegex.test(username)) {
    throw new AppError('Username must be 3-20 chars (alphanumeric, underscore, hyphen only)', 400);
  }
};

/**
 * Validate required fields
 * @param {object} data - Object containing fields to validate
 * @param {array} fields - Array of required field names
 * @throws {AppError} If any required field is missing
 */
const validateRequiredFields = (data, fields) => {
  const missingFields = fields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
  }
};

/**
 * Validate enum values
 * @param {string} value - Value to check
 * @param {array} allowedValues - Array of allowed values
 * @param {string} fieldName - Name of the field (for error message)
 * @throws {AppError} If value is not in allowed values
 */
const validateEnum = (value, allowedValues, fieldName = 'field') => {
  if (!allowedValues.includes(value)) {
    throw new AppError(
      `Invalid ${fieldName}. Allowed values: ${allowedValues.join(', ')}`,
      400
    );
  }
};

/**
 * Validate MongoDB ObjectId
 * @param {string} id - ID to validate
 * @throws {AppError} If ID is invalid
 */
const validateObjectId = (id) => {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new AppError('Invalid ID format', 400);
  }
};

/**
 * Validate pagination parameters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {object} Validated pagination object
 */
const validatePagination = (page, limit) => {
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.min(Math.max(1, parseInt(limit) || 10), 100);
  return { page: validatedPage, limit: validatedLimit };
};

/**
 * Sanitize input string (prevent XSS)
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>\"']/g, '')
    .substring(0, 1000); // Limit to 1000 chars
};

/**
 * Validate role
 * @param {string} role - Role to validate
 * @throws {AppError} If role is invalid
 */
const validateRole = (role) => {
  const validRoles = ['employee', 'manager', 'hr', 'admin'];
  validateEnum(role, validRoles, 'role');
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateRequiredFields,
  validateEnum,
  validateObjectId,
  validatePagination,
  sanitizeInput,
  validateRole,
  emailRegex,
  passwordRegex,
  usernameRegex,
};
