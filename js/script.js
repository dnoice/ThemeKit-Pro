/* ==========================================================================
   ADVANCED INTERACTIVE FEATURES & COMPREHENSIVE FUNCTIONALITY
   ========================================================================== */

(function() {
  'use strict';

  // ==========================================================================
  // GLOBAL STATE MANAGEMENT
  // ==========================================================================

  const AppState = {
    theme: 'light',
    isNavOpen: false,
    currentTestimonial: 0,
    currentTab: 'design',
    componentFilter: 'all',
    pricingMode: 'monthly',
    animations: {
      enabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  };

  // ==========================================================================
  // UTILITY FUNCTIONS
  // ==========================================================================

  const Utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
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

    // Throttle function for scroll events
    throttle: (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Check if element is in viewport
    isInViewport: (element, threshold = 0.1) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      return (
        rect.top <= windowHeight * (1 - threshold) &&
        rect.bottom >= windowHeight * threshold &&
        rect.left <= windowWidth * (1 - threshold) &&
        rect.right >= windowWidth * threshold
      );
    },

    // Generate unique IDs
    generateId: () => Math.random().toString(36).substr(2, 9),

    // Format numbers with animation
    animateNumber: (element, target, duration = 2000) => {
      const start = 0;
      const startTime = performance.now();
      
      const updateNumber = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          element.textContent = target.toLocaleString();
        }
      };
      
      requestAnimationFrame(updateNumber);
    },

    // Local storage helpers
    storage: {
      set: (key, value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.warn('localStorage not available:', error);
        }
      },
      
      get: (key, defaultValue = null) => {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
          console.warn('localStorage not available:', error);
          return defaultValue;
        }
      }
    }
  };

  // ==========================================================================
  // THEME MANAGEMENT - Enhanced
  // ==========================================================================

  class ThemeManager {
    constructor() {
      this.themeToggle = document.getElementById('themeToggle');
      this.themeIcon = document.querySelector('.theme-icon');
      this.themeText = document.querySelector('.theme-text');
      this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
      
      this.init();
    }

    init() {
      this.setTheme(this.currentTheme);
      this.bindEvents();
      this.updateThemeUI();
      this.setupSystemThemeListener();
    }

    getStoredTheme() {
      return Utils.storage.get('theme');
    }

    getPreferredTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      Utils.storage.set('theme', theme);
      this.currentTheme = theme;
      AppState.theme = theme;
      this.updateThemeUI();
      this.announceThemeChange(theme);
      this.triggerThemeChangeEvent(theme);
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
      this.animateThemeTransition();
    }

    updateThemeUI() {
      if (this.themeIcon && this.themeText) {
        if (this.currentTheme === 'light') {
          this.themeIcon.textContent = '🌙';
          this.themeText.textContent = 'Dark';
        } else {
          this.themeIcon.textContent = '☀️';
          this.themeText.textContent = 'Light';
        }
      }
    }

    animateThemeTransition() {
      if (!AppState.animations.enabled) return;
      
      document.documentElement.style.transition = 'all 0.3s ease-in-out';
      
      // Add a subtle flash effect
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${this.currentTheme === 'dark' ? '#ffffff' : '#000000'};
        opacity: 0.1;
        pointer-events: none;
        z-index: ${getComputedStyle(document.documentElement).getPropertyValue('--z-loading')};
        animation: themeFlash 0.3s ease-out;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes themeFlash {
          0% { opacity: 0; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(flash);
      
      setTimeout(() => {
        document.documentElement.style.transition = '';
        document.body.removeChild(flash);
        document.head.removeChild(style);
      }, 300);
    }

    announceThemeChange(theme) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Theme changed to ${theme} mode`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    triggerThemeChangeEvent(theme) {
      const event = new CustomEvent('themeChange', {
        detail: { theme }
      });
      document.dispatchEvent(event);
    }

    setupSystemThemeListener() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    bindEvents() {
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Keyboard accessibility
        this.themeToggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleTheme();
          }
        });
      }

      // Theme preview functionality
      const themePreviewButtons = document.querySelectorAll('[data-preview]');
      themePreviewButtons.forEach(button => {
        button.addEventListener('click', () => {
          const previewTheme = button.dataset.preview;
          const demoElement = document.getElementById('themeDemo');
          
          if (demoElement) {
            demoElement.setAttribute('data-theme', previewTheme);
          }
        });
      });
    }
  }

  // ==========================================================================
  // NAVIGATION MANAGEMENT
  // ==========================================================================

  class NavigationManager {
    constructor() {
      this.nav = document.querySelector('.nav');
      this.navToggle = document.getElementById('navToggle');
      this.navMenu = document.querySelector('.nav__menu');
      this.navLinks = document.querySelectorAll('.nav__link');
      this.header = document.querySelector('.header');
      this.lastScrollY = window.scrollY;
      
      this.init();
    }

    init() {
      this.bindEvents();
      this.setupScrollBehavior();
      this.setupSmoothScrolling();
    }

    toggleNav() {
      AppState.isNavOpen = !AppState.isNavOpen;
      
      if (this.navMenu) {
        this.navMenu.classList.toggle('active', AppState.isNavOpen);
      }
      
      if (this.navToggle) {
        this.navToggle.setAttribute('aria-expanded', AppState.isNavOpen);
        this.navToggle.classList.toggle('active', AppState.isNavOpen);
      }
      
      // Prevent body scroll when nav is open on mobile
      document.body.style.overflow = AppState.isNavOpen ? 'hidden' : '';
      
      this.announceNavChange();
    }

    closeNav() {
      if (AppState.isNavOpen) {
        this.toggleNav();
      }
    }

    announceNavChange() {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Navigation menu ${AppState.isNavOpen ? 'opened' : 'closed'}`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    setupScrollBehavior() {
      const handleScroll = Utils.throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (this.header) {
          // Hide/show header on scroll
          if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.header.style.transform = 'translateY(-100%)';
          } else {
            this.header.style.transform = 'translateY(0)';
          }
          
          // Add backdrop blur effect
          if (currentScrollY > 50) {
            this.header.classList.add('scrolled');
          } else {
            this.header.classList.remove('scrolled');
          }
        }
        
        this.lastScrollY = currentScrollY;
      }, 100);
      
      window.addEventListener('scroll', handleScroll);
    }

    setupSmoothScrolling() {
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
              const headerHeight = this.header?.offsetHeight || 0;
              const targetPosition = target.offsetTop - headerHeight - 20;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              
              // Close mobile nav
              this.closeNav();
              
              // Update URL without triggering scroll
              history.pushState(null, null, href);
            }
          }
        });
      });
    }

    bindEvents() {
      if (this.navToggle) {
        this.navToggle.addEventListener('click', () => this.toggleNav());
      }

      // Close nav when clicking outside
      document.addEventListener('click', (e) => {
        if (AppState.isNavOpen && 
            !this.nav?.contains(e.target) && 
            !this.navToggle?.contains(e.target)) {
          this.closeNav();
        }
      });

      // Close nav on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && AppState.isNavOpen) {
          this.closeNav();
        }
      });

      // Handle window resize
      window.addEventListener('resize', Utils.debounce(() => {
        if (window.innerWidth >= 768 && AppState.isNavOpen) {
          this.closeNav();
        }
      }, 250));
    }
  }

  // ==========================================================================
  // ANIMATION SYSTEM
  // ==========================================================================

  class AnimationManager {
    constructor() {
      this.observedElements = new Set();
      this.init();
    }

    init() {
      if (!AppState.animations.enabled) return;
      
      this.setupIntersectionObserver();
      this.animateHeroStats();
      this.setupProgressRings();
      this.addAnimationClasses();
    }

    setupIntersectionObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, options);

      // Observe elements for animation
      const animatableElements = document.querySelectorAll(`
        .component-card,
        .pricing-card,
        .section__title,
        .hero__content,
        .testimonial,
        .faq__item,
        .demo-section
      `);
      
      animatableElements.forEach((el) => {
        el.classList.add('animate-prepare');
        this.observer.observe(el);
        this.observedElements.add(el);
      });
    }

    animateElement(element) {
      element.classList.add('animate-in');
      
      // Special animations for specific elements
      if (element.classList.contains('component-card')) {
        this.animateComponentCard(element);
      } else if (element.classList.contains('pricing-card')) {
        this.animatePricingCard(element);
      }
    }

    animateComponentCard(card) {
      const delay = Array.from(card.parentNode.children).indexOf(card) * 100;
      
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
      }, delay);
    }

    animatePricingCard(card) {
      if (card.classList.contains('pricing-card--featured')) {
        card.style.animationDelay = '0.3s';
        card.classList.add('bounce-in');
      }
    }

    animateHeroStats() {
      const stats = document.querySelectorAll('[data-count]');
      
      const animateStatsOnScroll = Utils.throttle(() => {
        stats.forEach(stat => {
          if (Utils.isInViewport(stat, 0.5) && !stat.classList.contains('animated')) {
            const target = parseInt(stat.dataset.count);
            Utils.animateNumber(stat, target, 2000);
            stat.classList.add('animated');
          }
        });
      }, 100);

      window.addEventListener('scroll', animateStatsOnScroll);
      
      // Check if stats are already in viewport
      setTimeout(animateStatsOnScroll, 500);
    }

    setupProgressRings() {
      const rings = document.querySelectorAll('[data-progress]');
      
      rings.forEach(ring => {
        const progress = parseInt(ring.dataset.progress);
        const circle = ring.querySelector('.progress-ring__circle');
        
        if (circle) {
          const radius = parseFloat(circle.getAttribute('r'));
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (progress / 100) * circumference;
          
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference;
          
          // Animate when in viewport
          const animateProgress = () => {
            if (Utils.isInViewport(ring)) {
              setTimeout(() => {
                circle.style.strokeDashoffset = offset;
              }, 500);
            }
          };

          window.addEventListener('scroll', Utils.throttle(animateProgress, 100));
          animateProgress();
        }
      });
    }

    addAnimationClasses() {
      const style = document.createElement('style');
      style.textContent = `
        .animate-prepare {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(30px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.95) translateY(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .progress-ring__circle {
          transition: stroke-dashoffset 1.5s ease-in-out;
        }
      `;
      
      if (!document.querySelector('#animation-styles')) {
        style.id = 'animation-styles';
        document.head.appendChild(style);
      }
    }
  }

  // ==========================================================================
  // TABS COMPONENT
  // ==========================================================================

  class TabsManager {
    constructor() {
      this.tabsContainer = document.getElementById('featureTabs');
      this.init();
    }

    init() {
      if (!this.tabsContainer) return;
      
      this.bindEvents();
      this.setupKeyboardNavigation();
    }

    switchTab(tabId) {
      if (!this.tabsContainer) return;
      
      // Update buttons
      const buttons = this.tabsContainer.querySelectorAll('.tabs__button');
      buttons.forEach(button => {
        const isActive = button.dataset.tab === tabId;
        button.classList.toggle('tabs__button--active', isActive);
        button.setAttribute('aria-selected', isActive);
      });
      
      // Update panels
      const panels = this.tabsContainer.querySelectorAll('.tabs__panel');
      panels.forEach(panel => {
        const isActive = panel.dataset.panel === tabId;
        panel.classList.toggle('tabs__panel--active', isActive);
        panel.setAttribute('aria-hidden', !isActive);
      });
      
      AppState.currentTab = tabId;
      
      // Announce tab change
      this.announceTabChange(tabId);
    }

    announceTabChange(tabId) {
      const button = this.tabsContainer.querySelector(`[data-tab="${tabId}"]`);
      const tabName = button?.textContent.trim() || tabId;
      
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `${tabName} tab selected`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    setupKeyboardNavigation() {
      const buttons = this.tabsContainer?.querySelectorAll('.tabs__button');
      
      buttons?.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
          let newIndex = index;
          
          switch (e.key) {
            case 'ArrowLeft':
              e.preventDefault();
              newIndex = index > 0 ? index - 1 : buttons.length - 1;
              break;
            case 'ArrowRight':
              e.preventDefault();
              newIndex = index < buttons.length - 1 ? index + 1 : 0;
              break;
            case 'Home':
              e.preventDefault();
              newIndex = 0;
              break;
            case 'End':
              e.preventDefault();
              newIndex = buttons.length - 1;
              break;
            default:
              return;
          }
          
          buttons[newIndex].focus();
          this.switchTab(buttons[newIndex].dataset.tab);
        });
      });
    }

    bindEvents() {
      if (!this.tabsContainer) return;
      
      this.tabsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.tabs__button');
        if (button && button.dataset.tab) {
          this.switchTab(button.dataset.tab);
        }
      });
    }
  }

  // ==========================================================================
  // COMPONENT FILTER
  // ==========================================================================

  class ComponentFilter {
    constructor() {
      this.filterContainer = document.querySelector('.component-filter');
      this.componentGrid = document.getElementById('componentGrid');
      this.init();
    }

    init() {
      if (!this.filterContainer || !this.componentGrid) return;
      
      this.bindEvents();
      this.setupKeyboardNavigation();
    }

    filterComponents(category) {
      const items = this.componentGrid.querySelectorAll('.component-item');
      
      items.forEach(item => {
        const itemCategory = item.dataset.category;
        const shouldShow = category === 'all' || itemCategory === category;
        
        if (shouldShow) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
          item.classList.add('hidden');
        }
      });
      
      // Update filter buttons
      const buttons = this.filterContainer.querySelectorAll('.filter-btn');
      buttons.forEach(button => {
        const isActive = button.dataset.filter === category;
        button.classList.toggle('filter-btn--active', isActive);
        button.setAttribute('aria-pressed', isActive);
      });
      
      AppState.componentFilter = category;
      this.announceFilterChange(category);
    }

    announceFilterChange(category) {
      const visibleCount = this.componentGrid.querySelectorAll('.component-item:not(.hidden)').length;
      const categoryName = category === 'all' ? 'all categories' : category;
      
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Filtered to ${categoryName}. Showing ${visibleCount} components.`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    setupKeyboardNavigation() {
      const buttons = this.filterContainer?.querySelectorAll('.filter-btn');
      
      buttons?.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
          let newIndex = index;
          
          switch (e.key) {
            case 'ArrowLeft':
              e.preventDefault();
              newIndex = index > 0 ? index - 1 : buttons.length - 1;
              break;
            case 'ArrowRight':
              e.preventDefault();
              newIndex = index < buttons.length - 1 ? index + 1 : 0;
              break;
            default:
              return;
          }
          
          buttons[newIndex].focus();
        });
      });
    }

    bindEvents() {
      if (!this.filterContainer) return;
      
      this.filterContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.filter-btn');
        if (button && button.dataset.filter) {
          this.filterComponents(button.dataset.filter);
        }
      });
    }
  }

  // ==========================================================================
  // PRICING TOGGLE
  // ==========================================================================

  class PricingManager {
    constructor() {
      this.toggle = document.getElementById('pricingToggle');
      this.priceElements = document.querySelectorAll('[data-monthly][data-annual]');
      this.init();
    }

    init() {
      if (!this.toggle) return;
      
      this.bindEvents();
      this.updatePrices();
    }

    togglePricing() {
      AppState.pricingMode = AppState.pricingMode === 'monthly' ? 'annual' : 'monthly';
      
      this.toggle.classList.toggle('active', AppState.pricingMode === 'annual');
      this.toggle.setAttribute('aria-pressed', AppState.pricingMode === 'annual');
      
      this.updatePrices();
      this.announcePricingChange();
    }

    updatePrices() {
      this.priceElements.forEach(element => {
        const monthlyPrice = element.dataset.monthly;
        const annualPrice = element.dataset.annual;
        const targetPrice = AppState.pricingMode === 'monthly' ? monthlyPrice : annualPrice;
        
        if (AppState.animations.enabled) {
          this.animatePriceChange(element, targetPrice);
        } else {
          element.textContent = targetPrice;
        }
      });
    }

    animatePriceChange(element, targetPrice) {
      const currentPrice = parseInt(element.textContent);
      const target = parseInt(targetPrice);
      const duration = 800;
      const startTime = performance.now();
      
      const updatePrice = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(currentPrice + (target - currentPrice) * easeOutCubic);
        
        element.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(updatePrice);
        } else {
          element.textContent = target;
        }
      };
      
      requestAnimationFrame(updatePrice);
    }

    announcePricingChange() {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Pricing mode changed to ${AppState.pricingMode}`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    bindEvents() {
      if (!this.toggle) return;
      
      this.toggle.addEventListener('click', () => this.togglePricing());
      
      this.toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.togglePricing();
        }
      });
    }
  }

  // ==========================================================================
  // TESTIMONIALS CAROUSEL
  // ==========================================================================

  class TestimonialsCarousel {
    constructor() {
      this.container = document.getElementById('testimonials');
      this.testimonials = [];
      this.dots = [];
      this.currentIndex = 0;
      this.autoplayInterval = null;
      this.autoplayDelay = 5000;
      
      this.init();
    }

    init() {
      if (!this.container) return;
      
      this.testimonials = Array.from(this.container.querySelectorAll('.testimonial'));
      this.dots = Array.from(this.container.querySelectorAll('.testimonials__dot'));
      
      if (this.testimonials.length === 0) return;
      
      this.bindEvents();
      this.setupKeyboardNavigation();
      this.startAutoplay();
      this.setupIntersectionObserver();
    }

    goToSlide(index) {
      if (index < 0 || index >= this.testimonials.length) return;
      
      // Hide current testimonial
      this.testimonials[this.currentIndex].classList.remove('testimonial--active');
      this.dots[this.currentIndex]?.classList.remove('testimonials__dot--active');
      
      // Show new testimonial
      this.currentIndex = index;
      this.testimonials[this.currentIndex].classList.add('testimonial--active');
      this.dots[this.currentIndex]?.classList.add('testimonials__dot--active');
      
      AppState.currentTestimonial = this.currentIndex;
      this.announceSlideChange();
    }

    nextSlide() {
      const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.goToSlide(nextIndex);
    }

    prevSlide() {
      const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
      this.goToSlide(prevIndex);
    }

    startAutoplay() {
      this.stopAutoplay();
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoplayDelay);
    }

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }

    announceSlideChange() {
      const testimonial = this.testimonials[this.currentIndex];
      const name = testimonial.querySelector('.testimonial__name')?.textContent || '';
      
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Testimonial ${this.currentIndex + 1} of ${this.testimonials.length}${name ? ` by ${name}` : ''}`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startAutoplay();
          } else {
            this.stopAutoplay();
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(this.container);
    }

    setupKeyboardNavigation() {
      this.container.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.prevSlide();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextSlide();
            break;
          case 'Home':
            e.preventDefault();
            this.goToSlide(0);
            break;
          case 'End':
            e.preventDefault();
            this.goToSlide(this.testimonials.length - 1);
            break;
        }
      });
    }

    bindEvents() {
      // Previous/Next buttons
      const prevBtn = document.getElementById('prevTestimonial');
      const nextBtn = document.getElementById('nextTestimonial');
      
      prevBtn?.addEventListener('click', () => {
        this.stopAutoplay();
        this.prevSlide();
        setTimeout(() => this.startAutoplay(), 2000);
      });
      
      nextBtn?.addEventListener('click', () => {
        this.stopAutoplay();
        this.nextSlide();
        setTimeout(() => this.startAutoplay(), 2000);
      });
      
      // Dot navigation
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.stopAutoplay();
          this.goToSlide(index);
          setTimeout(() => this.startAutoplay(), 2000);
        });
      });
      
      // Pause on hover
      this.container.addEventListener('mouseenter', () => this.stopAutoplay());
      this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }
  }

  // ==========================================================================
  // FAQ ACCORDION
  // ==========================================================================

  class FAQAccordion {
    constructor() {
      this.faqContainer = document.querySelector('.faq');
      this.init();
    }

    init() {
      if (!this.faqContainer) return;
      
      this.bindEvents();
      this.setupKeyboardNavigation();
    }

    toggleItem(item) {
      const isActive = item.classList.contains('active');
      
      // Close all items
      this.faqContainer.querySelectorAll('.faq__item').forEach(faqItem => {
        faqItem.classList.remove('active');
        const answer = faqItem.querySelector('.faq__answer');
        const button = faqItem.querySelector('.faq__question');
        
        if (answer) answer.style.maxHeight = '0';
        if (button) button.setAttribute('aria-expanded', 'false');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq__answer');
        const button = item.querySelector('.faq__question');
        
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        if (button) {
          button.setAttribute('aria-expanded', 'true');
        }
        
        this.announceFAQChange(item, true);
      } else {
        this.announceFAQChange(item, false);
      }
    }

    announceFAQChange(item, isExpanded) {
      const question = item.querySelector('.faq__question span')?.textContent || '';
      
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `FAQ item "${question}" ${isExpanded ? 'expanded' : 'collapsed'}`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    setupKeyboardNavigation() {
      const questions = this.faqContainer?.querySelectorAll('.faq__question');
      
      questions?.forEach((question, index) => {
        question.addEventListener('keydown', (e) => {
          let newIndex = index;
          
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              newIndex = index < questions.length - 1 ? index + 1 : 0;
              break;
            case 'ArrowUp':
              e.preventDefault();
              newIndex = index > 0 ? index - 1 : questions.length - 1;
              break;
            case 'Home':
              e.preventDefault();
              newIndex = 0;
              break;
            case 'End':
              e.preventDefault();
              newIndex = questions.length - 1;
              break;
            default:
              return;
          }
          
          questions[newIndex].focus();
        });
      });
    }

    bindEvents() {
      if (!this.faqContainer) return;
      
      this.faqContainer.addEventListener('click', (e) => {
        const question = e.target.closest('.faq__question');
        if (question) {
          const item = question.closest('.faq__item');
          if (item) {
            this.toggleItem(item);
          }
        }
      });
    }
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================

  class ToastManager {
    constructor() {
      this.container = document.getElementById('toastContainer');
      this.toasts = [];
      this.init();
    }

    init() {
      if (!this.container) {
        this.createContainer();
      }
    }

    createContainer() {
      this.container = document.createElement('div');
      this.container.id = 'toastContainer';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }

    show(message, type = 'success', duration = 5000) {
      const toast = this.createToast(message, type);
      this.container.appendChild(toast);
      this.toasts.push(toast);
      
      // Trigger entrance animation
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
      
      // Auto remove
      if (duration > 0) {
        setTimeout(() => {
          this.remove(toast);
        }, duration);
      }
      
      return toast;
    }

    createToast(message, type) {
      const toast = document.createElement('div');
      toast.className = `toast toast--${type}`;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      
      const icons = {
        success: '✓',
        warning: '⚠',
        error: '✕',
        info: 'ℹ'
      };
      
      toast.innerHTML = `
        <div class="toast__icon">${icons[type] || icons.info}</div>
        <div class="toast__content">
          <div class="toast__message">${message}</div>
        </div>
        <button class="toast__close" aria-label="Close notification">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      `;
      
      // Close button functionality
      const closeBtn = toast.querySelector('.toast__close');
      closeBtn?.addEventListener('click', () => this.remove(toast));
      
      return toast;
    }

    remove(toast) {
      if (!toast || !toast.parentNode) return;
      
      toast.style.animation = 'toastSlideOut 0.3s ease-in forwards';
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      }, 300);
    }

    removeAll() {
      this.toasts.forEach(toast => this.remove(toast));
    }
  }

  // ==========================================================================
  // FORM ENHANCEMENTS
  // ==========================================================================

  class FormManager {
    constructor() {
      this.init();
    }

    init() {
      this.enhanceInputs();
      this.setupNewsletterForm();
      this.addValidationStyles();
    }

    enhanceInputs() {
      const inputs = document.querySelectorAll('.input, .textarea');
      
      inputs.forEach((input) => {
        // Floating label effect
        input.addEventListener('focus', () => {
          input.parentElement?.classList.add('input-focused');
        });
        
        input.addEventListener('blur', () => {
          input.parentElement?.classList.remove('input-focused');
          this.updateInputState(input);
        });

        input.addEventListener('input', () => {
          this.updateInputState(input);
          this.validateInput(input);
        });

        // Check initial state
        this.updateInputState(input);
      });
    }

    updateInputState(input) {
      const hasValue = input.value.trim() !== '';
      input.parentElement?.classList.toggle('input-filled', hasValue);
    }

    validateInput(input) {
      const isValid = input.validity.valid;
      input.classList.toggle('input-error', !isValid);
      
      // Remove error styling when user starts typing
      if (isValid && input.classList.contains('input-error')) {
        input.classList.remove('input-error');
      }
    }

    setupNewsletterForm() {
      const form = document.getElementById('newsletterForm');
      if (!form) return;
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('#newsletterEmail');
        if (!email || !email.validity.valid) {
          window.toastManager?.show('Please enter a valid email address', 'error');
          return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Subscribing...';
        }
        
        // Simulate API call
        setTimeout(() => {
          window.toastManager?.show('Successfully subscribed to newsletter!', 'success');
          form.reset();
          
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }, 1500);
      });
    }

    addValidationStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .input-focused .label--floating {
          color: var(--interactive-primary);
        }
        
        .input-filled .label--floating {
          top: 0;
          transform: translateY(-50%);
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
        }
        
        .input-error {
          border-color: var(--border-error) !important;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        @keyframes toastSlideOut {
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `;
      
      if (!document.querySelector('#form-styles')) {
        style.id = 'form-styles';
        document.head.appendChild(style);
      }
    }
  }

  // ==========================================================================
  // PERFORMANCE MONITOR
  // ==========================================================================

  class PerformanceMonitor {
    constructor() {
      this.metrics = {
        pageLoadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        interactionCount: 0
      };
      
      this.init();
    }

    init() {
      this.monitorPageLoad();
      this.monitorInteractions();
      this.setupPerformanceObserver();
    }

    monitorPageLoad() {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          const paintEntries = performance.getEntriesByType('paint');
          
          this.metrics.pageLoadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
          this.metrics.domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart);
          this.metrics.firstPaint = Math.round(paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0);
          
          this.logMetrics();
        }, 100);
      });
    }

    monitorInteractions() {
      const startTime = performance.now();
      
      document.addEventListener('click', (e) => {
        this.metrics.interactionCount++;
        
        if (e.target.matches('.btn, .nav__link, .tabs__button, .filter-btn')) {
          const interactionStart = performance.now();
          
          requestAnimationFrame(() => {
            const interactionEnd = performance.now();
            const duration = interactionEnd - interactionStart;
            
            if (duration > 16) {
              console.warn(`Slow interaction detected: ${duration.toFixed(2)}ms on`, e.target);
            }
          });
        }
      });
    }

    setupPerformanceObserver() {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              if (entry.entryType === 'largest-contentful-paint') {
                console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
              } else if (entry.entryType === 'first-input') {
                console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
              }
            });
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        } catch (error) {
          console.warn('Performance observer not supported:', error);
        }
      }
    }

    logMetrics() {
      if (this.isDevelopment()) {
        console.group('🚀 Performance Metrics');
        console.log(`Page Load Time: ${this.metrics.pageLoadTime}ms`);
        console.log(`DOM Content Loaded: ${this.metrics.domContentLoaded}ms`);
        console.log(`First Paint: ${this.metrics.firstPaint}ms`);
        console.log(`Interactions: ${this.metrics.interactionCount}`);
        console.groupEnd();
      }
    }

    isDevelopment() {
      return window.location.hostname === 'localhost' || 
             window.location.hostname === '127.0.0.1' ||
             window.location.hostname === '';
    }
  }

  // ==========================================================================
  // PROGRESS MANAGER
  // ==========================================================================

  class ProgressManager {
    constructor() {
      this.activeProgressBars = new Map();
      this.init();
    }

    init() {
      this.initializeProgressBars();
    }

    initializeProgressBars() {
      const progressBars = document.querySelectorAll('[data-progress]');
      
      progressBars.forEach(bar => {
        const progress = parseInt(bar.dataset.progress) || 0;
        this.setProgress(bar, progress, false);
      });
    }

    setProgress(element, percentage, animate = true) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      if (!element) return;
      
      const fill = element.querySelector('.progress-bar__fill');
      const text = element.querySelector('.progress-bar__text');
      
      if (!fill) return;
      
      percentage = Math.max(0, Math.min(100, percentage));
      
      if (animate) {
        // Animate the progress change
        const currentWidth = parseFloat(fill.style.width) || 0;
        this.animateProgress(fill, text, currentWidth, percentage);
      } else {
        // Set immediately
        fill.style.width = `${percentage}%`;
        if (text) text.textContent = `${Math.round(percentage)}%`;
      }
      
      element.dataset.progress = percentage;
    }

    animateProgress(fill, text, from, to, duration = 500) {
      const startTime = performance.now();
      
      const updateProgress = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = from + (to - from) * easeOutCubic;
        
        fill.style.width = `${current}%`;
        if (text) text.textContent = `${Math.round(current)}%`;
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        }
      };
      
      requestAnimationFrame(updateProgress);
    }

    increment(element, amount = 1) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      if (!element) return;
      
      const current = parseInt(element.dataset.progress) || 0;
      this.setProgress(element, current + amount);
    }

    createProgressBar(container, options = {}) {
      const {
        progress = 0,
        showText = true,
        className = '',
        animated = true
      } = options;
      
      const wrapper = document.createElement('div');
      wrapper.className = `progress-bar ${className}`;
      wrapper.dataset.progress = progress;
      
      const fill = document.createElement('div');
      fill.className = 'progress-bar__fill';
      fill.style.width = `${progress}%`;
      
      wrapper.appendChild(fill);
      
      if (showText) {
        const text = document.createElement('span');
        text.className = 'progress-bar__text';
        text.textContent = `${progress}%`;
        wrapper.appendChild(text);
      }
      
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }
      
      if (container) {
        container.appendChild(wrapper);
      }
      
      return wrapper;
    }
  }

  // ==========================================================================
  // LOADING MANAGER
  // ==========================================================================

  class LoadingManager {
    constructor() {
      this.activeLoadingStates = new Set();
      this.init();
    }

    init() {
      this.createLoadingStyles();
    }

    showButtonLoading(button, text = null) {
      if (typeof button === 'string') {
        button = document.querySelector(button);
      }
      
      if (!button) return;
      
      button.dataset.originalText = button.textContent;
      button.classList.add('btn--loading');
      button.disabled = true;
      
      if (text) {
        button.textContent = text;
      }
      
      this.activeLoadingStates.add(button);
    }

    hideButtonLoading(button) {
      if (typeof button === 'string') {
        button = document.querySelector(button);
      }
      
      if (!button) return;
      
      button.classList.remove('btn--loading');
      button.disabled = false;
      
      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
      }
      
      this.activeLoadingStates.delete(button);
    }

    showCardLoading(card) {
      if (typeof card === 'string') {
        card = document.querySelector(card);
      }
      
      if (!card) return;
      
      card.classList.add('card--loading');
      this.activeLoadingStates.add(card);
    }

    hideCardLoading(card) {
      if (typeof card === 'string') {
        card = document.querySelector(card);
      }
      
      if (!card) return;
      
      card.classList.remove('card--loading');
      this.activeLoadingStates.delete(card);
    }

    showInputLoading(input) {
      if (typeof input === 'string') {
        input = document.querySelector(input);
      }
      
      if (!input) return;
      
      input.classList.add('input--loading');
      input.readOnly = true;
      this.activeLoadingStates.add(input);
    }

    hideInputLoading(input) {
      if (typeof input === 'string') {
        input = document.querySelector(input);
      }
      
      if (!input) return;
      
      input.classList.remove('input--loading');
      input.readOnly = false;
      this.activeLoadingStates.delete(input);
    }

    createSpinner(container, type = 'primary', size = 'base') {
      const spinner = document.createElement('div');
      spinner.className = `spinner spinner--${type} spinner--${size}`;
      
      if (type === 'dots') {
        spinner.innerHTML = '<div></div><div></div><div></div>';
      } else if (type === 'bars') {
        spinner.innerHTML = '<div></div><div></div><div></div><div></div>';
      }
      
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }
      
      if (container) {
        container.appendChild(spinner);
      }
      
      return spinner;
    }

    createLoadingStyles() {
      if (document.querySelector('#loading-manager-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'loading-manager-styles';
      style.textContent = `
        .spinner--small { width: 16px; height: 16px; }
        .spinner--base { width: 24px; height: 24px; }
        .spinner--large { width: 32px; height: 32px; }
        
        .spinner--small.spinner--dots div { width: 4px; height: 4px; }
        .spinner--large.spinner--dots div { width: 8px; height: 8px; }
        
        .spinner--small.spinner--bars div { width: 2px; height: 12px; }
        .spinner--large.spinner--bars div { width: 4px; height: 20px; }
      `;
      
      document.head.appendChild(style);
    }

    clearAllLoading() {
      this.activeLoadingStates.forEach(element => {
        if (element.classList.contains('btn--loading')) {
          this.hideButtonLoading(element);
        } else if (element.classList.contains('card--loading')) {
          this.hideCardLoading(element);
        } else if (element.classList.contains('input--loading')) {
          this.hideInputLoading(element);
        }
      });
    }
  }

  // ==========================================================================
  // ICON MANAGER
  // ==========================================================================

  class IconManager {
    constructor() {
      this.iconRegistry = new Map();
      this.init();
    }

    init() {
      this.registerDefaultIcons();
      this.setupIconUtilities();
    }

    registerDefaultIcons() {
      const defaultIcons = [
        'home', 'user', 'settings', 'heart', 'star', 'download', 'mail', 'search',
        'arrow-right', 'arrow-left', 'check', 'close', 'plus', 'minus', 'menu',
        'moon', 'sun', 'warning', 'info', 'upload', 'calendar', 'clock'
      ];
      
      defaultIcons.forEach(name => {
        this.iconRegistry.set(name, `#icon-${name}`);
      });
    }

    createIcon(name, options = {}) {
      const {
        size = 'base',
        className = '',
        color = '',
        interactive = false,
        spinning = false,
        pulse = false
      } = options;
      
      if (!this.iconRegistry.has(name)) {
        console.warn(`Icon "${name}" not found in registry`);
        return null;
      }
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('icon', `icon--${size}`);
      
      if (className) svg.classList.add(...className.split(' '));
      if (color) svg.classList.add(`icon--${color}`);
      if (interactive) svg.classList.add('icon--interactive');
      if (spinning) svg.classList.add('icon--spinning');
      if (pulse) svg.classList.add('icon--pulse');
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.iconRegistry.get(name));
      
      svg.appendChild(use);
      
      return svg;
    }

    addIcon(button, iconName, position = 'left', options = {}) {
      if (typeof button === 'string') {
        button = document.querySelector(button);
      }
      
      if (!button) return;
      
      const icon = this.createIcon(iconName, options);
      if (!icon) return;
      
      if (position === 'left') {
        button.insertBefore(icon, button.firstChild);
      } else {
        button.appendChild(icon);
      }
      
      return icon;
    }

    replaceIcon(element, newIconName, options = {}) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      if (!element) return;
      
      const existingIcon = element.querySelector('.icon');
      if (existingIcon) {
        const newIcon = this.createIcon(newIconName, options);
        if (newIcon) {
          element.replaceChild(newIcon, existingIcon);
          return newIcon;
        }
      }
      
      return null;
    }

    setupIconUtilities() {
      // Add global utility functions
      window.createIcon = (name, options) => this.createIcon(name, options);
      window.addIcon = (button, iconName, position, options) => this.addIcon(button, iconName, position, options);
    }

    registerIcon(name, href) {
      this.iconRegistry.set(name, href);
    }

    getAvailableIcons() {
      return Array.from(this.iconRegistry.keys());
    }
  }

  class AccessibilityManager {
    constructor() {
      this.isKeyboardUser = false;
      this.init();
    }

    init() {
      this.setupKeyboardNavigation();
      this.addSkipLinks();
      this.enhanceFocusManagement();
      this.setupReducedMotionSupport();
      this.addAriaLabels();
    }

    setupKeyboardNavigation() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          this.isKeyboardUser = true;
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', () => {
        this.isKeyboardUser = false;
        document.body.classList.remove('keyboard-navigation');
      });

      // Global keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
          switch (e.key) {
            case '/':
              e.preventDefault();
              this.focusSearch();
              break;
            case 'd':
              if (e.shiftKey) {
                e.preventDefault();
                window.themeManager?.toggleTheme();
              }
              break;
          }
        }
      });
    }

    addSkipLinks() {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Skip to main content';
      
      skipLink.addEventListener('focus', () => {
        skipLink.classList.remove('sr-only');
      });
      
      skipLink.addEventListener('blur', () => {
        skipLink.classList.add('sr-only');
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
      
      // Ensure main content has an ID
      const heroSection = document.querySelector('.hero');
      if (heroSection && !heroSection.id) {
        heroSection.id = 'main-content';
      }
    }

    enhanceFocusManagement() {
      // Focus trap for modals (if any)
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          const modal = document.querySelector('.modal.active');
          if (modal) {
            this.trapFocus(e, modal);
          }
        }
      });
    }

    trapFocus(e, container) {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    setupReducedMotionSupport() {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleMotionPreference = (e) => {
        AppState.animations.enabled = !e.matches;
        document.documentElement.style.setProperty(
          '--animation-duration', 
          e.matches ? '0ms' : '300ms'
        );
      };
      
      mediaQuery.addEventListener('change', handleMotionPreference);
      handleMotionPreference(mediaQuery);
    }

    addAriaLabels() {
      // Add missing aria labels
      const elements = [
        { selector: '.hero__title', label: 'Main heading' },
        { selector: '.nav__toggle', label: 'Toggle navigation menu' },
        { selector: '.theme-toggle', label: 'Toggle dark mode' },
        { selector: '.testimonials', label: 'Customer testimonials carousel' },
        { selector: '.faq', label: 'Frequently asked questions' }
      ];
      
      elements.forEach(({ selector, label }) => {
        const element = document.querySelector(selector);
        if (element && !element.getAttribute('aria-label')) {
          element.setAttribute('aria-label', label);
        }
      });
    }

    focusSearch() {
      const searchInput = document.querySelector('input[type="search"], .search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }

  // ==========================================================================
  // DEMO INTERACTIONS
  // ==========================================================================

  class DemoManager {
    constructor() {
      this.init();
    }

    init() {
      this.setupShowNotificationDemo();
      this.setupComponentCardInteractions();
      this.setupHeroButtons();
      this.setupProgressDemo();
      this.setupLoadingStateDemo();
      this.setupIconInteractions();
      this.setupInteractivePlayground();
    }

    setupShowNotificationDemo() {
      const showNotificationBtn = document.getElementById('showNotification');
      
      if (showNotificationBtn) {
        showNotificationBtn.addEventListener('click', () => {
          const messages = [
            'Component successfully updated!',
            'Your changes have been saved.',
            'Feature enabled successfully.',
            'Settings updated successfully.'
          ];
          
          const message = messages[Math.floor(Math.random() * messages.length)];
          window.toastManager?.show(message, 'success');
        });
      }
    }

    setupComponentCardInteractions() {
      const componentCards = document.querySelectorAll('.component-card');
      
      componentCards.forEach(card => {
        card.addEventListener('click', () => {
          const title = card.querySelector('.component-card__title')?.textContent || 'Component';
          window.toastManager?.show(`Viewing ${title} details`, 'info', 3000);
        });
      });
    }

    setupHeroButtons() {
      const getStartedBtn = document.getElementById('getStartedBtn');
      const viewDocsBtn = document.getElementById('viewDocsBtn');
      
      if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
          window.toastManager?.show('Welcome to ThemeKit Pro! Getting started...', 'success');
          
          // Scroll to components section
          const componentsSection = document.getElementById('components');
          if (componentsSection) {
            setTimeout(() => {
              componentsSection.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
          }
        });
      }
      
      if (viewDocsBtn) {
        viewDocsBtn.addEventListener('click', () => {
          window.toastManager?.show('Opening documentation...', 'info');
        });
      }
    }

    setupProgressDemo() {
      const progressBtn = document.getElementById('progressDemo');
      
      if (progressBtn) {
        progressBtn.addEventListener('click', () => {
          this.runProgressAnimation();
        });
      }
    }

    runProgressAnimation() {
      const progressBar = document.querySelector('[data-progress]');
      const progressFill = progressBar?.querySelector('.progress-bar__fill');
      const progressText = progressBar?.querySelector('.progress-bar__text');
      const steps = document.querySelectorAll('.progress-step');
      
      if (!progressBar || !progressFill || !progressText) return;
      
      // Reset progress
      progressFill.style.width = '0%';
      progressText.textContent = '0%';
      
      // Reset steps
      steps.forEach(step => {
        step.classList.remove('progress-step--completed', 'progress-step--active');
      });
      
      // Start animation
      let currentProgress = 0;
      let currentStep = 0;
      
      const animateProgress = () => {
        if (currentProgress <= 100) {
          progressFill.style.width = `${currentProgress}%`;
          progressText.textContent = `${currentProgress}%`;
          
          // Update steps
          if (currentProgress >= 33 && currentStep === 0) {
            steps[0]?.classList.add('progress-step--completed');
            steps[1]?.classList.add('progress-step--active');
            currentStep = 1;
          } else if (currentProgress >= 66 && currentStep === 1) {
            steps[1]?.classList.remove('progress-step--active');
            steps[1]?.classList.add('progress-step--completed');
            steps[2]?.classList.add('progress-step--active');
            currentStep = 2;
          } else if (currentProgress >= 100 && currentStep === 2) {
            steps[2]?.classList.remove('progress-step--active');
            steps[2]?.classList.add('progress-step--completed');
            currentStep = 3;
          }
          
          currentProgress += 1;
          setTimeout(animateProgress, 50);
        } else {
          window.toastManager?.show('Progress completed!', 'success');
        }
      };
      
      // Set first step as active
      steps[0]?.classList.add('progress-step--active');
      animateProgress();
    }

    setupLoadingStateDemo() {
      const toggleBtn = document.getElementById('toggleLoading');
      
      if (toggleBtn) {
        let isLoading = false;
        
        toggleBtn.addEventListener('click', () => {
          const loadingCard = document.querySelector('.loading-card');
          const skeletons = loadingCard?.querySelectorAll('.skeleton');
          
          if (!loadingCard) return;
          
          isLoading = !isLoading;
          
          if (isLoading) {
            // Show skeleton loading
            skeletons?.forEach(skeleton => {
              skeleton.style.display = 'block';
            });
            
            // Hide actual content (if any)
            const realContent = loadingCard.querySelector('.real-content');
            if (realContent) {
              realContent.style.display = 'none';
            }
            
            toggleBtn.textContent = 'Show Content';
            
            // Auto-toggle back after 3 seconds
            setTimeout(() => {
              if (isLoading) {
                toggleBtn.click();
              }
            }, 3000);
            
          } else {
            // Hide skeleton loading
            skeletons?.forEach(skeleton => {
              skeleton.style.display = 'none';
            });
            
            // Show real content
            let realContent = loadingCard.querySelector('.real-content');
            if (!realContent) {
              realContent = document.createElement('div');
              realContent.className = 'real-content';
              realContent.innerHTML = `
                <div class="loading-card__header">
                  <h4>Sample Card</h4>
                  <span class="badge badge--success">Active</span>
                </div>
                <div class="loading-card__content">
                  <p>This is the actual content that appears after loading is complete.</p>
                  <p>The skeleton states provide a smooth transition experience.</p>
                </div>
                <div class="loading-card__footer">
                  <button class="btn btn--primary btn--small">Action</button>
                </div>
              `;
              loadingCard.appendChild(realContent);
            }
            
            realContent.style.display = 'block';
            toggleBtn.textContent = 'Show Loading';
          }
        });
      }
    }

    setupIconInteractions() {
      const iconItems = document.querySelectorAll('.icon-item');
      
      iconItems.forEach(item => {
        item.addEventListener('click', () => {
          const iconName = item.querySelector('.icon-name')?.textContent;
          if (iconName) {
            // Copy icon code to clipboard
            const iconCode = `<svg class="icon icon--base"><use href="#icon-${iconName}"></use></svg>`;
            
            if (navigator.clipboard) {
              navigator.clipboard.writeText(iconCode).then(() => {
                window.toastManager?.show(`${iconName} icon code copied!`, 'success', 2000);
              });
            } else {
              // Fallback for browsers without clipboard API
              window.toastManager?.show(`Icon: ${iconName}`, 'info', 2000);
            }
            
            // Add visual feedback
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.transform = '';
            }, 150);
          }
        });
      });
    }

    setupInteractivePlayground() {
      const demoAllLoadingBtn = document.getElementById('demoAllLoading');
      const demoProgressBtn = document.getElementById('demoProgressSequence');
      const demoIconBtn = document.getElementById('demoIconAnimation');
      
      if (demoAllLoadingBtn) {
        demoAllLoadingBtn.addEventListener('click', () => {
          this.demoAllLoadingStates();
        });
      }
      
      if (demoProgressBtn) {
        demoProgressBtn.addEventListener('click', () => {
          this.demoProgressSequence();
        });
      }
      
      if (demoIconBtn) {
        demoIconBtn.addEventListener('click', () => {
          this.demoIconAnimations();
        });
      }
    }

    demoAllLoadingStates() {
      // Demo button loading
      const demoButton1 = document.getElementById('demoButton1');
      const demoButton2 = document.getElementById('demoButton2');
      
      if (demoButton1) {
        window.loadingManager?.showButtonLoading(demoButton1, 'Processing...');
        setTimeout(() => {
          window.loadingManager?.hideButtonLoading(demoButton1);
        }, 3000);
      }
      
      if (demoButton2) {
        setTimeout(() => {
          window.loadingManager?.showButtonLoading(demoButton2, 'Canceling...');
          setTimeout(() => {
            window.loadingManager?.hideButtonLoading(demoButton2);
          }, 2000);
        }, 1000);
      }
      
      // Demo card loading
      const demoCard1 = document.getElementById('demoCard1');
      if (demoCard1) {
        window.loadingManager?.showCardLoading(demoCard1);
        setTimeout(() => {
          window.loadingManager?.hideCardLoading(demoCard1);
        }, 4000);
      }
      
      // Demo spinner in header
      const headerSpinner = document.getElementById('headerSpinner');
      if (headerSpinner) {
        headerSpinner.style.display = 'block';
        setTimeout(() => {
          headerSpinner.style.display = 'none';
        }, 5000);
      }
      
      window.toastManager?.show('Demonstrating all loading states...', 'info', 2000);
    }

    demoProgressSequence() {
      const demoProgress = document.getElementById('demoProgress1');
      
      if (!demoProgress) return;
      
      // Reset progress
      window.progressManager?.setProgress(demoProgress, 0, false);
      
      window.toastManager?.show('Starting progress sequence...', 'info', 2000);
      
      // Animate progress through different stages
      const stages = [
        { progress: 25, delay: 500, message: 'Initializing...' },
        { progress: 50, delay: 1000, message: 'Processing data...' },
        { progress: 75, delay: 1500, message: 'Finalizing...' },
        { progress: 100, delay: 2000, message: 'Complete!' }
      ];
      
      stages.forEach((stage, index) => {
        setTimeout(() => {
          window.progressManager?.setProgress(demoProgress, stage.progress, true);
          
          if (index === stages.length - 1) {
            setTimeout(() => {
              window.toastManager?.show(stage.message, 'success', 2000);
            }, 500);
          }
        }, stage.delay);
      });
    }

    demoIconAnimations() {
      const statusIcon = document.getElementById('statusIcon');
      const iconButtons = document.querySelectorAll('.icon-demo-buttons .btn');
      
      if (statusIcon) {
        // Animate the heart icon
        statusIcon.classList.add('icon--pulse');
        statusIcon.style.color = 'var(--interactive-error)';
        
        setTimeout(() => {
          statusIcon.style.color = 'var(--interactive-success)';
        }, 1000);
        
        setTimeout(() => {
          statusIcon.classList.remove('icon--pulse');
          statusIcon.style.color = '';
        }, 3000);
      }
      
      // Animate icon buttons
      iconButtons.forEach((button, index) => {
        setTimeout(() => {
          const icon = button.querySelector('.icon');
          if (icon) {
            icon.classList.add('icon--spinning');
            button.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
              icon.classList.remove('icon--spinning');
              button.style.transform = '';
            }, 1500);
          }
        }, index * 300);
      });
      
      window.toastManager?.show('Icons are dancing! 💃', 'success', 2000);
    }
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  class ThemeKitApp {
    constructor() {
      this.managers = {};
      this.init();
    }

    init() {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeApp());
      } else {
        this.initializeApp();
      }
    }

    initializeApp() {
      try {
        // Initialize core managers
        this.managers.theme = new ThemeManager();
        this.managers.navigation = new NavigationManager();
        this.managers.animation = new AnimationManager();
        this.managers.toast = new ToastManager();
        this.managers.form = new FormManager();
        this.managers.accessibility = new AccessibilityManager();
        this.managers.performance = new PerformanceMonitor();
        
        // Initialize component managers
        this.managers.tabs = new TabsManager();
        this.managers.componentFilter = new ComponentFilter();
        this.managers.pricing = new PricingManager();
        this.managers.testimonials = new TestimonialsCarousel();
        this.managers.faq = new FAQAccordion();
        this.managers.demo = new DemoManager();
        
        // Initialize new utility managers
        this.managers.progress = new ProgressManager();
        this.managers.loading = new LoadingManager();
        this.managers.icon = new IconManager();
        
        // Make managers available globally for debugging
        if (this.isDevelopment()) {
          window.themeKit = this.managers;
          window.themeManager = this.managers.theme;
          window.toastManager = this.managers.toast;
          window.progressManager = this.managers.progress;
          window.loadingManager = this.managers.loading;
          window.iconManager = this.managers.icon;
        }
        
        // Setup global event listeners
        this.setupGlobalEvents();
        
        // Initialize loading state
        this.hideLoadingOverlay();
        
        console.log('🎨 ThemeKit Pro initialized successfully!');
        
        // Show welcome message
        setTimeout(() => {
          if (this.managers.toast) {
            this.managers.toast.show('🎉 ThemeKit Pro loaded! Try the interactive components.', 'success', 4000);
          }
        }, 1000);
        
      } catch (error) {
        console.error('Failed to initialize ThemeKit Pro:', error);
        this.handleInitializationError(error);
      }
    }

    setupGlobalEvents() {
      // Handle theme changes
      document.addEventListener('themeChange', (e) => {
        console.log('Theme changed to:', e.detail.theme);
      });
      
      // Handle visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.managers.testimonials?.stopAutoplay();
        } else {
          this.managers.testimonials?.startAutoplay();
        }
      });
      
      // Handle window resize
      window.addEventListener('resize', Utils.debounce(() => {
        // Recalculate any layout-dependent features
        this.handleResize();
      }, 250));
      
      // Handle before unload
      window.addEventListener('beforeunload', () => {
        // Save any necessary state
        this.saveState();
      });
    }

    handleResize() {
      // Update any layout calculations
      if (this.managers.testimonials) {
        this.managers.testimonials.updateLayout?.();
      }
    }

    saveState() {
      Utils.storage.set('appState', {
        theme: AppState.theme,
        currentTab: AppState.currentTab,
        componentFilter: AppState.componentFilter,
        pricingMode: AppState.pricingMode
      });
    }

    hideLoadingOverlay() {
      const overlay = document.getElementById('loadingOverlay');
      if (overlay) {
        setTimeout(() => {
          overlay.classList.remove('active');
        }, 500);
      }
    }

    handleInitializationError(error) {
      const errorMsg = 'Failed to initialize application. Please refresh the page.';
      
      // Show error toast if available
      if (window.toastManager) {
        window.toastManager.show(errorMsg, 'error', 0);
      } else {
        // Fallback error display
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ef4444;
          color: white;
          padding: 16px;
          border-radius: 8px;
          z-index: 9999;
          max-width: 300px;
        `;
        errorDiv.textContent = errorMsg;
        document.body.appendChild(errorDiv);
      }
    }

    isDevelopment() {
      return window.location.hostname === 'localhost' || 
             window.location.hostname === '127.0.0.1' ||
             window.location.hostname === '';
    }
  }

  // ==========================================================================
  // EXPORT FOR EXTERNAL USE
  // ==========================================================================

  window.ThemeKit = {
    Utils,
    AppState,
    version: '2.0.0',
    build: 'advanced'
  };

  // Initialize the application
  new ThemeKitApp();

})();
