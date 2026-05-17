# ShaderKit — Integrations Guide

This guide explains how to set up email services, analytics, and Storybook component documentation.

---

## 🚀 Quick Setup

The easiest way to set up all integrations is with the one-command setup script:

```bash
./setup.sh
```

This interactive script will guide you through configuring email services, analytics, and verifying the build.

---

## 📧 Email Service Integration

### Mailchimp Setup

**Step 1: Get API Key**
1. Go to [Mailchimp](https://mailchimp.com)
2. Sign in to your account
3. Navigate to **Account** → **Extras** → **API keys**
4. Create a new API key or copy an existing one

**Step 2: Get List ID**
1. Go to **Audience** → **All contacts**
2. Click **Manage audience** → **Settings**
3. Find your **Audience ID** (this is your List ID)

**Step 3: Configure in Project**

Add to `.env.local`:
```env
VITE_EMAIL_PROVIDER=mailchimp
VITE_EMAIL_API_KEY=your-api-key-here
VITE_EMAIL_LIST_ID=your-list-id-here
```

**Step 4: Update Newsletter Component**

Edit `client/src/components/Newsletter.tsx`:
```tsx
import { subscribeToNewsletter } from '@/lib/emailService';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const config = {
    provider: 'mailchimp' as const,
    apiKey: import.meta.env.VITE_EMAIL_API_KEY,
    listId: import.meta.env.VITE_EMAIL_LIST_ID,
  };
  
  const result = await subscribeToNewsletter(email, config);
  
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.message);
  }
};
```

### SendGrid Setup

**Step 1: Get API Key**
1. Go to [SendGrid](https://sendgrid.com)
2. Sign in to your account
3. Navigate to **Settings** → **API Keys**
4. Create a new API key with Mail Send permissions

**Step 2: Configure in Project**

Add to `.env.local`:
```env
VITE_EMAIL_PROVIDER=sendgrid
VITE_EMAIL_API_KEY=your-sendgrid-api-key
```

**Step 3: Update Newsletter Component**

```tsx
const config = {
  provider: 'sendgrid' as const,
  apiKey: import.meta.env.VITE_EMAIL_API_KEY,
};

const result = await subscribeToNewsletter(email, config);
```

---

## 📊 Analytics Integration

### Plausible Setup

**Step 1: Create Account**
1. Go to [Plausible](https://plausible.io)
2. Sign up for an account
3. Add your domain

**Step 2: Get Domain**
1. In Plausible dashboard, find your domain name
2. It should match your website domain (e.g., `example.com`)

**Step 3: Configure in Project**

Add to `.env.local`:
```env
VITE_ANALYTICS_PROVIDER=plausible
VITE_ANALYTICS_DOMAIN=your-domain.com
```

**Step 4: Initialize Analytics**

Edit `client/src/main.tsx`:
```tsx
import { initializeAnalytics } from '@/lib/analyticsService';

initializeAnalytics({
  provider: 'plausible',
  domain: import.meta.env.VITE_ANALYTICS_DOMAIN,
  enabled: true,
});
```

### Fathom Setup

**Step 1: Create Account**
1. Go to [Fathom](https://usefathom.com)
2. Sign up for an account
3. Create a new site

**Step 2: Get Site ID**
1. In Fathom dashboard, find your Site ID
2. It's displayed in the tracking code

**Step 3: Configure in Project**

Add to `.env.local`:
```env
VITE_ANALYTICS_PROVIDER=fathom
VITE_ANALYTICS_SITE_ID=your-site-id
```

**Step 4: Initialize Analytics**

```tsx
import { initializeAnalytics } from '@/lib/analyticsService';

initializeAnalytics({
  provider: 'fathom',
  siteId: import.meta.env.VITE_ANALYTICS_SITE_ID,
  enabled: true,
});
```

### Track Custom Events

Use the analytics service to track custom events:

```tsx
import { trackEvent, trackCTAClick, trackScrollDepth } from '@/lib/analyticsService';

// Track CTA click
<button onClick={() => trackCTAClick('get-started')}>
  Get Started
</button>

// Track custom event
trackEvent('feature_viewed', { feature: 'shader-playground' });

// Track scroll depth
trackScrollDepth();
```

---

## 📚 Storybook Component Documentation

### Start Storybook

```bash
pnpm storybook
```

This opens Storybook at `http://localhost:6006`

### Create Component Stories

Create a `.stories.tsx` file for each component:

```tsx
// client/src/components/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import MyComponent from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
```

### View Documentation

1. Start Storybook: `pnpm storybook`
2. Browse components in the sidebar
3. View interactive examples
4. Adjust props using controls panel

### Build Storybook for Deployment

```bash
pnpm storybook:build
```

This creates a static Storybook site in `storybook-static/`

---

## 🔐 Environment Variables

Create `.env.local` in the project root:

```env
# Email Service
VITE_EMAIL_PROVIDER=mailchimp
VITE_EMAIL_API_KEY=your-api-key
VITE_EMAIL_LIST_ID=your-list-id

# Analytics
VITE_ANALYTICS_PROVIDER=plausible
VITE_ANALYTICS_DOMAIN=your-domain.com

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NEWSLETTER=true
```

**Important:** Never commit `.env.local` to Git. Add it to `.gitignore`.

---

## 🧪 Testing Integrations

### Test Email Service

```tsx
import { subscribeToNewsletter } from '@/lib/emailService';

const testEmail = async () => {
  const result = await subscribeToNewsletter('test@example.com', {
    provider: 'mailchimp',
    apiKey: process.env.VITE_EMAIL_API_KEY,
    listId: process.env.VITE_EMAIL_LIST_ID,
  });
  
  console.log(result);
};
```

### Test Analytics

Open browser console and run:

```javascript
// Plausible
window.plausible('test_event', { props: { test: true } });

// Fathom
window.fathom.trackGoal('test-goal', 0);
```

### Test Storybook

1. Start Storybook: `pnpm storybook`
2. Navigate to a component
3. Interact with controls
4. Verify component renders correctly

---

## 🐛 Troubleshooting

### Email Service Not Working

**Problem:** Newsletter signup fails

**Solution:**
1. Verify API key is correct
2. Check list ID is valid
3. Ensure email format is valid
4. Check browser console for errors
5. Verify CORS is not blocking requests

### Analytics Not Tracking

**Problem:** Events not appearing in dashboard

**Solution:**
1. Verify domain/site ID is correct
2. Check analytics script is loaded (DevTools → Network)
3. Verify `enabled: true` in config
4. Check browser console for errors
5. Allow 24 hours for data to appear

### Storybook Not Loading

**Problem:** Storybook won't start

**Solution:**
```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall dependencies
pnpm install

# Start Storybook
pnpm storybook
```

---

## 📚 Resources

- [Mailchimp API Documentation](https://mailchimp.com/developer/marketing/api/)
- [SendGrid API Documentation](https://docs.sendgrid.com/api-reference/)
- [Plausible Documentation](https://plausible.io/docs)
- [Fathom Documentation](https://usefathom.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)

---

## 🚀 Next Steps

1. **Set up email service** — Choose Mailchimp or SendGrid
2. **Configure analytics** — Choose Plausible or Fathom
3. **Create component stories** — Document your components
4. **Deploy Storybook** — Share with your team
5. **Monitor metrics** — Track user engagement

---

**Happy integrating! 🎉**
