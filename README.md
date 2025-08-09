# 🎨 CSS Theming System

<div align="center">
  
  ![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
  ![CSS](https://img.shields.io/badge/CSS-Custom_Properties-1572B6.svg)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)
  ![WCAG](https://img.shields.io/badge/WCAG-AAA_Compliant-success.svg)
  
  <h3>A comprehensive, modern CSS variables framework for building beautiful, themeable web applications</h3>
  
  [Demo](https://dnoice.github.io/css-themeing-system/) • [Documentation](#documentation) • [Quick Start](#quick-start) • [Contributing](CONTRIBUTING.md)
  
</div>

---

## ✨ Features

### 🎯 Core Features
- **150+ CSS Custom Properties** - Complete design token system
- **4 Built-in Themes** - Light, Dark, Cosmic, and Forest
- **Custom SVG Icon System** - 15+ scalable icons included
- **Responsive Grid System** - 12-column and auto-fit layouts
- **Loading States** - Spinners, progress bars, and skeleton screens
- **Glassmorphism Effects** - Modern backdrop filters and blur effects
- **Fluid Typography** - Responsive type scale with perfect vertical rhythm

### 🚀 Developer Experience
- **Zero Dependencies** - Pure CSS and vanilla JavaScript
- **Modular Architecture** - Organized, maintainable code structure
- **Copy-to-Clipboard** - Quick implementation of components
- **Interactive Demos** - Live component playground
- **Production Ready** - Optimized and battle-tested
- **Accessibility First** - WCAG AAA compliant with ARIA support

### 🎨 Design System
- **Color Palette** - Primary, secondary, accent, and neutral scales
- **Spacing System** - Consistent 4px/8px grid
- **Shadow System** - 6 elevation levels + colored shadows
- **Animation Library** - Smooth transitions and keyframe animations
- **Component Library** - Buttons, cards, forms, alerts, and more

## 📦 Installation

### Option 1: CDN (Quickest)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/css-themeing-system@main/variables.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/css-themeing-system@main/css/styles.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/css-themeing-system@main/css/queries.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/dnoice/css-themeing-system@main/js/script.js"></script>
```

### Option 2: Download
```bash
# Clone the repository
git clone https://github.com/dnoice/css-themeing-system.git

# Or download as ZIP
wget https://github.com/dnoice/css-themeing-system/archive/main.zip
```

### Option 3: NPM
```bash
npm install css-themeing-system
```

## 🚀 Quick Start

### Basic Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    
    <!-- Theme System CSS -->
    <link rel="stylesheet" href="path/to/variables.css">
    <link rel="stylesheet" href="path/to/css/styles.css">
    <link rel="stylesheet" href="path/to/css/queries.css">
</head>
<body>
    <!-- Your content here -->
    
    <!-- Theme System JS -->
    <script src="path/to/js/script.js"></script>
</body>
</html>
```

### Using Components

#### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-ghost">Ghost Button</button>
```

#### Icons
```html
<svg class="icon icon-md icon-primary">
    <use href="#icon-star"></use>
</svg>
```

#### Cards
```html
<div class="card">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">Card content goes here</p>
</div>
```

#### Grid System
```html
<div class="grid-demo grid-12">
    <div class="grid-item col-span-6">Half width</div>
    <div class="grid-item col-span-6">Half width</div>
</div>
```

## 📚 Documentation

### File Structure
```
css-themeing-system/
├── index.html          # Demo page with all components
├── variables.css       # CSS custom properties (design tokens)
├── css/
│   ├── styles.css     # Core component styles
│   └── queries.css    # Responsive breakpoints
├── js/
│   └── script.js      # JavaScript functionality
├── README.md          # Documentation
├── LICENSE            # MIT License
└── package.json       # NPM configuration
```

### CSS Variables

#### Colors
```css
/* Primary Colors */
--color-primary-500: #6366f1;
--color-secondary-500: #a855f7;
--color-accent-500: #06b6d4;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

#### Typography
```css
/* Font Sizes */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.175rem + 0.375vw, 1.5rem);
```

#### Spacing
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
```

### JavaScript API

```javascript
// Theme Management
ThemeSystem.ThemeManager.setTheme('dark');

// Toast Notifications
ThemeSystem.Toast.show('Success!', 'success');

// Modal
ThemeSystem.Modal.open('Title', 'Content here');

// Utilities
ThemeSystem.Utils.debounce(func, 300);
ThemeSystem.Utils.throttle(func, 100);
```

### Themes

The system includes 4 built-in themes:

| Theme | Description | Use Case |
|-------|-------------|----------|
| **Light** | Clean, minimal light theme | Default, daytime use |
| **Dark** | Modern dark theme | Night time, reduced eye strain |
| **Cosmic** | Purple space theme | Creative, unique applications |
| **Forest** | Green nature theme | Eco-friendly, outdoor apps |

#### Switching Themes
```javascript
// Via JavaScript
document.documentElement.setAttribute('data-theme', 'dark');

// Via HTML
<html data-theme="dark">
```

## 🎨 Components

### Available Components
- ✅ Buttons (Primary, Secondary, Outline, Ghost)
- ✅ Cards (Default, Elevated, Interactive)
- ✅ Forms (Inputs, Selects, Textareas, Checkboxes, Radios)
- ✅ Navigation (Sticky header with blur effect)
- ✅ Alerts (Info, Success, Warning, Error)
- ✅ Badges (Multiple variants)
- ✅ Modals (Accessible with focus trap)
- ✅ Toast Notifications
- ✅ Loading States (Spinners, Progress bars, Skeletons)
- ✅ Grid System (12-column and auto-fit)
- ✅ Icons (15+ custom SVG icons)

### Component Customization

All components can be customized using CSS variables:

```css
/* Custom button styling */
.my-custom-btn {
    --btn-padding-x: var(--space-6);
    --btn-padding-y: var(--space-3);
    --btn-font-size: var(--text-lg);
    --btn-border-radius: var(--radius-full);
}
```

## 🔧 Advanced Usage

### Creating Custom Themes

```css
[data-theme="custom"] {
    /* Override any CSS variables */
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #eee;
    --color-primary-500: #e94560;
    /* ... more customizations */
}
```

### Extending the Icon System

```html
<!-- Add your custom icon -->
<svg style="display: none;">
    <defs>
        <symbol id="icon-custom" viewBox="0 0 24 24">
            <!-- Your SVG path here -->
        </symbol>
    </defs>
</svg>

<!-- Use it -->
<svg class="icon icon-md">
    <use href="#icon-custom"></use>
</svg>
```

### Performance Optimization

```javascript
// Enable lazy loading for images
<img data-src="image.jpg" data-lazy>

// Use intersection observer for animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});
```

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 88+ |
| Firefox | 78+ |
| Safari | 14+ |
| Edge | 88+ |
| Opera | 74+ |

### Progressive Enhancement
- CSS Custom Properties fallbacks
- Intersection Observer polyfill available
- Reduced motion media query support
- High contrast mode support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone the repo
git clone https://github.com/dnoice/css-themeing-system.git

# Navigate to project
cd css-themeing-system

# Install dependencies (if any)
npm install

# Start local server
npm start
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Material Design, Tailwind CSS, and Bootstrap
- Icons inspired by Feather Icons and Heroicons
- Community feedback and contributions

## 📞 Support

- 📧 Email: support@example.com
- 💬 [Discord Community](https://discord.gg/example)
- 🐛 [Report Issues](https://github.com/dnoice/css-themeing-system/issues)
- 📖 [Documentation Wiki](https://github.com/dnoice/css-themeing-system/wiki)

## 🚀 Roadmap

- [ ] Additional theme variants
- [ ] Component playground
- [ ] Figma design kit
- [ ] React/Vue/Angular adapters
- [ ] Theme builder tool
- [ ] Performance monitoring dashboard
- [ ] Additional icon packs
- [ ] RTL support
- [ ] Print stylesheet optimization
- [ ] Web Components version

---

<div align="center">
  
Made with ❤️ by [dnoice](https://github.com/dnoice)

⭐ Star us on GitHub — it helps!

</div>
