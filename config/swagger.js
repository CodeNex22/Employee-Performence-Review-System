/**
 * Swagger/OpenAPI Documentation Setup
 * Provides API documentation accessible at /api/docs
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { ENV } = require('../utils/constants');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Employee Performance Review System API',
    version: '1.0.0',
    description: 'API documentation for the Employee Performance Review System backend',
    contact: {
      name: 'Support Team',
      email: 'support@yourcompany.com',
    },
    license: {
      name: 'ISC',
    },
  },
  servers: [
    {
      url: `${ENV.BACKEND_URL}/api`,
      description: `${ENV.NODE_ENV} server`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token in Authorization header (Bearer token)',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['employee', 'manager', 'hr', 'admin'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          statusCode: { type: 'number' },
          message: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
      PaginatedResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { type: 'array' },
          pagination: {
            type: 'object',
            properties: {
              total: { type: 'number' },
              page: { type: 'number' },
              limit: { type: 'number' },
              totalPages: { type: 'number' },
              hasNextPage: { type: 'boolean' },
              hasPreviousPage: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Swagger options
const options = {
  definition: swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js'],
};

// Generate Swagger spec
const swaggerSpec = swaggerJsdoc(options);

/**
 * Setup Swagger documentation
 * @param {Express.Application} app - Express application
 */
const setupSwaggerDocs = (app) => {
  // Serve Swagger UI
  app.use('/api/docs', swaggerUi.serve);
  app.get('/api/docs', swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: '/api/swagger.json',
      deepLinking: true,
      presets: [
        swaggerUi.presets.apis,
        swaggerUi.SwaggerUIBundle.SwaggerUIStandalonePreset,
      ],
      layout: 'StandaloneLayout',
    },
  }));

  // Serve raw Swagger JSON
  app.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = { setupSwaggerDocs, swaggerSpec };
