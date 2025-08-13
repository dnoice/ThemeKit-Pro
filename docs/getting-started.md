# Getting Started with ThemeKit Pro

Welcome to ThemeKit Pro! This guide will help you get up and running quickly with our comprehensive design system.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Basic Usage](#basic-usage)
- [Theming](#theming)
- [Components](#components)
- [JavaScript APIs](#javascript-apis)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Installation

### Method 1: CDN (Recommended for beginners)

Add these links to your HTML `<head>`:

```html
<!-- ThemeKit Pro CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/variables.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/styles.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/queries.css">
```

Add this script before your closing `</body>` tag:

```html
<!-- ThemeKit Pro JavaScript (optional) -->
<script src="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/js/script.js"></script>
```

### Method 2: npm

```bash
npm install themekit-pro
```

Then import in your project:

```javascript
// Import CSS
import 'themekit-pro/css/variables.css';
import 'themekit-pro/css/styles.css';
import 'themekit-pro/css/queries.css';

// Import JavaScript (optional)
import 'themekit-pro/js/script.js';
```

### Method 3: Download

1. Go to [GitHub Releases](https://github.com/dnoice/ThemeKit-Pro/releases)
2. Download the latest release
3. Extract files to your project
4. Link CSS and JS files in your HTML

## Quick Start

Create a simple HTML page with ThemeKit Pro:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My ThemeKit Pro App</title>
    
    <!-- Inter font (recommended) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- ThemeKit Pro CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/variables.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/css/queries.css">
</head>
<body>
    <!-- Your app content -->
    <div class="container">
        <h1 class="display-1">Hello <span class="gradient-text">ThemeKit Pro</span>!</h1>
        <p class="text-large">Welcome to the most comprehensive CSS design system.</p>
        <button class="btn btn--primary btn--large">Get Started</button>
    </div>
    
    <!-- ThemeKit Pro JavaScript -->
    <script src="https://cdn.jsdelivr.net/gh/dnoice/ThemeKit-Pro@main/js/script.js"></script>
</body>
</html>
```

That's it! You now have a fully functional page with ThemeKit Pro.

## Basic Usage

### Layout

Use the container class for responsive layouts:

```html
<div class="container">
    <!-- Your content here -->
</div>
```

### Typography

ThemeKit Pro provides a complete typography system:

```html
<!-- Display headings -->
<h1 class="display-1">Display 1</h1>
<h2 class="display-2">Display 2</h2>
<h3 class="display-3">Display 3</h3>

<!-- Regular headings -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>

<!-- Text variants -->
<p class="text-large">Large text</p>
<p>Regular text</p>
<p class="text-small">Small text</p>

<!-- Gradient text -->
<span class="gradient-text">Beautiful gradient text</span>
```

### Buttons

Multiple button styles and sizes:

```html
<!-- Button variants -->
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--accent">Accent</button>
<button class="btn btn--outline">Outline</button>
<button class="btn btn--ghost">Ghost</button>

<!-- Button sizes -->
<button class="btn btn--primary btn--small">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn--large">Large</button>

<!-- Button with icon -->
<button class="btn btn--primary">
    <svg class="icon icon--sm"><use href="#icon-download"></use></svg>
    Download
</button>
```

## Theming

### Using CSS Custom Properties

ThemeKit Pro is built with CSS custom properties, making theming easy:

```css
:root {
    /* Override default colors */
    --color-primary-500: #your-brand-color;
    --color-accent-500: #your-accent-color;
    
    /* Override spacing */
    --space-custom: 2.5rem;
    
    /* Override typography */
    --font-family-sans: 'Your Font', sans-serif;
}
```

### Dark Mode

Dark mode is automatically handled, but you can control it manually:

```javascript
// Toggle between light and dark
themeManager.toggleTheme();

// Set specific theme
themeManager.setTheme('dark');
themeManager.setTheme('light');

// Listen for theme changes
document.addEventListener('themeChange', (e) => {
    console.log('Theme changed to:', e.detail.theme);
});
```

### Custom Themes

Create custom themes by overriding CSS custom properties:

```css
/* Custom blue theme */
[data-theme="blue"] {
    --color-primary-500: #2563eb;
    --color-primary-600: #1d4ed8;
    --bg-primary: #eff6ff;
}

/* Custom purple theme */
[data-theme="purple"] {
    --color-primary-500: #7c3aed;
    --color-primary-600: #6d28d9;
    --bg-primary: #f3f4f6;
}
```

Then apply with JavaScript:

```javascript
document.documentElement.setAttribute('data-theme', 'blue');
```

## Components

### Cards

Create beautiful cards with different styles:

```html
<!-- Elevated card -->
<div class="card card--elevated">
    <div class="card__header">
        <h3 class="card__title">Card Title</h3>
    </div>
    <div class="card__content">
        <p>Card content goes here.</p>
    </div>
    <div class="card__footer">
        <button class="btn btn--primary">Action</button>
    </div>
</div>

<!-- Bordered card -->
<div class="card card--bordered">
    <!-- Content -->
</div>

<!-- Accent card -->
<div class="card card--accent">
    <!-- Content -->
</div>
```

### Forms

Enhanced form components with floating labels:

```html
<form>
    <!-- Floating label input -->
    <div class="form-group form-group--floating">
        <input type="text" class="input input--floating" id="name" placeholder=" ">
        <label for="name" class="label label--floating">Full Name</label>
    </div>
    
    <!-- Input group -->
    <div class="form-group">
        <label class="label">Email Newsletter</label>
        <div class="input-group">
            <input type="email" class="input" placeholder="Enter email">
            <button class="btn btn--primary">Subscribe</button>
        </div>
    </div>
    
    <!-- Textarea -->
    <div class="form-group">
        <label class="label">Message</label>
        <textarea class="textarea" placeholder="Enter your message"></textarea>
    </div>
</form>
```

### Progress Indicators

Show progress with bars and rings:

```html
<!-- Linear progress -->
<div class="progress-bar" data-progress="75">
    <div class="progress-bar__fill"></div>
    <span class="progress-bar__text">75%</span>
</div>

<!-- Stepped progress -->
<div class="progress-steps">
    <div class="progress-step progress-step--completed">
        <div class="progress-step__circle">1</div>
        <span class="progress-step__label">Complete</span>
    </div>
    <div class="progress-step progress-step--active">
        <div class="progress-step__circle">2</div>
        <span class="progress-step__label">In Progress</span>
    </div>
    <div class="progress-step">
        <div class="progress-step__circle">3</div>
        <span class="progress-step__label">Pending</span>
    </div>
</div>
```

### Loading States

Show loading with spinners and skeletons:

```html
<!-- Spinners -->
<div class="spinner spinner--primary"></div>
<div class="spinner spinner--dots"><div></div><div></div><div></div></div>

<!-- Skeleton loading -->
<div class="skeleton skeleton--title"></div>
<div class="skeleton skeleton--text"></div>
<div class="skeleton skeleton--button"></div>
```

## JavaScript APIs

### Progress Management

Control progress bars programmatically:

```javascript
// Set progress with animation
progressManager.setProgress('#my-progress', 75, true);

// Increment progress
progressManager.increment('#my-progress', 10);

// Create new progress bar
const progressBar = progressManager.createProgressBar('#container', {
    progress: 50,
    showText: true,
    animated: true
});
```

### Loading States

Manage loading states for better UX:

```javascript
// Show button loading
loadingManager.showButtonLoading('#my-button', 'Processing...');

// Hide button loading
loadingManager.hideButtonLoading('#my-button');

// Show card loading
loadingManager.showCardLoading('#my-card');

// Hide card loading
loadingManager.hideCardLoading('#my-card');
```

### Toast Notifications

Display user feedback:

```javascript
// Show success toast
toastManager.show('Operation completed successfully!', 'success');

// Show error toast
toastManager.show('Something went wrong', 'error');

// Show info toast with custom duration
toastManager.show('Processing your request...', 'info', 3000);

// Show warning toast
toastManager.show('Please save your work', 'warning');
```

### Icon Management

Work with SVG icons:

```javascript
// Create icon
const icon = iconManager.createIcon('star', {
    size: 'lg',
    color: 'primary',
    spinning: true
});

// Add icon to button
iconManager.addIcon('#my-button', 'download', 'left');

// Get available icons
const icons = iconManager.getAvailableIcons();
console.log(icons); // ['home', 'user', 'star', ...]
```

## Best Practices

### Performance

1. **Only load what you need**:
   ```html
   <!-- If you don't need JavaScript features -->
   <link rel="stylesheet" href="css/variables.css">
   <link rel="stylesheet" href="css/styles.css">
   <!-- Skip the JS file -->
   ```

2. **Use CSS custom properties** for theming instead of overriding CSS:
   ```css
   /* Good */
   :root {
       --color-primary-500: #your-color;
   }
   
   /* Avoid */
   .btn--primary {
       background-color: #your-color !important;
   }
   ```

### Accessibility

1. **Always provide proper labels**:
   ```html
   <button class="btn btn--primary" aria-label="Save document">
       <svg class="icon"><use href="#icon-save"></use></svg>
   </button>
   ```

2. **Use semantic HTML**:
   ```html
   <main>
       <section>
           <h2>Section Title</h2>
           <article>
               <h3>Article Title</h3>
           </article>
       </section>
   </main>
   ```

3. **Test with keyboard navigation** - make sure all interactive elements are reachable with Tab key.

### Responsive Design

1. **Use the container class** for proper responsive behavior:
   ```html
   <div class="container">
       <!-- Your content -->
   </div>
   ```

2. **Test on multiple devices** and screen sizes.

3. **Use semantic breakpoints**:
   ```css
   /* Mobile first */
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

## Troubleshooting

### Common Issues

**Q: Styles not loading correctly**
A: Make sure you're loading CSS files in the correct order:
1. variables.css (first)
2. styles.css (second)  
3. queries.css (third)

**Q: Dark mode not working**
A: Ensure JavaScript is loaded and check the console for errors. The theme system requires JavaScript.

**Q: Icons not showing**
A: Make sure you've included the SVG definitions and are using the correct icon names. Check the console for 404 errors.

**Q: Components look different than examples**
A: Verify you're using the latest version and have all required CSS files loaded.

### Getting Help

- 📖 [Full Documentation](https://dnoice.github.io/ThemeKit-Pro/docs)
- 💬 [GitHub Discussions](https://github.com/dnoice/ThemeKit-Pro/discussions)
- 🐛 [Report Issues](https://github.com/dnoice/ThemeKit-Pro/issues)
- 📧 [Email Support](mailto:support@themekit-pro.com)

## Next Steps

Now that you have the basics down, check out:

- [Component Documentation](components.md) - Detailed component examples
- [Theming Guide](theming.md) - Advanced theming techniques
- [Accessibility Guide](accessibility.md) - Making your site accessible
- [Examples](../examples/) - Real-world usage examples

Happy building with ThemeKit Pro! 🎉
