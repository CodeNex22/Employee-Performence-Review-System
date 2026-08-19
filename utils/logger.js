/**
 * Logger Utility
 * Provides structured logging for development and production
 */

const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

// ANSI color codes for terminal output
const COLORS = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m', // Yellow
  INFO: '\x1b[36m', // Cyan
  DEBUG: '\x1b[35m', // Magenta
  RESET: '\x1b[0m',
};

/**
 * Format log message with timestamp
 */
const formatMessage = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const color = COLORS[level] || '';
  const reset = COLORS.RESET;
  
  let logString = `[${timestamp}] ${level}`;
  
  if (process.env.NODE_ENV === 'development') {
    logString = `${color}${logString}${reset}`;
  }
  
  logString += `: ${message}`;
  
  if (data) {
    logString += `\n${JSON.stringify(data, null, 2)}`;
  }
  
  return { timestamp, level, message, data, logString };
};

/**
 * Write log to file
 */
const writeToFile = (level, message, data) => {
  const logDir = path.join(__dirname, '../logs');
  const logFile = path.join(logDir, `${level.toLowerCase()}-${new Date().toISOString().split('T')[0]}.log`);
  
  const formattedLog = formatMessage(level, message, data);
  
  try {
    fs.appendFileSync(logFile, formattedLog.logString + '\n', 'utf8');
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
};

/**
 * Logger class
 */
class Logger {
  /**
   * Log error messages
   */
  static error(message, data = null) {
    const { logString } = formatMessage(LOG_LEVELS.ERROR, message, data);
    console.error(logString);
    
    if (process.env.NODE_ENV === 'production') {
      writeToFile(LOG_LEVELS.ERROR, message, data);
    }
  }

  /**
   * Log warning messages
   */
  static warn(message, data = null) {
    const { logString } = formatMessage(LOG_LEVELS.WARN, message, data);
    console.warn(logString);
    
    if (process.env.NODE_ENV === 'production') {
      writeToFile(LOG_LEVELS.WARN, message, data);
    }
  }

  /**
   * Log info messages
   */
  static info(message, data = null) {
    const { logString } = formatMessage(LOG_LEVELS.INFO, message, data);
    console.log(logString);
    
    if (process.env.NODE_ENV === 'production') {
      writeToFile(LOG_LEVELS.INFO, message, data);
    }
  }

  /**
   * Log debug messages (development only)
   */
  static debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      const { logString } = formatMessage(LOG_LEVELS.DEBUG, message, data);
      console.log(logString);
    }
  }

  /**
   * Log API request
   */
  static logRequest(req) {
    this.debug(`${req.method} ${req.path}`, {
      query: req.query,
      params: req.params,
      userId: req.user?._id,
      userRole: req.user?.role,
    });
  }

  /**
   * Log API response
   */
  static logResponse(req, statusCode, data = null) {
    this.debug(`${req.method} ${req.path} - ${statusCode}`, {
      userId: req.user?._id,
      timestamp: new Date(),
      ...(data && { data }),
    });
  }
}

module.exports = Logger;
