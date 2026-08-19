/**
 * Pagination Utility
 * Handles pagination logic for database queries
 */

const { PAGINATION } = require('../utils/constants');

/**
 * Calculate pagination parameters
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {object} Skip and limit values for MongoDB query
 */
const getPaginationParams = (page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) => {
  const validPage = Math.max(1, parseInt(page) || PAGINATION.DEFAULT_PAGE);
  const validLimit = Math.min(Math.max(1, parseInt(limit) || PAGINATION.DEFAULT_LIMIT), PAGINATION.MAX_LIMIT);
  
  const skip = (validPage - 1) * validLimit;
  
  return {
    page: validPage,
    limit: validLimit,
    skip,
  };
};

/**
 * Build pagination metadata
 * @param {number} total - Total number of documents
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {object} Pagination metadata
 */
const buildPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    startIndex: (page - 1) * limit,
    endIndex: Math.min(page * limit, total),
  };
};

/**
 * Paginate array
 * @param {array} array - Array to paginate
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {object} Paginated data and metadata
 */
const paginateArray = (array, page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) => {
  const { skip, limit: validLimit } = getPaginationParams(page, limit);
  const total = array.length;
  const data = array.slice(skip, skip + validLimit);
  const pagination = buildPaginationMeta(total, page, validLimit);
  
  return {
    data,
    pagination,
  };
};

/**
 * Sort helper for paginated queries
 * @param {string} sortBy - Field to sort by (e.g., "createdAt" or "-createdAt" for desc)
 * @returns {object} MongoDB sort object
 */
const getSortObject = (sortBy = '-createdAt') => {
  const sort = {};
  
  if (!sortBy) {
    return { createdAt: -1 }; // Default sort
  }
  
  const field = sortBy.startsWith('-') ? sortBy.slice(1) : sortBy;
  const direction = sortBy.startsWith('-') ? -1 : 1;
  
  sort[field] = direction;
  return sort;
};

/**
 * Validate and sanitize sort parameter
 * @param {string} sortBy - Sort parameter from query
 * @param {array} allowedFields - Allowed fields to sort by
 * @returns {object} MongoDB sort object
 */
const validateSortParam = (sortBy, allowedFields = []) => {
  let field = sortBy?.startsWith('-') ? sortBy.slice(1) : sortBy;
  
  if (!field || (allowedFields.length > 0 && !allowedFields.includes(field))) {
    return { createdAt: -1 };
  }
  
  const direction = sortBy?.startsWith('-') ? -1 : 1;
  return { [field]: direction };
};

module.exports = {
  getPaginationParams,
  buildPaginationMeta,
  paginateArray,
  getSortObject,
  validateSortParam,
};
