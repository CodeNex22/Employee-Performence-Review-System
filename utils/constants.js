/**
 * Application Constants
 * Centralized constants for consistent application behavior
 */

// Environment variables with defaults
const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI,
  MAIL_SERVICE: process.env.MAIL_SERVICE || 'gmail',
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
};

// User roles
const ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

const ROLE_ARRAY = Object.values(ROLES);

// Performance review statuses
const REVIEW_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Goal statuses
const GOAL_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Feedback types
const FEEDBACK_TYPE = {
  PERFORMANCE: 'performance',
  BEHAVIORAL: 'behavioral',
  TECHNICAL: 'technical',
  COMMUNICATION: 'communication',
  GENERAL: 'general',
};

// Task statuses
const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
};

// HTTP status codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Email templates
const EMAIL_SUBJECTS = {
  PASSWORD_RESET: 'Password Reset Request',
  ACCOUNT_CREATION: 'Welcome to Performance Review System',
  REVIEW_REMINDER: 'Performance Review Reminder',
  FEEDBACK_REQUEST: 'Your Feedback is Requested',
  GOAL_CREATED: 'New Goal Assigned',
};

// Error messages
const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please login.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  INVALID_INPUT: 'Invalid input provided.',
  DUPLICATE_ENTRY: 'This entry already exists.',
  DATABASE_ERROR: 'Database operation failed.',
  INTERNAL_ERROR: 'Internal server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid username or password.',
  USER_NOT_FOUND: 'User not found.',
  INVALID_TOKEN: 'Invalid or expired token.',
};

// Success messages
const SUCCESS_MESSAGES = {
  OPERATION_SUCCESS: 'Operation completed successfully.',
  USER_CREATED: 'User created successfully.',
  USER_UPDATED: 'User updated successfully.',
  USER_DELETED: 'User deleted successfully.',
  LOGIN_SUCCESS: 'Login successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
  PASSWORD_RESET: 'Password reset successful.',
};

// File upload constraints
const FILE_UPLOAD = {
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  MAX_SIZE: ENV.MAX_FILE_SIZE,
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
};

// Regex patterns
const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

// CORS options
const CORS_OPTIONS = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Rate limiting defaults
const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // 100 requests per window
  LOGIN_WINDOW_MS: 15 * 60 * 1000,
  LOGIN_MAX_ATTEMPTS: 5,
};

module.exports = {
  ENV,
  ROLES,
  ROLE_ARRAY,
  REVIEW_STATUS,
  GOAL_STATUS,
  FEEDBACK_TYPE,
  TASK_STATUS,
  HTTP_STATUS,
  PAGINATION,
  EMAIL_SUBJECTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FILE_UPLOAD,
  PATTERNS,
  CORS_OPTIONS,
  RATE_LIMIT,
};
