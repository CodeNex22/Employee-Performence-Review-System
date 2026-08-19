/**
 * Server Entry Point
 * Initializes the Express application and starts the server
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const Logger = require('./utils/logger');
const { ENV } = require('./utils/constants');

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(
  envVar => !process.env[envVar] && !process.env[envVar.replace('MONGODB_URI', 'MONGO_URI')]
);

if (missingEnvVars.length > 0) {
  Logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  Logger.error('Please check your .env file and ensure all required variables are set');
  process.exit(1);
}

// MongoDB connection with retry logic
const connectToDatabase = async (retries = 3) => {
  const mongoUri = ENV.MONGODB_URI;

  if (!mongoUri) {
    Logger.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      Logger.info('✓ MongoDB connected successfully', {
        uri: mongoUri.replace(/:[^:]*@/, ':****@'), // Hide password
        attempt,
      });

      return; // Success
    } catch (error) {
      Logger.warn(`MongoDB connection attempt ${attempt}/${retries} failed`, {
        error: error.message,
      });

      if (attempt === retries) {
        Logger.error('Failed to connect to MongoDB after all retries', {
          totalAttempts: retries,
          lastError: error.message,
        });
        process.exit(1);
      }

      // Wait before retrying (exponential backoff)
      const waitTime = Math.pow(2, attempt) * 1000;
      Logger.info(`Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectToDatabase();

    // Start Express server
    const PORT = ENV.PORT || 5000;
    const server = app.listen(PORT, () => {
      Logger.info(`🚀 Server started successfully`, {
        port: PORT,
        environment: ENV.NODE_ENV,
        url: `http://localhost:${PORT}`,
      });

      Logger.info('Available endpoints:', {
        health: `http://localhost:${PORT}/api/health`,
        auth: `http://localhost:${PORT}/api/auth`,
        documentation: `http://localhost:${PORT}/api/docs`,
      });
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        Logger.error(`Port ${PORT} is already in use`, { error: error.message });
      } else {
        Logger.error('Server error', { error: error.message });
      }
      process.exit(1);
    });
  } catch (error) {
    Logger.error('Failed to start server', {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

// Start the server
startServer();