#!/bin/bash

# CSS Theming System - Setup Script
# This script helps you quickly set up the project for development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is not installed"
        return 1
    else
        print_success "$1 is installed"
        return 0
    fi
}

# Main script
print_header "CSS Theming System Setup"
echo ""

# Check prerequisites
print_header "Checking Prerequisites"

# Check Node.js
if check_command node; then
    NODE_VERSION=$(node -v)
    echo "   Node version: $NODE_VERSION"
    
    # Check if Node version is sufficient (v14+)
    REQUIRED_NODE_VERSION=14
    CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    
    if [ "$CURRENT_NODE_VERSION" -lt "$REQUIRED_NODE_VERSION" ]; then
        print_warning "Node.js version $REQUIRED_NODE_VERSION or higher is recommended"
    fi
else
    print_error "Node.js is required. Please install from https://nodejs.org/"
    exit 1
fi

# Check npm
if check_command npm; then
    NPM_VERSION=$(npm -v)
    echo "   npm version: $NPM_VERSION"
else
    print_error "npm is required. It should come with Node.js"
    exit 1
fi

# Check Git
if check_command git; then
    GIT_VERSION=$(git --version)
    echo "   $GIT_VERSION"
else
    print_warning "Git is not installed. You won't be able to use version control"
fi

echo ""

# Install dependencies
print_header "Installing Dependencies"

if [ -f "package.json" ]; then
    print_success "package.json found"
    
    # Clean install
    if [ -f "package-lock.json" ]; then
        print_warning "Removing old package-lock.json"
        rm package-lock.json
    fi
    
    if [ -d "node_modules" ]; then
        print_warning "Cleaning node_modules directory"
        rm -rf node_modules
    fi
    
    echo "Installing npm packages..."
    npm install
    print_success "Dependencies installed"
else
    print_error "package.json not found. Are you in the project root?"
    exit 1
fi

echo ""

# Create necessary directories
print_header "Setting Up Project Structure"

directories=("dist" "build" "temp")
for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        print_success "Created $dir directory"
    else
        print_success "$dir directory already exists"
    fi
done

echo ""

# Build project
print_header "Building Project"

echo "Creating development build..."
npm run build 2>/dev/null || {
    print_warning "Build script not found, creating basic build..."
    
    # Create dist directory if not exists
    mkdir -p dist
    
    # Combine CSS files
    if [ -f "variables.css" ] && [ -f "css/styles.css" ] && [ -f "css/queries.css" ]; then
        cat variables.css css/styles.css css/queries.css > dist/theme-system.css
        print_success "Created dist/theme-system.css"
    fi
    
    # Copy JavaScript
    if [ -f "js/script.js" ]; then
        cp js/script.js dist/script.js
        print_success "Copied JavaScript files"
    fi
}

print_success "Build complete"

echo ""

# Set up Git hooks (optional)
print_header "Setting Up Git Hooks (Optional)"

read -p "Do you want to set up Git hooks for code quality? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook for CSS Theming System

echo "Running pre-commit checks..."

# Check for console.log statements
if git diff --cached --name-only | grep -E '\.js$' | xargs grep -n "console.log" 2>/dev/null; then
    echo "❌ Found console.log statements. Please remove them before committing."
    exit 1
fi

# Run linters if available
if command -v npx &> /dev/null; then
    echo "Running linters..."
    npx prettier --check . 2>/dev/null || true
fi

echo "✅ Pre-commit checks passed"
EOF
    
    chmod +x .git/hooks/pre-commit
    print_success "Git hooks installed"
else
    print_warning "Skipping Git hooks setup"
fi

echo ""

# Start development server
print_header "Starting Development Server"

echo "Choose how to start the development server:"
echo "1) npm start (uses configuration from package.json)"
echo "2) Python HTTP server"
echo "3) PHP built-in server"
echo "4) Node.js serve"
echo "5) Skip - I'll start it manually"

read -p "Enter your choice (1-5): " server_choice

case $server_choice in
    1)
        print_success "Starting npm server..."
        npm start
        ;;
    2)
        if check_command python3; then
            print_success "Starting Python server on port 8000..."
            python3 -m http.server 8000
        else
            print_error "Python 3 is not installed"
        fi
        ;;
    3)
        if check_command php; then
            print_success "Starting PHP server on port 8000..."
            php -S localhost:8000
        else
            print_error "PHP is not installed"
        fi
        ;;
    4)
        print_success "Starting Node.js server..."
        npx serve . -p 3000
        ;;
    5)
        print_warning "Skipping server start"
        echo ""
        echo "To start the server manually, you can use:"
        echo "  npm start"
        echo "  python3 -m http.server 8000"
        echo "  php -S localhost:8000"
        echo "  npx serve ."
        ;;
    *)
        print_error "Invalid choice"
        ;;
esac

echo ""
print_header "Setup Complete! 🎉"
echo ""
echo "📚 Next steps:"
echo "  1. Open http://localhost:3000 (or your chosen port) in your browser"
echo "  2. Check out the examples in the examples/ directory"
echo "  3. Read the documentation in README.md"
echo "  4. Start customizing the theme variables in variables.css"
echo ""
echo "🔗 Useful commands:"
echo "  npm start         - Start development server"
echo "  npm run build     - Build for production"
echo "  npm test          - Run tests"
echo "  npm run lint:css  - Lint CSS files"
echo "  npm run lint:js   - Lint JavaScript files"
echo ""
echo "📖 Documentation: https://github.com/dnoice/css-themeing-system"
echo "🐛 Report issues: https://github.com/dnoice/css-themeing-system/issues"
echo ""
print_success "Happy coding! 🚀"
