#!/bin/bash

# ShaderKit Landing Page — Quick Installation Script
# This script automates the setup process for the landing page

set -e  # Exit on error

echo "🚀 ShaderKit Landing Page — Installation"
echo "=========================================="
echo ""

# Check for Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ from https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
echo "  Found: $NODE_VERSION"

# Check for pnpm
echo "✓ Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not installed. Installing pnpm globally..."
    npm install -g pnpm
fi
PNPM_VERSION=$(pnpm -v)
echo "  Found: $PNPM_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Type check
echo ""
echo "🔍 Running TypeScript check..."
pnpm check

# Success message
echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Start dev server: pnpm dev"
echo "  2. Open http://localhost:3000 in your browser"
echo "  3. Edit files in client/src/ to customize"
echo ""
echo "📚 For more info, see SETUP.md"
echo ""
