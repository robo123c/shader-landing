#!/bin/bash

#############################################################################
# ShaderKit Landing Page — One-Command Setup Script
# 
# This script automates the complete setup process including:
# - Dependency installation
# - Email service configuration (Mailchimp/SendGrid)
# - Analytics setup (Plausible/Fathom)
# - Storybook initialization
# - Environment configuration
# - Development server startup
#
# Usage: ./setup.sh
#############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="ShaderKit"
NODE_MIN_VERSION=18
PNPM_MIN_VERSION=10

#############################################################################
# Utility Functions
#############################################################################

print_header() {
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

#############################################################################
# Prerequisite Checks
#############################################################################

check_prerequisites() {
  print_header "Checking Prerequisites"

  # Check Node.js
  if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    echo "Please install Node.js v${NODE_MIN_VERSION}+ from https://nodejs.org/"
    exit 1
  fi

  NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -lt "$NODE_MIN_VERSION" ]; then
    print_error "Node.js version is too old (v${NODE_VERSION}, need v${NODE_MIN_VERSION}+)"
    exit 1
  fi
  print_success "Node.js $(node -v)"

  # Check pnpm
  if ! command -v pnpm &> /dev/null; then
    print_warning "pnpm is not installed, installing globally..."
    npm install -g pnpm
  fi
  print_success "pnpm $(pnpm -v)"

  # Check Git
  if ! command -v git &> /dev/null; then
    print_error "Git is not installed"
    exit 1
  fi
  print_success "Git $(git --version | awk '{print $3}')"
}

#############################################################################
# Install Dependencies
#############################################################################

install_dependencies() {
  print_header "Installing Dependencies"
  pnpm install --frozen-lockfile
  print_success "Dependencies installed"
}

#############################################################################
# Configure Email Service
#############################################################################

configure_email_service() {
  print_header "Email Service Configuration"

  echo -e "${BLUE}Choose your email service provider:${NC}"
  echo "1) Mailchimp (recommended)"
  echo "2) SendGrid"
  echo "3) Skip for now"
  read -p "Enter choice (1-3): " email_choice

  case $email_choice in
    1)
      print_info "Mailchimp Configuration"
      read -p "Enter your Mailchimp API Key: " mailchimp_api_key
      read -p "Enter your Mailchimp List ID: " mailchimp_list_id
      
      # Save to .env.local
      {
        echo "VITE_EMAIL_PROVIDER=mailchimp"
        echo "VITE_EMAIL_API_KEY=$mailchimp_api_key"
        echo "VITE_EMAIL_LIST_ID=$mailchimp_list_id"
      } >> .env.local
      
      print_success "Mailchimp configured"
      ;;
    2)
      print_info "SendGrid Configuration"
      read -p "Enter your SendGrid API Key: " sendgrid_api_key
      
      {
        echo "VITE_EMAIL_PROVIDER=sendgrid"
        echo "VITE_EMAIL_API_KEY=$sendgrid_api_key"
      } >> .env.local
      
      print_success "SendGrid configured"
      ;;
    3)
      print_info "Email service skipped"
      ;;
    *)
      print_error "Invalid choice"
      ;;
  esac
}

#############################################################################
# Configure Analytics
#############################################################################

configure_analytics() {
  print_header "Analytics Configuration"

  echo -e "${BLUE}Choose your analytics provider:${NC}"
  echo "1) Plausible (privacy-focused)"
  echo "2) Fathom (lightweight)"
  echo "3) Skip for now"
  read -p "Enter choice (1-3): " analytics_choice

  case $analytics_choice in
    1)
      print_info "Plausible Configuration"
      read -p "Enter your domain (e.g., example.com): " plausible_domain
      
      {
        echo "VITE_ANALYTICS_PROVIDER=plausible"
        echo "VITE_ANALYTICS_DOMAIN=$plausible_domain"
      } >> .env.local
      
      print_success "Plausible configured"
      ;;
    2)
      print_info "Fathom Configuration"
      read -p "Enter your Fathom Site ID: " fathom_site_id
      
      {
        echo "VITE_ANALYTICS_PROVIDER=fathom"
        echo "VITE_ANALYTICS_SITE_ID=$fathom_site_id"
      } >> .env.local
      
      print_success "Fathom configured"
      ;;
    3)
      print_info "Analytics skipped"
      ;;
    *)
      print_error "Invalid choice"
      ;;
  esac
}

#############################################################################
# Build and Test
#############################################################################

build_and_test() {
  print_header "Building and Testing"

  print_info "Running TypeScript check..."
  pnpm check
  print_success "TypeScript check passed"

  print_info "Building project..."
  pnpm build
  print_success "Build successful"
}

#############################################################################
# Storybook Setup
#############################################################################

setup_storybook() {
  print_header "Storybook Setup"
  
  print_info "Storybook is configured and ready to use"
  echo -e "${BLUE}To start Storybook:${NC}"
  echo "  pnpm storybook"
  echo ""
}

#############################################################################
# Git Setup (Optional)
#############################################################################

setup_git() {
  print_header "Git Setup (Optional)"

  if [ -d ".git" ]; then
    print_info "Git repository already initialized"
    return
  fi

  read -p "Initialize Git repository? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git init
    git add .
    git commit -m "Initial commit: ShaderKit landing page"
    print_success "Git repository initialized"
  fi
}

#############################################################################
# Final Setup
#############################################################################

final_setup() {
  print_header "Setup Complete! 🎉"

  echo ""
  echo -e "${GREEN}✓ All systems ready${NC}"
  echo ""
  echo -e "${BLUE}Next steps:${NC}"
  echo ""
  echo "1. Start development server:"
  echo -e "   ${YELLOW}pnpm dev${NC}"
  echo ""
  echo "2. Open in browser:"
  echo -e "   ${YELLOW}http://localhost:3000${NC}"
  echo ""
  echo "3. View component library:"
  echo -e "   ${YELLOW}pnpm storybook${NC}"
  echo ""
  echo "4. Build for production:"
  echo -e "   ${YELLOW}pnpm build${NC}"
  echo ""
  echo -e "${BLUE}Documentation:${NC}"
  echo "  - Setup Guide: ./SETUP.md"
  echo "  - Customization: ./CUSTOMIZATION.md"
  echo "  - CI/CD Setup: ./CI_CD_SETUP.md"
  echo "  - Quick Reference: ./CHEATSHEET.md"
  echo ""
  echo -e "${BLUE}Need help?${NC}"
  echo "  - Check SETUP.md for detailed instructions"
  echo "  - Review CUSTOMIZATION.md for customization options"
  echo "  - See CI_CD_SETUP.md for deployment guides"
  echo ""
}

#############################################################################
# Main Execution
#############################################################################

main() {
  clear
  
  print_header "$PROJECT_NAME — One-Command Setup"
  echo ""
  echo "This script will set up your landing page with:"
  echo "  • Dependencies installation"
  echo "  • Email service integration (Mailchimp/SendGrid)"
  echo "  • Analytics setup (Plausible/Fathom)"
  echo "  • Storybook component library"
  echo "  • Build verification"
  echo ""
  read -p "Continue? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "Setup cancelled"
    exit 0
  fi

  # Create .env.local if it doesn't exist
  if [ ! -f ".env.local" ]; then
    touch .env.local
    print_success "Created .env.local"
  fi

  # Run setup steps
  check_prerequisites
  install_dependencies
  configure_email_service
  configure_analytics
  build_and_test
  setup_storybook
  setup_git
  final_setup
}

# Run main function
main
