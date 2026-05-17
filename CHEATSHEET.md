# ShaderKit — Quick Reference Cheatsheet

Fast lookup for common tasks and commands.

---

## 📦 Installation & Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm check

# Format code
pnpm format

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## 🎯 Common Customizations

### Change Hero Title
**File**: `client/src/components/Hero.tsx`
```tsx
<h1>Your New Title</h1>
```

### Change Primary Color
**File**: `client/src/index.css`
```css
:root {
  --primary: #your-color;
}
```

### Update Feature Cards
**File**: `client/src/components/Features.tsx`
```tsx
const FEATURES = [
  {
    title: "Your Feature",
    body: "Description",
    icon: YourIcon,
  },
];
```

### Update Pricing
**File**: `client/src/components/Pricing.tsx`
```tsx
const pricingTiers = [
  {
    name: "Your Tier",
    price: "$99",
    features: ["Feature 1", "Feature 2"],
  },
];
```

### Update Testimonials
**File**: `client/src/components/Testimonials.tsx`
```tsx
const testimonials = [
  {
    quote: "Your quote",
    author: "Author Name",
    company: "Company",
  },
];
```

### Change Brand Name
**File**: `client/src/components/Navbar.tsx`
```tsx
<span>Your Brand</span>
```

---

## 🎨 Styling

### Tailwind Classes
```tsx
// Responsive
className="hidden md:flex"      // Hidden on mobile
className="text-sm md:text-lg"  // Responsive text

// Colors
className="bg-orange-500"
className="text-white"
className="border-gray-200"

// Spacing
className="p-4"      // Padding
className="m-2"      // Margin
className="gap-4"    // Gap
```

### CSS Variables
```css
/* Colors */
--primary: #fb923c
--accent: #38bdf8
--background: #0a0a0a
--foreground: #ffffff

/* Spacing */
--radius: 8px

/* Shadows */
box-shadow: 0 0 12px rgba(251,146,60,0.4)
```

---

## 🎬 Animations

### Framer Motion
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Effects
```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.05)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
```

---

## 🔧 Component Patterns

### Create New Component
```tsx
// client/src/components/MyComponent.tsx
import { motion } from "framer-motion";

export default function MyComponent() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Content */}
    </motion.section>
  );
}
```

### Add to Home Page
```tsx
// client/src/pages/Home.tsx
import MyComponent from "@/components/MyComponent";

export default function Home() {
  return (
    <>
      {/* Other sections */}
      <MyComponent />
    </>
  );
}
```

---

## 📱 Responsive Breakpoints

```
Mobile:   < 640px   (sm)
Tablet:   640px+    (md)
Desktop:  1024px+   (lg)
```

---

## 🎯 File Locations

| What | Where |
|------|-------|
| Components | `client/src/components/` |
| Pages | `client/src/pages/` |
| Styles | `client/src/index.css` |
| Icons | `lucide-react` |
| Animations | `framer-motion` |
| HTML | `client/index.html` |

---

## 🚀 Deployment Checklist

- [ ] Update site title in `client/index.html`
- [ ] Update brand name in navbar
- [ ] Update hero content
- [ ] Update features list
- [ ] Update pricing tiers
- [ ] Update testimonials
- [ ] Update footer links
- [ ] Test on mobile
- [ ] Run `pnpm check` (no errors)
- [ ] Run `pnpm build` (no errors)
- [ ] Deploy to Vercel/Netlify

---

## 🐛 Debug Tips

### Check for Errors
```bash
pnpm check
```

### View Console Logs
Open browser DevTools → Console tab

### Debug Shaders
Check browser console for WebGL errors

### Test Performance
- Use Lighthouse in DevTools
- Check Network tab for large files
- Monitor FPS with DevTools

---

## 📚 Quick Links

- [SETUP.md](./SETUP.md) — Installation guide
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) — Detailed customization
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Three.js Docs](https://threejs.org)

---

## 💡 Pro Tips

1. **Use TypeScript** — Catch errors early
2. **Test on mobile** — Use DevTools device emulation
3. **Optimize images** — Use WebP format
4. **Monitor bundle size** — Keep it under 500KB
5. **Use CSS variables** — Easy theme changes
6. **Comment your code** — Help future you
7. **Keep components small** — Easier to maintain
8. **Use semantic HTML** — Better accessibility

---

**Happy coding! 🚀**
