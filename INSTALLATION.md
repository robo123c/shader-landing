# ShaderKit Installation Guide

Complete step-by-step instructions to get ShaderKit running on your machine.

---

## 📋 Prerequisites

Before you start, make sure you have these installed on your computer:

### 1. **Node.js** (v18 or higher)

**Check if installed:**
```bash
node --version
```

**If not installed:**
- Go to [nodejs.org](https://nodejs.org)
- Download the LTS version (recommended)
- Follow the installer
- Verify: `node --version` should show v18+

### 2. **Git**

**Check if installed:**
```bash
git --version
```

**If not installed:**
- Go to [git-scm.com](https://git-scm.com)
- Download and install
- Verify: `git --version`

### 3. **pnpm** (Package Manager)

**Check if installed:**
```bash
pnpm --version
```

**If not installed:**
```bash
npm install -g pnpm
```

**Verify:**
```bash
pnpm --version
```

---

## 🚀 Installation Methods

### **Method 1: One-Command Setup (Recommended)**

The easiest way to get started. This script handles everything automatically.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/robo123c/shader-landing.git
cd shader-landing
```

#### Step 2: Run the Setup Script

```bash
./setup.sh
```

#### Step 3: Follow the Prompts

The script will ask you to:
1. **Choose email service** (Mailchimp/SendGrid or skip)
2. **Choose analytics** (Plausible/Fathom or skip)
3. **Initialize Git** (optional)

Just answer the questions and let the script do the work!

#### Step 4: Start Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### **Method 2: Manual Setup**

If you prefer to set up everything manually:

#### Step 1: Clone the Repository

```bash
git clone https://github.com/robo123c/shader-landing.git
cd shader-landing
```

#### Step 2: Install Dependencies

```bash
pnpm install
```

This downloads all required packages (~500MB, takes 2-5 minutes).

#### Step 3: Start Development Server

```bash
pnpm dev
```

#### Step 4: Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

You should see the landing page with the animated shader hero!

---

## 🔧 Configuration (Optional)

### Email Service Setup

To enable newsletter signups, configure an email service:

#### **Mailchimp** (Recommended)

1. Go to [mailchimp.com](https://mailchimp.com)
2. Sign up for a free account
3. Get your API key: **Account** → **Extras** → **API keys**
4. Get your List ID: **Audience** → **Settings** → **Audience ID**
5. Create `.env.local` file in project root:

```env
VITE_EMAIL_PROVIDER=mailchimp
VITE_EMAIL_API_KEY=your-api-key-here
VITE_EMAIL_LIST_ID=your-list-id-here
```

#### **SendGrid**

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for a free account
3. Get your API key: **Settings** → **API Keys**
4. Create `.env.local` file:

```env
VITE_EMAIL_PROVIDER=sendgrid
VITE_EMAIL_API_KEY=your-sendgrid-api-key
```

### Analytics Setup

To track user engagement, configure analytics:

#### **Plausible** (Privacy-Focused)

1. Go to [plausible.io](https://plausible.io)
2. Sign up for a free account
3. Add your domain
4. Create `.env.local` file:

```env
VITE_ANALYTICS_PROVIDER=plausible
VITE_ANALYTICS_DOMAIN=your-domain.com
```

#### **Fathom** (Lightweight)

1. Go to [usefathom.com](https://usefathom.com)
2. Sign up for a free account
3. Create a new site and get your Site ID
4. Create `.env.local` file:

```env
VITE_ANALYTICS_PROVIDER=fathom
VITE_ANALYTICS_SITE_ID=your-site-id
```

---

## 📦 Available Commands

Once installed, you can use these commands:

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server (http://localhost:3000) |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm start` | Start production server |
| `pnpm check` | Check TypeScript errors |
| `pnpm format` | Format code with Prettier |
| `pnpm storybook` | Start Storybook component library (http://localhost:6006) |
| `pnpm storybook:build` | Build Storybook for deployment |

---

## ✅ Verify Installation

After installation, verify everything works:

### 1. **Check Dev Server**

```bash
pnpm dev
```

You should see:
```
VITE v7.1.9 ready in 496 ms
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

### 2. **Open in Browser**

Visit [http://localhost:3000](http://localhost:3000)

You should see:
- ✅ Animated shader hero with ripple waves
- ✅ Navigation bar with "Get Started" button
- ✅ Feature cards with shader animations
- ✅ Pricing section
- ✅ Testimonials carousel

### 3. **Check TypeScript**

```bash
pnpm check
```

Should output: `No errors`

---

## 🐛 Troubleshooting

### **Problem: "pnpm: command not found"**

**Solution:**
```bash
npm install -g pnpm
pnpm --version
```

### **Problem: "Port 3000 already in use"**

**Solution:**
```bash
# Use a different port
pnpm dev -- --port 3001
```

Then visit [http://localhost:3001](http://localhost:3001)

### **Problem: "Module not found" errors**

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### **Problem: Shader not rendering**

**Solution:**
1. Check browser console for WebGL errors (F12)
2. Verify GPU support: [webglreport.com](https://webglreport.com)
3. Try a different browser (Chrome, Firefox, Safari)
4. Update graphics drivers

### **Problem: TypeScript errors**

**Solution:**
```bash
pnpm check
pnpm format
```

### **Problem: Build fails**

**Solution:**
```bash
# Clear build cache
rm -rf dist .vite
pnpm build
```

---

## 🎯 Next Steps

After successful installation:

1. **Customize Content** — Edit `client/src/components/` to change text, colors, and content
2. **Add Email Service** — Follow the configuration steps above
3. **Set Up Analytics** — Track user engagement with Plausible or Fathom
4. **Deploy** — Push to GitHub and deploy on Vercel, Netlify, or your own server

See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed customization guides.

---

## 📚 Documentation

- **[README.md](./README.md)** — Project overview and features
- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** — How to customize everything
- **[INTEGRATIONS.md](./INTEGRATIONS.md)** — Email, analytics, and Storybook setup
- **[SETUP.md](./SETUP.md)** — Advanced setup options

---

## 💬 Need Help?

If you get stuck:

1. **Check the troubleshooting section above**
2. **Review the documentation files**
3. **Check browser console** (F12 → Console tab)
4. **Open a GitHub issue** with error details

---

## ✨ You're All Set!

Congratulations! ShaderKit is now running on your machine. 🎉

**Next:** Open [http://localhost:3000](http://localhost:3000) and start customizing!

---

**Happy coding! 🚀**
