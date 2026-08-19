# Quick Start Guide

Get up and running with the Employee Performance Review System in 5 minutes!

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

## Installation Steps

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/Employee-Performance-Review-System.git
cd Employee-Performance-Review-System
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create `.env` file from example:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/employee-review-system

# JWT
JWT_SECRET=your_secret_key_here_change_in_production

# Email (Optional)
MAIL_SERVICE=gmail
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

# Client
FRONTEND_URL=http://localhost:3000
```

### 4️⃣ Start MongoDB (if local)

```bash
# Windows
mongod

# macOS/Linux
mongod --dbpath /usr/local/var/mongodb
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

Server starts on `http://localhost:5000` ✅

## Test the API

### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Register First User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "Password123@",
    "role": "hr",
    "hrDetails": {}
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Password123@"
  }'
```

Response includes JWT token:
```json
{
  "success": true,
  "message": "HR login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "role": "hr"
}
```

### Use Token in Requests

```bash
# Set Authorization header with Bearer token
curl -X GET http://localhost:5000/api/user/all-users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Tasks

### Run Tests

```bash
# Run all tests
npm test

# Run with watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Check Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### View API Documentation

Once server is running, visit:
```
http://localhost:5000/api/docs
```

Swagger UI will display all available endpoints.

## Common Issues

### ❌ MongoDB Connection Error

```
Error: Could not connect to MongoDB
```

**Solution:**
- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env`
- Verify connection string format

### ❌ Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### ❌ Invalid JWT Token

```
Error: Invalid token
```

**Solution:**
- Verify `JWT_SECRET` in `.env` is set
- Check token isn't expired
- Ensure Authorization header format: `Bearer YOUR_TOKEN`

### ❌ Email Not Sending

```
Error: Failed to send reset email
```

**Solution:**
- For Gmail: Generate [App Password](https://myaccount.google.com/apppasswords)
- Set `MAIL_USER` and `MAIL_PASS` in `.env`
- Verify email configuration

## API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/request-password-reset` - Request password reset

### Users
- `GET /api/update/all-users` - Get all users
- `GET /api/update/:id` - Get user by ID
- `PUT /api/update/:id` - Update user

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Create feedback
- `PUT /api/feedback/:id` - Update feedback

### More endpoints available in [API Documentation](http://localhost:5000/api/docs)

## Project Structure

```
├── config/              # Configuration files
├── controllers/         # Business logic
├── middleware/         # Custom middleware
├── models/            # Database schemas
├── routes/            # API route definitions
├── utils/             # Helper utilities
├── tests/             # Test files
├── uploads/           # User uploads
├── app.js             # Express setup
├── server.js          # Server entry point
├── package.json       # Dependencies
└── README.md          # Main documentation
```

## Next Steps

1. **Read [Development Guide](./DEVELOPMENT.md)** - Learn architecture and best practices
2. **Check [Contributing Guide](./CONTRIBUTING.md)** - Contribute to the project
3. **Explore Controllers** - Understand business logic
4. **Write Tests** - Ensure code quality
5. **Deploy** - Move to production

## Getting Help

- 📚 [Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/yourusername/Employee-Performance-Review-System/issues)
- 💬 [Discussions](https://github.com/yourusername/Employee-Performance-Review-System/discussions)
- 📧 Email: support@yourcompany.com

## Useful Links

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)

---

Happy coding! 🚀
