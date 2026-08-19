/**
 * Express Application Setup
 * Main application configuration and middleware setup
 */

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Import utilities and middleware
const { errorHandler, asyncHandler } = require('./middleware/errorHandler');
const { initializeSecurityMiddleware, requestLogger } = require('./middleware/securityMiddleware');
const { sendSuccess, sendNotFound } = require('./utils/responseHandler');
const Logger = require('./utils/logger');
const { ENV, CORS_OPTIONS } = require('./utils/constants');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const hrRoutes = require('./routes/hrRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const goalRoutes = require('./routes/goalRoutes');
const selfAssessmentRoutes = require('./routes/selfAssessmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const taskRoutes = require('./routes/taskRoutes');
const goalReviewRoutes = require('./routes/goalReviewRoutes');
const taskReviewRoutes = require('./routes/taskReviewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// ============================================
// Global Middleware Setup
// ============================================

// Initialize security middleware (helmet, rate limiting, sanitization)
initializeSecurityMiddleware(app);

// CORS Configuration
app.use(cors(CORS_OPTIONS));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use(requestLogger);

// Static files serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// Health Check Route
// ============================================
app.get('/api/health', (req, res) => {
  return sendSuccess(res, 200, 'Server is running');
});

// ============================================
// API Routes
// ============================================
const apiRoutes = {
  '/api/auth': authRoutes,
  '/api/user': hrRoutes,
  '/api/update': userRoutes,
  '/api/profile': profileRoutes,
  '/api/departments': departmentRoutes,
  '/api/teams': teamRoutes,
  '/api/goals': goalRoutes,
  '/api/self-assessments': selfAssessmentRoutes,
  '/api/feedback': feedbackRoutes,
  '/api/tasks': taskRoutes,
  '/api/goal-reviews': goalReviewRoutes,
  '/api/task-reviews': taskReviewRoutes,
  '/api/notifications': notificationRoutes,
};

// Register all routes
Object.entries(apiRoutes).forEach(([path, route]) => {
  app.use(path, route);
  Logger.debug(`Route registered: ${path}`);
});

// ============================================
// 404 Error Handling
// ============================================
app.use((req, res) => {
  return sendNotFound(res, `Endpoint not found: ${req.method} ${req.originalUrl}`);
});

// ============================================
// Global Error Handler Middleware
// ============================================
app.use(errorHandler);

// ============================================
// Graceful Shutdown
// ============================================
process.on('SIGTERM', () => {
  Logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    Logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  Logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
  Logger.error('Uncaught Exception', {
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection', {
    reason: reason.message || reason,
    promise: promise.toString(),
  });
});

// Export app
module.exports = app;