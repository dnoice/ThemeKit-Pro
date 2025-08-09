# Contributing to CSS Theming System

First off, thank you for considering contributing to CSS Theming System! It's people like you that make this project such a great tool. 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your contribution
4. Make your changes
5. Push to your fork and submit a pull request

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include:

- **Clear and descriptive title**
- **Steps to reproduce the issue**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Browser and OS information**
- **Additional context**

**Bug Report Template:**
```markdown
## Bug Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- Browser: [e.g., Chrome 95]
- OS: [e.g., Windows 10]
- Version: [e.g., 3.0.0]

## Additional Context
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear and descriptive title**
- **Detailed description** of the proposed enhancement
- **Rationale** - Why would this be useful?
- **Possible implementation** details
- **Examples** from other projects (if applicable)

**Enhancement Template:**
```markdown
## Enhancement Description
A clear description of the enhancement.

## Rationale
Why is this enhancement needed?

## Proposed Solution
How could this be implemented?

## Alternatives Considered
What other solutions have you considered?

## Additional Context
Any other context or screenshots.
```

### Contributing Code

#### New Features
1. Open an issue to discuss the feature first
2. Get approval from maintainers
3. Fork and create a feature branch
4. Implement the feature
5. Add/update documentation
6. Submit a pull request

#### Bug Fixes
1. Find or create an issue for the bug
2. Fork and create a bugfix branch
3. Fix the bug
4. Add tests if applicable
5. Submit a pull request

## 🛠️ Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- A modern web browser
- Code editor (VS Code recommended)

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/css-themeing-system.git
cd css-themeing-system

# Add upstream remote
git remote add upstream https://github.com/dnoice/css-themeing-system.git

# Install dependencies (if any)
npm install

# Start local development server
npm start
# or use any local server like:
# python -m http.server 8000
# php -S localhost:8000
# npx serve
```

### Project Structure
```
css-themeing-system/
├── index.html          # Demo page
├── variables.css       # CSS custom properties
├── css/
│   ├── styles.css     # Core styles
│   └── queries.css    # Media queries
├── js/
│   └── script.js      # JavaScript functionality
├── docs/              # Documentation
├── examples/          # Usage examples
└── tests/             # Test files
```

## 📝 Style Guidelines

### CSS Guidelines

1. **Use CSS Custom Properties**
   ```css
   /* Good */
   .component {
       color: var(--text-primary);
       padding: var(--space-4);
   }
   
   /* Avoid */
   .component {
       color: #333;
       padding: 16px;
   }
   ```

2. **Follow BEM Naming Convention**
   ```css
   .block {}
   .block__element {}
   .block--modifier {}
   ```

3. **Order Properties Logically**
   ```css
   .element {
       /* Positioning */
       position: relative;
       top: 0;
       
       /* Box Model */
       display: flex;
       width: 100%;
       padding: var(--space-4);
       
       /* Visual */
       background: var(--bg-primary);
       color: var(--text-primary);
       
       /* Typography */
       font-size: var(--text-base);
       line-height: var(--leading-normal);
       
       /* Misc */
       transition: var(--transition-all);
       cursor: pointer;
   }
   ```

4. **Mobile-First Responsive Design**
   ```css
   /* Mobile styles (default) */
   .element { }
   
   /* Tablet and up */
   @media (min-width: 768px) { }
   
   /* Desktop and up */
   @media (min-width: 1024px) { }
   ```

### JavaScript Guidelines

1. **Use ES6+ Features**
   ```javascript
   // Good
   const component = {
       init() {
           this.bindEvents();
       },
       bindEvents() {
           // Use arrow functions for callbacks
           element.addEventListener('click', () => {
               this.handleClick();
           });
       }
   };
   
   // Avoid
   var component = {
       init: function() { }
   };
   ```

2. **Follow Module Pattern**
   ```javascript
   const ModuleName = {
       init() {
           // Initialization
       },
       methodName() {
           // Method implementation
       }
   };
   ```

3. **Use Meaningful Names**
   ```javascript
   // Good
   const isModalOpen = true;
   const toggleTheme = () => {};
   
   // Avoid
   const flag = true;
   const fn = () => {};
   ```

### Documentation Guidelines

1. **Comment Complex Logic**
   ```javascript
   // Calculate viewport-relative font size with min/max bounds
   // This ensures readable text across all screen sizes
   const fontSize = clamp(minSize, preferredSize, maxSize);
   ```

2. **Use JSDoc for Functions**
   ```javascript
   /**
    * Shows a toast notification
    * @param {string} message - The message to display
    * @param {string} type - Type of toast (success|error|info|warning)
    * @param {number} duration - Duration in milliseconds
    */
   function showToast(message, type = 'info', duration = 3000) {
       // Implementation
   }
   ```

## 💬 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, etc.)

### Examples
```bash
# Feature
git commit -m "feat(icons): add new social media icons"

# Bug fix
git commit -m "fix(theme): correct dark mode text contrast"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Performance
git commit -m "perf(animations): optimize CSS transitions"
```

## 🔄 Pull Request Process

1. **Before Submitting**
   - Update documentation if needed
   - Ensure your code follows style guidelines
   - Test in multiple browsers
   - Update the README.md if needed
   - Add yourself to CONTRIBUTORS.md

2. **PR Title Format**
   ```
   type(scope): brief description
   ```

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge
   
   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented my code where necessary
   - [ ] I have updated the documentation
   - [ ] My changes generate no new warnings
   - [ ] I have tested on multiple browsers
   
   ## Screenshots (if applicable)
   
   ## Related Issues
   Closes #(issue number)
   ```

4. **Review Process**
   - A maintainer will review your PR
   - Address any feedback
   - Once approved, your PR will be merged

## 🧪 Testing

### Manual Testing Checklist
- [ ] All themes work correctly
- [ ] Responsive design works on all breakpoints
- [ ] No console errors
- [ ] Accessibility features work (keyboard navigation, screen readers)
- [ ] Performance is acceptable (no lag, smooth animations)

### Browser Testing
Test in the latest versions of:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🌟 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in the documentation

## 💭 Questions?

Feel free to:
- Open an issue for questions
- Join our [Discord community](https://discord.gg/example)
- Email the maintainers

## 📚 Additional Resources

- [CSS Best Practices](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/CSS)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/JavaScript)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)

---

Thank you for contributing to CSS Theming System! 🎨✨
