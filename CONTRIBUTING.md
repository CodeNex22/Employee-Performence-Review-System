# Contributing to Employee Performance Review System

Thank you for your interest in contributing to our project! We welcome all contributions that help make this system better. Please follow these guidelines to ensure a smooth contribution process.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Code Style Guidelines](#code-style-guidelines)

---

## Code of Conduct

By participating in this project, you agree to uphold our Code of Conduct:

- Be respectful and inclusive
- Welcome different perspectives
- Focus on constructive criticism
- Report inappropriate behavior
- Help maintain a safe and welcoming environment

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Employee-Performance-Review-System.git
   cd Employee-Performance-Review-System
   ```

3. **Add upstream remote** to sync with main repository:
   ```bash
   git remote add upstream https://github.com/original-owner/Employee-Performance-Review-System.git
   ```

4. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bugfixes
   git checkout -b bugfix/issue-description
   ```

---

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB** (if local):
   ```bash
   mongod
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

The server should start on `http://localhost:5000`

---

## Making Changes

### Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware
├── models/          # Database schemas
├── routes/          # API routes
├── utils/           # Utility functions
├── tests/           # Test files
└── uploads/         # Uploaded files
```

### Guidelines

1. **Keep commits atomic**: Each commit should represent one logical change
2. **Write meaningful commit messages**: Use descriptive, past tense messages
3. **Follow the existing code style**: See Code Style Guidelines section
4. **Add/update comments**: Explain complex logic
5. **Don't break existing functionality**: Test before pushing
6. **Update documentation**: Add/update relevant docs
7. **Add tests for new features**: Maintain or improve test coverage

---

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Writing Tests

- Place tests in the `tests/` directory
- Name test files as `*.test.js`
- Use descriptive test names
- Follow Arrange-Act-Assert pattern
- Mock external dependencies

Example:
```javascript
describe('User Controller', () => {
  it('should register a new user successfully', async () => {
    // Arrange
    const userData = { username: 'john', email: 'john@example.com' };
    
    // Act
    const result = await registerUser(userData);
    
    // Assert
    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
  });
});
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process, dependencies

### Examples

```bash
git commit -m "feat(auth): add JWT token refresh endpoint"
git commit -m "fix(feedback): resolve duplicate feedback entries"
git commit -m "docs: update API documentation"
git commit -m "refactor(controllers): simplify user validation logic"
```

---

## Pull Request Process

### Before Creating PR

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Lint code**:
   ```bash
   npm run lint
   ```

4. **Build** (if applicable):
   ```bash
   npm run build
   ```

### Creating PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Reference related issues (e.g., "Fixes #123")
   - Screenshots for UI changes (if applicable)
   - Checklist of changes

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Commit messages are meaningful
- [ ] Code is properly commented
- [ ] No console.log statements left
- [ ] .env files not committed

### Review Process

- Maintainers will review your PR
- Respond to feedback promptly
- Push updates to the same branch
- PR will be merged once approved

---

## Reporting Bugs

### Bug Report Template

Use our issue template and provide:

1. **Title**: Clear, concise description
2. **Environment**: OS, Node version, etc.
3. **Steps to Reproduce**: Exact steps to trigger the bug
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Screenshots/Logs**: Error messages, stack traces
7. **Possible Fix**: If you know the cause

### Bug Report Example

```
Title: Users cannot reset password with special characters

Environment:
- OS: Windows 10
- Node: v14.17.0
- MongoDB: 4.4

Steps to Reproduce:
1. Go to login page
2. Click "Forgot Password"
3. Enter email with special characters
4. Click send

Expected: Email sent successfully
Actual: Error message "Invalid email format"

Logs:
ValidationError: Invalid email format
```

---

## Feature Requests

### Feature Request Template

1. **Title**: Clear description of the feature
2. **Problem**: What problem does it solve?
3. **Solution**: How should it work?
4. **Alternatives**: Are there other solutions?
5. **Additional Context**: Screenshots, mockups, etc.

### Feature Request Example

```
Title: Add email notifications for review deadlines

Problem: Users forget about approaching review deadlines

Solution: Send email reminders 3 days before deadline

Alternatives:
- In-app notifications only
- Configurable notification frequency

Use Case: HR managers need to ensure timely submissions
```

---

## Code Style Guidelines

### JavaScript Style

```javascript
// Use const by default, let if needed, avoid var
const MAX_USERS = 100;
let currentCount = 0;

// Use arrow functions for callbacks
users.filter((user) => user.active);

// Use template literals
const message = `Hello, ${user.name}`;

// Use async/await over .then()
const user = await User.findById(id);

// Error handling
try {
  await operation();
} catch (error) {
  logger.error('Operation failed', error);
}
```

### Naming Conventions

```javascript
// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5242880;

// Variables/Functions: camelCase
const userName = 'John';
function getUserById() {}

// Classes: PascalCase
class UserController {}

// Private methods: prefix with underscore
_validateEmail() {}
```

### Comments

```javascript
/**
 * Descriptive comment for function
 * @param {type} param - Parameter description
 * @returns {type} Return value description
 */
function doSomething(param) {
  // Inline comment for complex logic
  return result;
}
```

### File Organization

```javascript
// 1. Imports
const express = require('express');
const User = require('../models/User');

// 2. Constants
const MAX_LIMIT = 100;

// 3. Middleware/Utility functions
const validateInput = (data) => {};

// 4. Main exports
exports.function1 = () => {};
```

---

## Questions or Need Help?

- **Issues**: [GitHub Issues](https://github.com/original-owner/Employee-Performance-Review-System/issues)
- **Discussions**: [GitHub Discussions](https://github.com/original-owner/Employee-Performance-Review-System/discussions)
- **Email**: support@yourcompany.com

---

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing! 🎉
