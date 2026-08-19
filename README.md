# Employee Performance Review System (RevX Backend)
# Open source Project
<div align="center">

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-4.21.1-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/mongodb-8.8.3-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

A comprehensive backend system for managing employee performance reviews, goals, feedback, and assessments.

[Features](#features) • [Installation](#installation) • [Configuration](#configuration) • [API Docs](#api-documentation) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 📖 About

RevX Backend is an open-source Employee Performance Review System designed to streamline performance management processes within organizations. It provides a comprehensive platform for managing employee performance reviews, setting and tracking goals, collecting feedback, and generating performance reports.

---

## ✨ Features

- **User Management**: Role-based access control (Admin, HR, Manager, Employee)
- **Authentication & Authorization**: JWT-based authentication with secure password hashing
- **Performance Reviews**: Create, manage, and track performance reviews
- **Goal Management**: Set, track, and review employee goals
- **Feedback System**: Collect and manage 360-degree feedback
- **Self Assessments**: Employees can perform self-assessments
- **Task Management**: Assign and track performance-related tasks
- **Team Management**: Organize employees into teams and departments
- **Notifications**: Real-time notification system
- **Report Generation**: Generate performance reports and analytics
- **Email Notifications**: Automated email notifications using Nodemailer
- **Image Handling**: Upload and process employee profile images
- **MongoDB Integration**: Scalable NoSQL database
- **Deployment Ready**: Vercel configuration included

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 14+ | Runtime environment |
| Express.js | 4.21.1 | Web framework |
| MongoDB | 8.8.3 | Database |
| Mongoose | 8.8.3 | ODM for MongoDB |
| JWT | 9.0.2 | Authentication |
| Bcrypt | 5.1.1 | Password hashing |
| Nodemailer | 7.0.0 | Email service |
| Multer | 1.4.5 | File upload handling |
| Sharp | 0.33.5 | Image processing |
| Jest | 29.7.0 | Testing framework |
| Nodemon | 3.1.7 | Development server |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Employee-Performance-Review-System.git
cd Employee-Performance-Review-System
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### 3. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/employee-review-system
# Or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourcompany.com

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# AWS/Cloud Storage (Optional)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your-bucket-name

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

### Database Configuration

The application uses MongoDB. Configure your database connection in `config/db.js`.

For local MongoDB:
```javascript
// Uses MONGODB_URI from .env
```

For MongoDB Atlas:
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Add your connection string to `.env`

---

## 🏃 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production Mode

```bash
npm start
```

---

## 📁 Project Structure

```
Employee-Performance-Review-System/
├── config/                      # Configuration files
│   ├── db.js                   # Database connection
│   ├── environment.js          # Environment setup
│   └── storageConfig.js        # Storage configuration
├── controllers/                 # Request handlers
│   ├── authController.js
│   ├── userController.js
│   ├── departmentController.js
│   ├── feedbackController.js
│   ├── goalController.js
│   ├── hrController.js
│   ├── profileController.js
│   ├── reportController.js
│   ├── selfAssessmentController.js
│   ├── taskController.js
│   └── teamController.js
├── models/                      # Database schemas
│   ├── User.js
│   ├── Department.js
│   ├── Feedback.js
│   ├── Goal.js
│   ├── PerformanceReport.js
│   ├── Task.js
│   └── ...other models
├── routes/                      # API route definitions
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── feedbackRoutes.js
│   └── ...other routes
├── middleware/                  # Custom middleware
│   ├── authMiddleware.js       # JWT verification
│   ├── checkRole.js            # Role-based access control
│   └── errorHandler.js         # Error handling
├── utils/                       # Utility functions
│   ├── jwtUtils.js            # JWT operations
│   ├── mailer.js              # Email sending
│   ├── notificationService.js # Notifications
│   └── reportGenerator.js     # Report generation
├── tests/                       # Test files
├── uploads/                     # File upload storage
├── app.js                       # Express app configuration
├── server.js                    # Server entry point
├── package.json                 # Project metadata and dependencies
└── README.md                    # This file
```

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh` | Refresh JWT token |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Performance Review Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all reviews |
| POST | `/api/reviews` | Create review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

### Goal Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/goals` | Get all goals |
| POST | `/api/goals` | Create goal |
| PUT | `/api/goals/:id` | Update goal |
| DELETE | `/api/goals/:id` | Delete goal |

### Feedback Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Create feedback |
| PUT | `/api/feedback/:id` | Update feedback |
| DELETE | `/api/feedback/:id` | Delete feedback |

For complete API documentation, please refer to the API documentation file or Postman collection (if available).

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Test Files

- `tests/authController.test.js` - Authentication tests
- `tests/userController.test.js` - User management tests
- `tests/feedbackController.test.js` - Feedback system tests
- `tests/goalController.test.js` - Goal management tests
- And more...

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/Employee-Performance-Review-System.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit Your Changes**
   ```bash
   git commit -am 'Add your feature: description'
   ```

5. **Push to the Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues

### Coding Standards

- Use consistent naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Follow the existing folder structure
- Ensure all tests pass before submitting PR

### Code of Conduct

Please be respectful and inclusive. We are committed to providing a welcoming environment for all contributors.

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help

- **Issues**: Report bugs and request features using [GitHub Issues](https://github.com/yourusername/Employee-Performance-Review-System/issues)
- **Discussions**: Join the community discussions for questions and ideas
- **Documentation**: Check the project wiki for detailed guides

### Common Issues

#### MongoDB Connection Error
```
Error: Could not connect to MongoDB
Solution: Verify MONGODB_URI in .env file and ensure MongoDB service is running
```

#### JWT Authentication Failed
```
Error: Invalid token
Solution: Check JWT_SECRET in .env matches the token generation
```

#### Email Not Sending
```
Error: Email service not configured
Solution: Verify EMAIL_SERVICE, EMAIL_USER, and EMAIL_PASSWORD in .env
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 🎯 Roadmap

Future features and improvements:

- [ ] GraphQL API support
- [ ] Real-time notifications using WebSockets
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app support
- [ ] Integration with popular HR tools
- [ ] Audit logging
- [ ] Performance caching

---

## 👥 Contributors

<!-- Contributors will be listed here -->
- Your Name - Initial work

---

## 💝 Acknowledgments

- Thanks to all contributors
- Inspired by modern HR management systems
- Built with ❤️ by the community

---

## 📞 Contact

For questions or suggestions, please reach out to:

- **Email**: support@yourcompany.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/Employee-Performance-Review-System/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/Employee-Performance-Review-System/discussions)

---

<div align="center">

**[⬆ back to top](#employee-performance-review-system-revx-backend)**

Made with ❤️ by contributors

</div>