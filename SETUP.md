# ShaderKit Landing Page — Setup Guide

A production-grade React landing page with Three.js shader animations, glassmorphism UI, and Framer Motion entrance animations. Built with React 19, TypeScript, Tailwind CSS 4, and Three.js.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+) — [Download](https://nodejs.org/)
- **pnpm** (v10+) — [Install guide](https://pnpm.io/installation)
- **Git** — [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version    # Should be v18.0.0 or higher
pnpm --version    # Should be v10.0.0 or higher
git --version     # Should be v2.0.0 or higher
```

---

## 🚀 Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shader-landing
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs all required packages including React, Three.js, Framer Motion, Tailwind CSS, and TypeScript.

### 3. Start Development Server

```bash
pnpm dev
```

The dev server will start at `http://localhost:3000`. Open it in your browser to see the landing page.

### 4. Make Changes

Edit files in `client/src/` and the dev server will hot-reload automatically.

---

## 📁 Project Structure

```
shader-landing/
├── client/
│   ├── public/              # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ShaderCanvas.tsx    # Three.js shader hero
│   │   │   ├── ShaderDemo.tsx      # Feature card shaders
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   ├── ShaderPlayground.tsx
│   │   │   ├── CodePreview.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── CtaSection.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/        # React contexts
│   │   │   └── ThemeContext.tsx
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles & design tokens
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── README.md                # Project documentation
```

---

## 🛠️ Available Commands

### Development

```bash
# Start dev server with hot reload
pnpm dev

# Type check (no emit)
pnpm check

# Format code with Prettier
pnpm format
```

### Production

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Start production server (after build)
pnpm start
```

---

## 🎨 Customization Guide

### Change Site Title & Branding

Edit `client/index.html`:
```html
<title>Your Site Title</title>
```

Edit `client/src/components/Navbar.tsx` to change the logo and brand name:
```tsx
<span style={{ ... }}>Your Brand Name</span>
```

### Update Colors

All colors are defined in `client/src/index.css` using CSS variables. To change the primary orange:

```css
:root {
  --primary: #your-color;
}

.dark {
  --primary: #your-color;
}
```

### Modify Hero Shader

The hero shader is in `client/src/components/ShaderCanvas.tsx`. The fragment shader controls the ripple effect. Edit the `fragmentShader` variable to customize the animation.

### Update Feature Cards

Edit `client/src/components/Features.tsx` to modify the feature list, titles, and descriptions.

### Change Pricing Tiers

Edit `client/src/components/Pricing.tsx` to update pricing, features, and tier names.

### Update Testimonials

Edit `client/src/components/Testimonials.tsx` to add/remove customer quotes and logos.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19.2.1 | UI framework |
| TypeScript | 5.6.3 | Type safety |
| Three.js | Latest | WebGL shader rendering |
| Framer Motion | 12.23.22 | Entrance animations |
| Tailwind CSS | 4.1.14 | Utility-first styling |
| Lucide React | 0.453.0 | Icon library |
| Sonner | 2.0.7 | Toast notifications |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel will auto-detect the build settings
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build command: `pnpm build`
6. Set publish directory: `dist`
7. Click "Deploy"

### Deploy to Self-Hosted Server

```bash
# Build the project
pnpm build

# Upload the dist/ folder to your server
# Serve with a static file server (nginx, Apache, etc.)
```

---

## 🐛 Troubleshooting

### Dev Server Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### TypeScript Errors

```bash
# Run type check to see errors
pnpm check

# Fix common issues
pnpm format
```

### Shader Not Rendering

1. Check browser console for WebGL errors
2. Ensure Three.js is installed: `pnpm list three`
3. Verify GPU support in your browser

### Build Fails

```bash
# Clean and rebuild
rm -rf dist
pnpm build
```

---

## 📚 Learning Resources

- **React Documentation**: [react.dev](https://react.dev)
- **Three.js Documentation**: [threejs.org](https://threejs.org)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)

---

## 📝 Environment Variables

Create a `.env.local` file in the root directory (optional):

```env
# Example environment variables
VITE_API_URL=https://api.example.com
VITE_APP_NAME=ShaderKit
```

Access in your code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🤝 Contributing

To contribute improvements:

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — Feel free to use this project for personal and commercial purposes.

---

## 🆘 Support

For issues or questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Learning Resources](#-learning-resources)
3. Check existing GitHub issues
4. Create a new GitHub issue with details

---

## 🎯 Next Steps

After setup, consider:

1. **Customize branding** — Update colors, fonts, and logos
2. **Add your content** — Update hero text, features, and pricing
3. **Connect analytics** — Add Google Analytics or Plausible
4. **Set up domain** — Point your domain to the deployed site
5. **Enable SSL** — Ensure HTTPS is enabled
6. **Optimize images** — Compress and optimize all images
7. **Test performance** — Use Lighthouse to audit performance

---

**Happy building! 🚀**
