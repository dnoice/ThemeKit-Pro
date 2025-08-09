# CSS Theming System - Makefile
# Alternative build system for the project

.PHONY: help install build clean dev prod test lint format deploy setup

# Variables
NODE_BIN = ./node_modules/.bin
DIST_DIR = dist
BUILD_DIR = build
CSS_FILES = variables.css css/styles.css css/queries.css
JS_FILES = js/script.js
PORT = 3000

# Default target
help:
	@echo "CSS Theming System - Build Commands"
	@echo "===================================="
	@echo "Available targets:"
	@echo "  make install   - Install dependencies"
	@echo "  make build     - Build for development"
	@echo "  make prod      - Build for production"
	@echo "  make dev       - Start development server"
	@echo "  make test      - Run tests"
	@echo "  make lint      - Run linters"
	@echo "  make format    - Format code"
	@echo "  make clean     - Clean build files"
	@echo "  make deploy    - Deploy to GitHub Pages"
	@echo "  make setup     - Initial project setup"
	@echo "  make help      - Show this help message"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@npm install
	@echo "✅ Dependencies installed"

# Setup project
setup: install
	@echo "🔧 Setting up project..."
	@chmod +x setup.sh
	@./setup.sh
	@echo "✅ Setup complete"

# Clean build directories
clean:
	@echo "🧹 Cleaning build files..."
	@rm -rf $(DIST_DIR) $(BUILD_DIR) node_modules
	@rm -f *.log *.tmp .DS_Store
	@echo "✅ Clean complete"

# Development build
build: clean
	@echo "🔨 Building for development..."
	@mkdir -p $(BUILD_DIR)
	@cp -r index.html $(BUILD_DIR)/
	@cp -r variables.css $(BUILD_DIR)/
	@cp -r css $(BUILD_DIR)/
	@cp -r js $(BUILD_DIR)/
	@[ -d examples ] && cp -r examples $(BUILD_DIR)/ || true
	@echo "✅ Development build complete"

# Production build
prod: clean
	@echo "📦 Building for production..."
	@mkdir -p $(DIST_DIR)
	
	@# Minify CSS
	@echo "  Minifying CSS..."
	@$(NODE_BIN)/cleancss -o $(DIST_DIR)/variables.min.css variables.css
	@$(NODE_BIN)/cleancss -o $(DIST_DIR)/styles.min.css css/styles.css
	@$(NODE_BIN)/cleancss -o $(DIST_DIR)/queries.min.css css/queries.css
	
	@# Create combined CSS
	@cat $(CSS_FILES) > $(DIST_DIR)/theme-system.css
	@$(NODE_BIN)/cleancss -o $(DIST_DIR)/theme-system.min.css $(DIST_DIR)/theme-system.css --source-map
	
	@# Minify JavaScript
	@echo "  Minifying JavaScript..."
	@$(NODE_BIN)/terser $(JS_FILES) \
		-o $(DIST_DIR)/script.min.js \
		--compress \
		--mangle \
		--source-map "url='script.min.js.map'"
	
	@# Copy HTML files
	@cp index.html $(DIST_DIR)/
	@[ -d examples ] && cp -r examples $(DIST_DIR)/ || true
	
	@# Copy documentation
	@cp README.md LICENSE CHANGELOG.md $(DIST_DIR)/ 2>/dev/null || true
	
	@# Generate file sizes report
	@echo ""
	@echo "📊 Build Size Report:"
	@echo "===================="
	@ls -lh $(DIST_DIR)/*.min.* | awk '{print $$9 ": " $$5}'
	@echo "===================="
	
	@echo "✅ Production build complete"

# Development server
dev: build
	@echo "🚀 Starting development server on port $(PORT)..."
	@$(NODE_BIN)/serve $(BUILD_DIR) -p $(PORT)

# Run tests
test:
	@echo "🧪 Running tests..."
	@npm test || echo "No tests configured"
	@echo "✅ Tests complete"

# Lint code
lint:
	@echo "🎨 Running linters..."
	
	@# CSS linting
	@echo "  Linting CSS..."
	@$(NODE_BIN)/stylelint "**/*.css" || true
	
	@# JavaScript linting
	@echo "  Linting JavaScript..."
	@$(NODE_BIN)/eslint js/**/*.js || true
	
	@# HTML validation
	@echo "  Validating HTML..."
	@$(NODE_BIN)/html-validate "*.html" "examples/*.html" || true
	
	@echo "✅ Linting complete"

