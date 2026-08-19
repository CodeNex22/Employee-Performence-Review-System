# Development Guidelines

This document provides guidelines for developing and maintaining the Employee Performance Review System.

## Architecture Overview

### Layered Architecture

```
┌─────────────────────────────┐
│      Routes (API Layer)     │  - Defines endpoints
├─────────────────────────────┤
│   Controllers (Logic Layer)  │  - Request handling
├─────────────────────────────┤
│      Models (Data Layer)     │  - Database schemas
└─────────────────────────────┘
        ↓
    MongoDB Database
```

### Request Flow

```
Client Request
     ↓
Route Handler
     ↓
Middleware (Auth, Validation)
     ↓
Controller Logic
     ↓
Model Operations
     ↓
Database
     ↓
Response Handler
     ↓
Client Response
```

## Key Principles

### 1. Separation of Concerns

- **Routes**: Define endpoints only
- **Controllers**: Handle business logic
- **Models**: Define data structures
- **Middleware**: Handle cross-cutting concerns
- **Utils**: Provide helper functions

### 2. Error Handling

All errors should be caught and handled using the centralized error handler:

```javascript
const { asyncHandler, AppError } = require('../middleware/errorHandler');

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
});
```

### 3. Response Format

Always use the response handler for consistent responses:

```javascript
const { sendSuccess, sendError } = require('../utils/responseHandler');

// Success
sendSuccess(res, 200, 'Success message', data);

// Error
sendError(res, 400, 'Error message');
```

### 4. Validation

Use validation utilities for all inputs:

```javascript
const { validateEmail, validatePassword } = require('../utils/validators');

try {
  validateEmail(email);
  validatePassword(password);
} catch (error) {
  throw error; // Will be caught by error handler
}
```

### 5. Logging

Use the logger for debugging and monitoring:

```javascript
const Logger = require('../utils/logger');

Logger.info('User created', { userId: user._id });
Logger.error('Database error', { error: error.message });
Logger.debug('Debug info', { data });
```

## Development Workflow

### 1. Setting Up a New Feature

```bash
# Create feature branch
git checkout -b feature/feature-name

# Install dependencies (if needed)
npm install new-package

# Start development server
npm run dev
```

### 2. Creating a New Endpoint

```javascript
// 1. Define model (models/Model.js)
const schema = new mongoose.Schema({ /* ... */ });

// 2. Create controller (controllers/modelController.js)
exports.getAll = asyncHandler(async (req, res) => {
  const items = await Model.find();
  return sendSuccess(res, 200, 'Items retrieved', items);
});

// 3. Create routes (routes/modelRoutes.js)
router.get('/', authenticate, modelController.getAll);

// 4. Register route (app.js)
app.use('/api/models', modelRoutes);
```

### 3. Adding Validation

```javascript
// In controller
exports.create = asyncHandler(async (req, res) => {
  // Validate input
  validateRequiredFields(req.body, ['name', 'email']);
  validateEmail(req.body.email);

  // Process
  const item = await Model.create(req.body);
  return sendCreated(res, 'Item created', item);
});
```

### 4. Writing Tests

```javascript
describe('User Controller', () => {
  it('should retrieve all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

## Database Design

### Schema Guidelines

```javascript
const schema = new mongoose.Schema({
  // Essential fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // Relationships
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // Soft delete
  isDeleted: { type: Boolean, default: false },
});

// Indexes for performance
schema.index({ email: 1, isDeleted: 1 });
```

### Relationships

- Use references (`ref`) for related documents
- Populate references when needed
- Use virtuals for computed fields

```javascript
// Get user with populated department
const user = await User.findById(id).populate('departmentId');
```

## Performance Tips

### 1. Indexing

```javascript
// Add indexes for frequently queried fields
schema.index({ email: 1 });
schema.index({ createdAt: -1 });
schema.index({ userId: 1, status: 1 }); // Compound index
```

### 2. Pagination

```javascript
const { getPaginationParams } = require('../utils/pagination');
const { page, limit, skip } = getPaginationParams(req.query.page, req.query.limit);

const items = await Model.find()
  .skip(skip)
  .limit(limit);
```

### 3. Lean Queries

```javascript
// Use lean() for read-only queries (faster)
const users = await User.find().lean();
```

### 4. Select Fields

```javascript
// Only select needed fields
const users = await User.find()
  .select('name email role')
  .lean();
```

## Security Best Practices

### 1. Authentication

```javascript
// Use JWT with secure settings
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
```

### 2. Input Validation & Sanitization

```javascript
// Validate all inputs
validateEmail(email);
const sanitized = sanitizeInput(userInput);
```

### 3. Password Hashing

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 4. Authorization

```javascript
// Check user role
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError('Unauthorized', 403);
  }
  next();
};

router.delete('/:id', authenticate, authorize(['admin']), deleteItem);
```

### 5. Rate Limiting

Rate limiting is automatically applied via middleware.

## Debugging

### Using Logger

```javascript
Logger.debug('Current state', { user, data });
Logger.error('Operation failed', error);
```

### Console in Development

```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

### MongoDB Query Debugging

```javascript
// Enable mongoose debugging
mongoose.set('debug', true);
```

## Deployment Checklist

- [ ] All environment variables set
- [ ] Tests passing
- [ ] No console.log statements
- [ ] .env file not committed
- [ ] Database migrations completed
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Error handling verified
- [ ] Logging configured
- [ ] SSL/TLS enabled
- [ ] CORS configured properly
- [ ] Documentation updated

## Useful Commands

```bash
# Development
npm run dev              # Start with hot reload

# Testing
npm test                 # Run tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # Coverage report

# Linting
npm run lint            # Check code style
npm run lint:fix        # Fix code style

# Production
npm start               # Start server
NODE_ENV=production npm start

# Database
mongosh mongodb://localhost:27017/db  # MongoDB CLI
```

## Troubleshooting

### MongoDB Connection Issues

```
Error: connect ECONNREFUSED
Solution: Ensure MongoDB is running
```

### JWT Token Issues

```
Error: Invalid token
Solution: Verify JWT_SECRET matches in .env
```

### Port Already in Use

```
Error: EADDRINUSE
Solution: Kill process on port: lsof -i :5000
```

## Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
