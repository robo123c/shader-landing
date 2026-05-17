# ShaderKit — Customization Guide

This guide walks you through customizing the landing page to match your brand and content.

---

## 🎨 Branding & Colors

### Change Primary Colors

All colors are defined in `client/src/index.css`. The main color variables are:

```css
:root {
  --primary: #your-primary-color;
  --accent: #your-accent-color;
}
```

**Common color values:**
- Orange (default): `#fb923c`
- Blue: `#38bdf8`
- Purple: `#a855f7`
- Green: `#22c55e`
- Red: `#ef4444`

### Change Logo & Brand Name

Edit `client/src/components/Navbar.tsx`:

```tsx
<span style={{ ... }}>Your Brand Name</span>
```

Replace "ShaderKit" with your brand name.

### Change Favicon

Replace `client/public/favicon.ico` with your favicon file.

---

## ✍️ Content Updates

### Hero Section

Edit `client/src/components/Hero.tsx`:

```tsx
<h1>Your Title Here</h1>
<p>Your subtitle and description</p>
```

### Feature Cards

Edit `client/src/components/Features.tsx` — update the `FEATURES` array:

```tsx
const FEATURES = [
  {
    title: "Your Feature 1",
    body: "Feature description",
    icon: YourIcon,
  },
  // ... more features
];
```

### Pricing Tiers

Edit `client/src/components/Pricing.tsx` — update the `pricingTiers` array:

```tsx
const pricingTiers = [
  {
    name: "Starter",
    price: "$29",
    description: "For individuals",
    features: ["Feature 1", "Feature 2"],
  },
  // ... more tiers
];
```

### Testimonials

Edit `client/src/components/Testimonials.tsx` — update the `testimonials` array:

```tsx
const testimonials = [
  {
    quote: "Customer quote here",
    author: "Customer Name",
    company: "Company Name",
    logo: "C",
  },
  // ... more testimonials
];
```

### Newsletter Section

Edit `client/src/components/Newsletter.tsx` to update the heading and description.

---

## 🎬 Shader Customization

### Hero Shader Animation

The hero shader is in `client/src/components/ShaderCanvas.tsx`. To customize:

1. **Change animation speed**: Modify the `time * 0.05` value in the fragment shader
2. **Change colors**: Adjust the color calculations in the shader
3. **Change pattern**: Modify the ripple calculation logic

### Feature Card Shaders

Each feature card has a unique shader in `client/src/components/ShaderDemo.tsx`. To customize:

1. Find the shader type (e.g., `"particle"`, `"composition"`)
2. Modify the corresponding fragment shader code
3. Adjust uniforms like `speed`, `intensity`, `frequency`

---

## 🔗 Navigation Links

Update smooth scroll links in `client/src/components/Navbar.tsx`:

```tsx
{ label: "Features", href: "#features" },
{ label: "Pricing", href: "#pricing" },
{ label: "Testimonials", href: "#testimonials" },
```

Each section has an `id` attribute matching the `href`.

---

## 📱 Responsive Design

The site is mobile-first. Key breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Edit Tailwind classes to adjust responsive behavior:

```tsx
className="hidden md:flex"  // Hidden on mobile, visible on tablet+
className="text-sm md:text-lg"  // Smaller on mobile, larger on desktop
```

---

## 🎭 Animations

### Entrance Animations

Edit Framer Motion animations in component files:

```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Hover Effects

Modify hover styles in component inline styles:

```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.05)";
}}
```

---

## 🔤 Typography

### Change Fonts

Edit `client/index.html` to import different fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet" />
```

Then update `client/src/index.css`:

```css
body {
  font-family: 'YourFont', sans-serif;
}
```

### Change Font Sizes

Edit Tailwind classes or CSS variables in `client/src/index.css`:

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);  /* Responsive sizing */
}
```

---

## 🔘 Buttons & CTAs

### Change Button Text

Edit button text in component files:

```tsx
<button>Your CTA Text</button>
```

### Change Button Colors

Modify the `btn-orange-glow` class in `client/src/index.css`:

```css
.btn-orange-glow {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  /* ... */
}
```

---

## 🔐 Forms & Validation

### Newsletter Form

Edit `client/src/components/Newsletter.tsx`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  // Add your form submission logic
  // e.g., send to your email service
};
```

### Form Validation

Use React Hook Form (already installed):

```tsx
import { useForm } from "react-hook-form";

const { register, handleSubmit } = useForm();
```

---

## 📊 Analytics

To add analytics, update `client/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🎯 SEO Optimization

Edit `client/index.html` meta tags:

```html
<meta name="description" content="Your site description" />
<meta name="keywords" content="keyword1, keyword2" />
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://example.com/image.png" />
```

---

## 🚀 Performance Tips

1. **Optimize images**: Use WebP format and compress
2. **Code splitting**: Use React.lazy() for large components
3. **Caching**: Set appropriate cache headers
4. **Minification**: Vite handles this automatically
5. **Tree shaking**: Remove unused dependencies

---

## 🐛 Common Customizations

### Add a New Section

1. Create a new component in `client/src/components/`
2. Import it in `client/src/pages/Home.tsx`
3. Add it to the JSX

### Add a New Page

1. Create a new file in `client/src/pages/`
2. Add a route in `client/src/App.tsx`
3. Link to it from the navbar

### Add a New Feature Card Shader

1. Add a new case in `ShaderDemo.tsx`
2. Create the fragment shader code
3. Update the Features component to use it

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)
- [TypeScript](https://www.typescriptlang.org)

---

## 💡 Tips

- Always test on mobile devices
- Use browser DevTools to debug
- Keep components small and reusable
- Comment your code for future reference
- Use TypeScript for type safety

---

**Happy customizing! 🎨**
