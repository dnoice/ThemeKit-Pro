/* ============================================
   JAVASCRIPT FUNCTIONALITY
   ============================================ */

// ===========================================
// THEME MANAGEMENT
// ===========================================

const ThemeManager = {
    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeMenu = document.getElementById('themeMenu');
        this.themeOptions = document.querySelectorAll('.theme-option');
        
        this.loadTheme();
        this.bindEvents();
    },
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update active state
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    },
    
    bindEvents() {
        // Toggle menu
        this.themeToggle.addEventListener('click', () => {
            this.themeMenu.classList.toggle('active');
        });
        
        // Theme selection
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.setTheme(option.dataset.theme);
                this.themeMenu.classList.remove('active');
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-controls')) {
                this.themeMenu.classList.remove('active');
            }
        });
    }
};

// ===========================================
// SMOOTH SCROLL
// ===========================================

const SmoothScroll = {
    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    this.updateActiveLink(link);
                }
            });
        });
        
        // Update active link on scroll
        this.observeSections();
    },
    
    updateActiveLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    },
    
    observeSections() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = '#' + entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === targetId);
                    });
                }
            });
        }, {
            rootMargin: '-30% 0px -70% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
};

// ===========================================
// ICON SYSTEM
// ===========================================

const IconSystem = {
    init() {
        const iconItems = document.querySelectorAll('.icon-item');
        
        iconItems.forEach(item => {
            item.addEventListener('click', () => {
                const iconName = item.dataset.icon;
                const svgCode = `<svg class="icon icon-md">
    <use href="#icon-${iconName}"></use>
</svg>`;
                
                this.copyToClipboard(svgCode);
                Toast.show(`Copied icon: ${iconName}`, 'success');
                
                // Add visual feedback
                item.classList.add('copied');
                setTimeout(() => item.classList.remove('copied'), 1000);
            });
        });
    },
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
};

// ===========================================
// GRID DEMO
// ===========================================

const GridDemo = {
    init() {
        // Add interactive grid resizing if needed
        const gridItems = document.querySelectorAll('.grid-item');
        
        gridItems.forEach(item => {
            item.addEventListener('click', function() {
                // Toggle expanded state
                if (this.style.gridColumn === 'span 12') {
                    this.style.gridColumn = '';
                } else {
                    this.style.gridColumn = 'span 12';
                }
            });
        });
    }
};

// ===========================================
// EFFECTS DEMO
// ===========================================

const EffectsDemo = {
    init() {
        // Add interactive shadow/blur controls
        const shadowBoxes = document.querySelectorAll('.shadow-box');
        const blurBoxes = document.querySelectorAll('.blur-box');
        
        shadowBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Glass card parallax effect
        const glassCards = document.querySelectorAll('.glass-card');
        
        glassCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
};

// ===========================================
// LOADING STATES
// ===========================================

const LoadingStates = {
    init() {
        // Animate progress bars on scroll into view
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    
                    observer.unobserve(bar);
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
        
        // Add click to restart animation for spinners
        const spinners = document.querySelectorAll('.spinner');
        
        spinners.forEach(spinner => {
            spinner.addEventListener('click', function() {
                const animations = this.getAnimations();
                animations.forEach(animation => {
                    animation.cancel();
                    animation.play();
                });
            });
        });
    }
};

// ===========================================
// COLOR PALETTE INTERACTION
// ===========================================

const ColorPalette = {
    init() {
        const colorCards = document.querySelectorAll('.color-card');
        
        colorCards.forEach(card => {
            card.addEventListener('click', () => {
                const colorVar = card.dataset.color;
                const colorValue = getComputedStyle(document.documentElement)
                    .getPropertyValue(colorVar).trim();
                
                this.copyToClipboard(colorVar, colorValue);
                this.showToast(`Copied: ${colorVar}`, 'success');
            });
        });
    },
    
    copyToClipboard(text, value) {
        const textToCopy = `${text}: ${value};`;
        navigator.clipboard.writeText(textToCopy);
    },
    
    showToast(message, type = 'info') {
        Toast.show(message, type);
    }
};

// ===========================================
// TOAST NOTIFICATIONS
// ===========================================

const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toastContainer');
    },
    
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        this.container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// ===========================================
// MODAL
// ===========================================

