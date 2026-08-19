/**
 * API Response Handler
 * Standardizes API responses across the application
 */

const { HTTP_STATUS } = require('../utils/constants');

/**
 * Send success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {any} data - Response data
 * @param {object} pagination - Pagination info (optional)
 */
const sendSuccess = (res, statusCode = HTTP_STATUS.OK, message = 'Success', data = null, pagination = null) => {
  const response = {
    success: true,
    statusCode,
    message,
    timestamp: new Date(),
  };

  if (data !== null) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send paginated success response
 * @param {object} res - Express response object
 * @param {array} data - Array of data items
 * @param {number} total - Total number of items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {string} message - Response message
 * @param {number} statusCode - HTTP status code
 */
const sendPaginatedSuccess = (res, data, total, page, limit, message = 'Success', statusCode = HTTP_STATUS.OK) => {
  const totalPages = Math.ceil(total / limit);
  
  return sendSuccess(
    res,
    statusCode,
    message,
    data,
    {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }
  );
};

/**
 * Send error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {any} error - Error details (optional)
 */
const sendError = (res, statusCode = HTTP_STATUS.INTERNAL_ERROR, message = 'Error', error = null) => {
  const response = {
    success: false,
    statusCode,
    message,
    timestamp: new Date(),
  };

  if (error && process.env.NODE_ENV === 'development') {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send created response (201)
 * @param {object} res - Express response object
 * @param {string} message - Response message
 * @param {any} data - Created resource data
 */
const sendCreated = (res, message = 'Resource created successfully', data = null) => {
  return sendSuccess(res, HTTP_STATUS.CREATED, message, data);
};

/**
 * Send no content response (204)
 * @param {object} res - Express response object
 */
const sendNoContent = (res) => {
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: 'Operation completed',
    timestamp: new Date(),
  });
};

/**
 * Send not found response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendNotFound = (res, message = 'Resource not found') => {
  return sendError(res, HTTP_STATUS.NOT_FOUND, message);
};

/**
 * Send unauthorized response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendUnauthorized = (res, message = 'Unauthorized access') => {
  return sendError(res, HTTP_STATUS.UNAUTHORIZED, message);
};

/**
 * Send forbidden response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendForbidden = (res, message = 'Access forbidden') => {
  return sendError(res, HTTP_STATUS.FORBIDDEN, message);
};

/**
 * Send bad request response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendBadRequest = (res, message = 'Invalid request') => {
  return sendError(res, HTTP_STATUS.BAD_REQUEST, message);
};

/**
 * Send conflict response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendConflict = (res, message = 'Resource already exists') => {
  return sendError(res, HTTP_STATUS.CONFLICT, message);
};

module.exports = {
  sendSuccess,
  sendPaginatedSuccess,
  sendError,
  sendCreated,
  sendNoContent,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
  sendBadRequest,
  sendConflict,
};
