# ThemeKit Pro

<div align="center">
  <img src="https://via.placeholder.com/128x128/0ea5e9/ffffff?text=TK" alt="ThemeKit Pro Logo" width="128" height="128">
  
  <h3>🎨 Advanced CSS Design System</h3>
  <p>A comprehensive, accessible, and beautiful design system for modern web applications</p>
  
  [![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/dnoice/ThemeKit-Pro)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/dnoice/ThemeKit-Pro/blob/main/LICENSE)
  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/dnoice/ThemeKit-Pro)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://github.com/dnoice/ThemeKit-Pro)
  [![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-green.svg)](https://github.com/dnoice/ThemeKit-Pro)
</div>

## ✨ Features

- 🎨 **1000+ Design Tokens** - Comprehensive CSS custom property system
- 🌙 **Smart Theming** - Automatic light/dark mode with system preference detection
- ♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard navigation
- 📱 **Mobile-First Responsive** - 7+ breakpoints with container query support
- 🚀 **Performance Optimized** - Efficient animations and lazy loading
- 🔧 **Developer Experience** - Complete APIs, TypeScript support, and extensive documentation
- 🧩 **100+ Components** - Production-ready components for every use case
- 🎪 **Interactive Demos** - Live playground with real-time interactions

## 🚀 Quick Start

### CDN Installation (Fastest)

```html
<!-- Add to your <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/variables.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/styles.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/queries.css">

<!-- Add before closing </body> -->
<script src="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/js/script.js"></script>
```

### npm Installation

```bash
npm install themekit-pro
```

```javascript
// Import CSS
import 'themekit-pro/css/variables.css';
import 'themekit-pro/css/styles.css';
import 'themekit-pro/css/queries.css';

// Import JavaScript (optional)
import 'themekit-pro/js/script.js';
```

### Download & Self-Host

1. Download the [latest release](https://github.com/dnoice/ThemeKit-Pro/releases)
2. Extract the files to your project
3. Include the CSS and JS files in your HTML

## 📚 Documentation

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App with ThemeKit Pro</title>
    
    <!-- ThemeKit Pro CSS -->
    <link rel="stylesheet" href="path/to/themekit-pro/css/variables.css">
    <link rel="stylesheet" href="path/to/themekit-pro/css/styles.css">
    <link rel="stylesheet" href="path/to/themekit-pro/css/queries.css">
</head>
<body>
    <!-- Your content using ThemeKit Pro components -->
    <div class="container">
        <h1 class="display-1">Welcome to ThemeKit Pro</h1>
        <button class="btn btn--primary">Get Started</button>
    </div>
    
    <!-- ThemeKit Pro JavaScript (optional) -->
    <script src="path/to/themekit-pro/js/script.js"></script>
</body>
</html>
```

## 🧩 Components

### Buttons

```html
<!-- Primary button -->
<button class="btn btn--primary">Primary</button>

<!-- Button with icon -->
<button class="btn btn--secondary">
    <svg class="icon icon--sm"><use href="#icon-download"></use></svg>
    Download
</button>

<!-- Loading button -->
<button class="btn btn--primary btn--loading">Processing...</button>
```

### Progress Indicators

```html
<!-- Linear progress -->
<div class="progress-bar" data-progress="75">
    <div class="progress-bar__fill"></div>
    <span class="progress-bar__text">75%</span>
</div>

<!-- Circular progress -->
<div class="progress-ring" data-progress="60">
    <svg class="progress-ring__svg">
        <circle class="progress-ring__circle-bg" cx="30" cy="30" r="28"></circle>
        <circle class="progress-ring__circle" cx="30" cy="30" r="28"></circle>
    </svg>
    <div class="progress-ring__text">60%</div>
</div>
```

### Loading States

```html
<!-- Spinners -->
<div class="spinner spinner--primary"></div>
<div class="spinner spinner--dots"><div></div><div></div><div></div></div>

<!-- Skeleton loading -->
<div class="skeleton skeleton--title"></div>
<div class="skeleton skeleton--text"></div>
```

### Icons

```html
<!-- Using the built-in icon system -->
<svg class="icon icon--lg icon--primary">
    <use href="#icon-star"></use>
</svg>

<!-- Available icons: home, user, settings, heart, star, download, mail, search, and more -->
```

## 🎨 Theming

### CSS Custom Properties

ThemeKit Pro uses CSS custom properties for theming. You can easily customize colors:

```css
:root {
    --color-primary-500: #your-brand-color;
    --color-accent-500: #your-accent-color;
}
```

### Dark Mode

Dark mode is automatically handled, but you can manually control it:

```javascript
// Toggle theme
themeManager.toggleTheme();

// Set specific theme
themeManager.setTheme('dark');
themeManager.setTheme('light');
```

## 🔧 JavaScript APIs

### Progress Management

```javascript
// Set progress with animation
progressManager.setProgress('#my-progress', 75, true);

// Increment progress
progressManager.increment('#my-progress', 10);

// Create new progress bar
progressManager.createProgressBar('#container', {
    progress: 50,
    showText: true,
    animated: true
});
```

### Loading States

```javascript
// Button loading
loadingManager.showButtonLoading('#my-button', 'Processing...');
loadingManager.hideButtonLoading('#my-button');

// Card loading
loadingManager.showCardLoading('#my-card');
loadingManager.hideCardLoading('#my-card');
```

### Toast Notifications

```javascript
// Show toast notifications
toastManager.show('Success message!', 'success');
toastManager.show('Error occurred', 'error');
toastManager.show('Info message', 'info', 5000); // Custom duration
```

### Icon Management

```javascript
// Create icons dynamically
const icon = iconManager.createIcon('star', {
    size: 'lg',
    color: 'primary',
    spinning: true
});

// Add icon to button
iconManager.addIcon('#my-button', 'download', 'left');
```

## 📱 Responsive Design

ThemeKit Pro follows a mobile-first approach with 7 breakpoints:

- **xs**: 480px+
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+
- **2xl**: 1536px+

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full keyboard support for all components
- **Screen Reader Support**: Proper ARIA labels and announcements
- **High Contrast Mode**: Automatic adaptation to system preferences
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📖 Examples

Check out our [live demo](https://dnoice.github.io/ThemeKit-Pro/) to see all components in action!

### Basic Page

```html
<div class="container">
    <header class="header">
        <nav class="nav">
            <div class="nav__brand">
                <h1 class="nav__title">My App</h1>
            </div>
            <button class="btn btn--secondary" id="themeToggle">
                <span class="theme-icon">🌙</span>
                Toggle Theme
            </button>
        </nav>
    </header>
    
    <main>
        <section class="hero">
            <div class="hero__content">
                <h1 class="hero__title">Welcome to <span class="gradient-text">ThemeKit Pro</span></h1>
                <p class="hero__subtitle">Build beautiful interfaces with our comprehensive design system</p>
                <div class="hero__actions">
                    <button class="btn btn--primary btn--large">Get Started</button>
                    <button class="btn btn--outline btn--large">Learn More</button>
                </div>
            </div>
        </section>
    </main>
</div>
```

## 🛠 Development

### Prerequisites

- Node.js 16+
- Modern browser for testing

### Setup

```bash
# Clone the repository
git clone https://github.com/dnoice/ThemeKit-Pro.git

# Navigate to the project
cd ThemeKit-Pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Build and watch for changes
npm run build:watch
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern design systems like Material Design, Chakra UI, and Tailwind CSS
- Built with love for the web development community
- Special thanks to all contributors and users

## 📞 Support

- 📖 [Documentation](https://dnoice.github.io/ThemeKit-Pro/docs)
- 🐛 [Report Issues](https://github.com/dnoice/ThemeKit-Pro/issues)
- 💬 [Discussions](https://github.com/dnoice/ThemeKit-Pro/discussions)
- 📧 [Email Support](mailto:support@themekit-pro.com)

## 🗺 Roadmap

- [ ] React component library
- [ ] Vue.js component library
- [ ] Angular component library
- [ ] Figma design kit
- [ ] Sketch design kit
- [ ] Advanced animation library
- [ ] Form validation system
- [ ] Data visualization components

---

<div align="center">
  <p>Made with ❤️ by the ThemeKit Pro team</p>
  <p>⭐ Star us on GitHub if you like ThemeKit Pro!</p>
</div>
