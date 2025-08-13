# Contributing to ThemeKit Pro

🎉 Thank you for considering contributing to ThemeKit Pro! We're excited to have you as part of our community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Component Guidelines](#component-guidelines)
- [Testing](#testing)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [team@themekit-pro.com](mailto:team@themekit-pro.com).

### Our Pledge

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/dnoice/ThemeKit-Pro/issues) to avoid duplicates.

When creating a bug report, include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, version)
- **Code samples** demonstrating the issue

Use this template:

```markdown
**Bug Description:**
A clear description of what the bug is.

**To Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Screenshots:**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 91]
- ThemeKit Pro Version: [e.g. 2.0.0]
```

### 💡 Suggesting Features

Feature requests are welcome! Please:

1. **Check existing requests** first
2. **Explain the use case** clearly
3. **Provide examples** or mockups
4. **Consider the scope** - does it fit ThemeKit Pro's goals?

### 🔧 Contributing Code

#### Types of Contributions

- **Bug fixes** - Fix existing issues
- **New components** - Add missing UI components
- **Enhancements** - Improve existing components
- **Documentation** - Improve docs and examples
- **Accessibility** - Enhance a11y features
- **Performance** - Optimize code and assets

## Development Setup

### Prerequisites

- Node.js 16+ and npm 8+
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- Git

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/ThemeKit-Pro.git
   cd ThemeKit-Pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`
   - You should see the ThemeKit Pro demo

### Project Structure

```
ThemeKit-Pro/
├── css/
│   ├── variables.css    # Design tokens and CSS custom properties
│   ├── styles.css       # Main component styles
│   └── queries.css      # Responsive design and media queries
├── js/
│   └── script.js        # JavaScript functionality and APIs
├── docs/                # Documentation files
├── examples/            # Usage examples
├── tests/               # Test files
├── index.html           # Main demo page
├── package.json         # Package configuration
└── README.md           # Project documentation
```

### Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make changes**
   - Edit CSS in `css/` directory
   - Edit JavaScript in `js/` directory
   - Test changes in browser

3. **Test your changes**
   ```bash
   npm run lint          # Check code style
   npm run build         # Build for production
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new button variant"
   # or
   git commit -m "fix: resolve navigation bug"
   ```

## Coding Standards

### CSS Guidelines

#### File Organization
- **variables.css**: Design tokens only
- **styles.css**: Component styles
- **queries.css**: Responsive design

#### CSS Naming Conventions
We use BEM (Block Element Modifier) methodology:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__content { }
.card__footer { }

/* Modifier */
.card--elevated { }
.card--bordered { }
```

#### CSS Custom Properties
Always use CSS custom properties for values that might change:

```css
/* Good */
.button {
  background-color: var(--interactive-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
}

/* Avoid */
.button {
  background-color: #0ea5e9;
  padding: 12px 24px;
  border-radius: 8px;
}
```

#### Responsive Design
Mobile-first approach:

```css
/* Mobile styles (base) */
.component {
  display: block;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    display: flex;
  }
}
```

### JavaScript Guidelines

#### Code Style
- Use modern ES6+ syntax
- Prefer `const` and `let` over `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions

```javascript
/**
 * Sets progress for a progress bar element
 * @param {Element|string} element - Progress bar element or selector
 * @param {number} percentage - Progress percentage (0-100)
 * @param {boolean} animate - Whether to animate the change
 */
setProgress(element, percentage, animate = true) {
  // Implementation
}
```

#### Error Handling
Always include proper error handling:

```javascript
try {
  // Risky operation
  const result = someFunctionThatMightFail();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  // Handle gracefully
}
```

### Accessibility Requirements

All components must meet **WCAG 2.1 AA** standards:

- **Semantic HTML** - Use proper HTML elements
- **ARIA labels** - Add appropriate ARIA attributes
- **Keyboard navigation** - All interactive elements must be keyboard accessible
- **Color contrast** - Minimum 4.5:1 ratio for normal text
- **Focus indicators** - Visible focus states for all interactive elements

Example:
```html
<button 
  class="btn btn--primary"
  aria-label="Save document"
  tabindex="0"
>
  Save
</button>
```

## Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] Tests added/updated if applicable
- [ ] Accessibility requirements met

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Mobile testing completed
- [ ] Accessibility testing completed

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process

1. **Automated checks** - Must pass all CI checks
2. **Code review** - At least one maintainer review required
3. **Testing** - Manual testing in multiple browsers
4. **Approval** - Maintainer approval required
5. **Merge** - Squash and merge preferred

## Issue Guidelines

### Good Issue Titles

- ✅ "Button component: Focus state not visible in dark mode"
- ✅ "Feature request: Add toast notification duration option"
- ✅ "Bug: Progress bar animation stutters on Safari"

- ❌ "Button broken"
- ❌ "Feature request"
- ❌ "Please help"

### Labels

We use these labels to organize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `accessibility` - Related to a11y
- `performance` - Performance improvements

## Component Guidelines

### Creating New Components

1. **Research existing patterns** - Check if similar component exists
2. **Design API** - Plan the component interface
3. **Write CSS** - Follow our naming conventions
4. **Add JavaScript** - If interactive behavior needed
5. **Document usage** - Add examples and API docs
6. **Test accessibility** - Ensure WCAG compliance

### Component Checklist

- [ ] **Responsive** - Works on all screen sizes
- [ ] **Accessible** - Keyboard navigation and screen readers
- [ ] **Themeable** - Uses CSS custom properties
- [ ] **Documented** - Clear usage examples
- [ ] **Tested** - Works in all supported browsers
- [ ] **Consistent** - Follows existing patterns

### Component Example

```css
/* Component: Alert */
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-primary);
  background: var(--bg-surface);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.alert__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.alert__content {
  flex: 1;
}

.alert__title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-1);
}

.alert--success {
  border-color: var(--border-success);
  background: var(--color-success-25);
}

.alert--error {
  border-color: var(--border-error);
  background: var(--color-error-25);
}
```

## Testing

### Manual Testing

Test all changes in:

- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

### Accessibility Testing

- **Keyboard navigation** - Tab through all interactive elements
- **Screen reader** - Test with VoiceOver (macOS) or NVDA (Windows)
- **Color contrast** - Use tools like WebAIM's contrast checker
- **Focus indicators** - Ensure visible focus states

### Automated Testing

```bash
# Run linting
npm run lint

# Check for accessibility issues
npm run a11y

# Build test
npm run build
```

## Getting Help

- 💬 [GitHub Discussions](https://github.com/dnoice/ThemeKit-Pro/discussions)
- 📧 [Email us](mailto:team@themekit-pro.com)
- 🐛 [Report issues](https://github.com/dnoice/ThemeKit-Pro/issues)

## Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to ThemeKit Pro! 🎉
