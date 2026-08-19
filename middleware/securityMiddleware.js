/**
 * Security Middleware
 * Implements security best practices: helmet, rate limiting, input sanitization
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const { RATE_LIMIT } = require('../utils/constants');
const Logger = require('../utils/logger');

/**
 * Initialize all security middleware
 */
const initializeSecurityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Data sanitization against NoSQL injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Rate limiting middleware
  app.use('/api/', createRateLimiter());

  // Stricter rate limiting for login
  app.use('/api/auth/login', createLoginRateLimiter());

  Logger.info('Security middleware initialized');
};

/**
 * Create general rate limiter
 */
const createRateLimiter = () => {
  return rateLimit({
    windowMs: RATE_LIMIT.WINDOW_MS,
    max: RATE_LIMIT.MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    skip: (req) => {
      // Don't rate limit in development
      return process.env.NODE_ENV === 'development';
    },
    handler: (req, res) => {
      Logger.warn('Rate limit exceeded', {
        ip: req.ip,
        path: req.path,
        method: req.method,
      });
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    },
  });
};

/**
 * Create stricter rate limiter for login attempts
 */
const createLoginRateLimiter = () => {
  return rateLimit({
    windowMs: RATE_LIMIT.LOGIN_WINDOW_MS,
    max: RATE_LIMIT.LOGIN_MAX_ATTEMPTS,
    message: 'Too many login attempts. Please try again after 15 minutes.',
    skipSuccessfulRequests: true, // Don't count successful attempts
    handler: (req, res) => {
      Logger.warn('Login rate limit exceeded', {
        ip: req.ip,
        username: req.body?.username,
      });
      res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again later.',
      });
    },
  });
};

/**
 * Middleware to log requests
 */
const requestLogger = (req, res, next) => {
  Logger.logRequest(req);
  
  // Capture response status
  const originalJson = res.json;
  res.json = function (data) {
    Logger.logResponse(req, res.statusCode, process.env.NODE_ENV === 'development' ? data : null);
    return originalJson.call(this, data);
  };
  
  next();
};

/**
 * CORS configuration middleware
 */
const corsConfig = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
};

module.exports = {
  initializeSecurityMiddleware,
  createRateLimiter,
  createLoginRateLimiter,
  requestLogger,
  corsConfig,
};