const Modal = {
    modal: null,
    modalTitle: null,
    modalBody: null,
    modalClose: null,
    
    init() {
        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.modalClose = document.getElementById('modalClose');
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Close button
        this.modalClose.addEventListener('click', () => this.close());
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    },
    
    open(title, content) {
        this.modalTitle.textContent = title;
        this.modalBody.innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// ===========================================
// ANIMATIONS
// ===========================================

const AnimationController = {
    init() {
        this.playButton = document.getElementById('playAnimations');
        this.speedSelector = document.getElementById('animationSpeed');
        this.animationCards = document.querySelectorAll('.animation-card');
        
        this.bindEvents();
    },
    
    bindEvents() {
        if (this.playButton) {
            this.playButton.addEventListener('click', () => this.playAll());
        }
        
        if (this.speedSelector) {
            this.speedSelector.addEventListener('change', (e) => {
                this.updateSpeed(e.target.value);
            });
        }
        
        // Individual animation trigger
        this.animationCards.forEach(card => {
            card.addEventListener('click', () => {
                this.playAnimation(card);
            });
        });
    },
    
    playAll() {
        this.animationCards.forEach((card, index) => {
            setTimeout(() => {
                this.playAnimation(card);
            }, index * 100);
        });
    },
    
    playAnimation(card) {
        const animationType = card.dataset.animation;
        const box = card.querySelector('.animation-box');
        
        // Remove existing animation class
        box.classList.remove(`animate-${animationType}`);
        
        // Trigger reflow
        void box.offsetWidth;
        
        // Add animation class
        box.classList.add(`animate-${animationType}`);
        
        // Remove class after animation completes
        const duration = this.getAnimationDuration();
        setTimeout(() => {
            box.classList.remove(`animate-${animationType}`);
        }, duration);
    },
    
    updateSpeed(speed) {
        const speeds = {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms',
            slower: '1000ms'
        };
        
        document.documentElement.style.setProperty('--duration-normal', speeds[speed]);
        document.documentElement.style.setProperty('--duration-slow', speeds[speed]);
    },
    
    getAnimationDuration() {
        const speed = this.speedSelector ? this.speedSelector.value : 'normal';
        const durations = {
            fast: 150,
            normal: 300,
            slow: 500,
            slower: 1000
        };
        return durations[speed];
    }
};

// ===========================================
// FORM VALIDATION
// ===========================================

const FormValidator = {
    init() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    Toast.show('Form submitted successfully!', 'success');
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
            });
        });
    },
    
    validateForm(form) {
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error
        this.removeError(field);
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email');
                isValid = false;
            }
        }
        
        return isValid;
    },
    
    showError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        field.parentElement.appendChild(errorElement);
    },
    
    removeError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentElement.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
};

// ===========================================
// LAZY LOADING
// ===========================================

const LazyLoader = {
    init() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        this.loadElement(element);
                        imageObserver.unobserve(element);
                    }
                });
            });
            
            lazyElements.forEach(element => imageObserver.observe(element));
        } else {
            // Fallback for older browsers
            lazyElements.forEach(element => this.loadElement(element));
        }
    },
    
    loadElement(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        }
        
        if (element.dataset.lazy) {
            element.classList.add('loaded');
            element.removeAttribute('data-lazy');
        }
    }
};

// ===========================================
// PERFORMANCE MONITORING
// ===========================================

const PerformanceMonitor = {
    init() {
        if ('PerformanceObserver' in window) {
            // Monitor long tasks
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.warn('Long task detected:', entry);
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // Long task monitoring not supported
            }
        }
        
        // Log page load metrics
        window.addEventListener('load', () => {
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            }
        });
    }
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },
    
    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
};

// ===========================================
// ACCESSIBILITY ENHANCEMENTS
// ===========================================

const Accessibility = {
    init() {
        this.setupKeyboardNavigation();
        this.setupAriaLive();
        this.setupFocusTrap();
    },
    
    setupKeyboardNavigation() {
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + T: Toggle theme
            if (e.altKey && e.key === 't') {
                document.getElementById('themeToggle').click();
            }
            
            // Alt + M: Open modal (if needed)
            if (e.altKey && e.key === 'm') {
                Modal.open('Keyboard Shortcuts', `
                    <ul>
                        <li><kbd>Alt + T</kbd>: Toggle theme menu</li>
                        <li><kbd>ESC</kbd>: Close modal/menu</li>
                        <li><kbd>Tab</kbd>: Navigate elements</li>
                    </ul>
                `);
            }
        });
    },
    
    setupAriaLive() {
        // Create aria-live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'aria-live';
        document.body.appendChild(liveRegion);
    },
    
    setupFocusTrap() {
        // Trap focus in modal when open
        const modal = document.getElementById('modal');
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        modal.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            const focusable = modal.querySelectorAll(focusableElements);
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    },
    
    announce(message) {
        const liveRegion = document.getElementById('aria-live');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
};

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    ThemeManager.init();
    SmoothScroll.init();
    ColorPalette.init();
    IconSystem.init();
    GridDemo.init();
    EffectsDemo.init();
    LoadingStates.init();
    Toast.init();
    Modal.init();
    AnimationController.init();
    FormValidator.init();
    LazyLoader.init();
    Accessibility.init();
    PerformanceMonitor.init();
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Log initialization
    console.log('🎨 Theme System initialized successfully!');
    console.log('📦 Modules loaded:', {
        theme: '✓',
        icons: '✓',
        grid: '✓',
        effects: '✓',
        loading: '✓',
        animations: '✓'
    });
});

// ===========================================
// SERVICE WORKER REGISTRATION (Optional)
// ===========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => console.log('ServiceWorker registered:', registration),
            error => console.log('ServiceWorker registration failed:', error)
        ).catch(err => {
            // Service worker not available or failed
        });
    });
}

// ===========================================
// EXPORT FOR EXTERNAL USE
// ===========================================

window.ThemeSystem = {
    ThemeManager,
    IconSystem,
    GridDemo,
    EffectsDemo,
    LoadingStates,
    Toast,
    Modal,
    Utils,
    Accessibility
};