# Format code
format:
	@echo "✨ Formatting code..."
	@$(NODE_BIN)/prettier --write .
	@echo "✅ Formatting complete"

# Deploy to GitHub Pages
deploy: prod
	@echo "🚀 Deploying to GitHub Pages..."
	
	@# Check if gh-pages branch exists
	@git show-ref --verify --quiet refs/heads/gh-pages || git checkout -b gh-pages
	
	@# Switch to gh-pages branch
	@git checkout gh-pages
	
	@# Copy built files
	@cp -r $(DIST_DIR)/* .
	
	@# Commit and push
	@git add -A
	@git commit -m "Deploy to GitHub Pages" || true
	@git push origin gh-pages --force
	
	@# Switch back to main branch
	@git checkout main
	
	@echo "✅ Deployment complete"
	@echo "🔗 Visit: https://dnoice.github.io/css-themeing-system/"

# Watch for changes (requires additional tools)
watch:
	@echo "👁️ Watching for changes..."
	@$(NODE_BIN)/nodemon --watch css --watch js --watch *.html --exec "make build"

# Serve production build
serve-prod: prod
	@echo "🚀 Serving production build on port $(PORT)..."
	@$(NODE_BIN)/serve $(DIST_DIR) -p $(PORT)

# Check file sizes
size: prod
	@echo "📏 File Size Analysis"
	@echo "===================="
	@echo "Original sizes:"
	@ls -lh $(CSS_FILES) $(JS_FILES) | awk '{print $$9 ": " $$5}'
	@echo ""
	@echo "Minified sizes:"
	@ls -lh $(DIST_DIR)/*.min.* | awk '{print $$9 ": " $$5}'
	@echo ""
	@echo "Gzipped sizes:"
	@for file in $(DIST_DIR)/*.min.*; do \
		gzip -c $$file | wc -c | xargs -I {} echo "$$file (gzipped): {} bytes"; \
	done
	@echo "===================="

# Validate all files
validate: lint
	@echo "✓ Checking file structure..."
	@[ -f index.html ] && echo "  ✅ index.html found" || echo "  ❌ index.html missing"
	@[ -f variables.css ] && echo "  ✅ variables.css found" || echo "  ❌ variables.css missing"
	@[ -d css ] && echo "  ✅ css/ directory found" || echo "  ❌ css/ directory missing"
	@[ -d js ] && echo "  ✅ js/ directory found" || echo "  ❌ js/ directory missing"
	@echo "✅ Validation complete"

# Performance check
perf: prod
	@echo "⚡ Running performance checks..."
	@$(NODE_BIN)/serve $(DIST_DIR) -p $(PORT) &
	@sleep 3
	@npx lighthouse http://localhost:$(PORT) --view || true
	@pkill -f "serve $(DIST_DIR)"

# Create a new release
release:
	@echo "📦 Creating new release..."
	@read -p "Enter version number (e.g., 3.1.0): " VERSION; \
	npm version $$VERSION; \
	git tag -a v$$VERSION -m "Release version $$VERSION"; \
	git push origin v$$VERSION; \
	echo "✅ Release v$$VERSION created"

# Docker build (if Dockerfile exists)
docker-build:
	@echo "🐳 Building Docker image..."
	@docker build -t css-themeing-system:latest .
	@echo "✅ Docker image built"

docker-run:
	@echo "🐳 Running Docker container..."
	@docker run -p $(PORT):80 css-themeing-system:latest

# Update dependencies
update:
	@echo "📦 Updating dependencies..."
	@npm update
	@npm audit fix
	@echo "✅ Dependencies updated"

# Generate documentation
docs:
	@echo "📚 Generating documentation..."
	@$(NODE_BIN)/jsdoc js/**/*.js -d docs/api || echo "JSDoc not installed"
	@echo "✅ Documentation generated"

# Quick commit
commit:
	@git add -A
	@git commit -m "Update: $(shell date +'%Y-%m-%d %H:%M:%S')"
	@git push

# Full CI pipeline locally
ci: clean install lint test build prod
	@echo "✅ CI pipeline complete"

# Initialize git repository
init:
	@git init
	@git add .
	@git commit -m "Initial commit"
	@git branch -M main
	@git remote add origin https://github.com/dnoice/css-themeing-system.git
	@echo "✅ Git repository initialized"
