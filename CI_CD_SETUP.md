# GitHub Actions CI/CD Setup Guide

This guide explains how to configure and use the GitHub Actions CI/CD pipeline for automated testing, building, and deployment.

---

## 📋 Overview

The CI/CD pipeline includes:

1. **TypeScript Type Checking** — Ensures type safety
2. **Code Quality Checks** — Linting and formatting
3. **Build Verification** — Builds the project and checks for errors
4. **Lighthouse Performance Audit** — Measures performance, accessibility, SEO
5. **Security Audit** — Checks for vulnerable dependencies
6. **Automated Deployment** — Deploys to Vercel on successful builds

---

## 🚀 Setup Instructions

### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/your-username/shader-landing.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Ensure "Allow all actions and reusable workflows" is selected
4. Click **Save**

### Step 3: Configure Secrets (for Deployment)

To enable automatic deployment to Vercel:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

| Secret Name | Value | How to Get |
|-------------|-------|-----------|
| `VERCEL_TOKEN` | Your Vercel API token | [Vercel Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Your Vercel organization ID | `vercel whoami` (CLI) |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | `.vercel/project.json` file |
| `SLACK_WEBHOOK` | (Optional) Slack webhook URL | [Slack API](https://api.slack.com/messaging/webhooks) |

### Step 4: Verify Workflows

1. Go to **Actions** tab in your repository
2. You should see three workflows:
   - **CI/CD Pipeline** — Runs on every push and PR
   - **Deploy to Production** — Runs on successful CI/CD
   - **Pull Request Checks** — Runs on PR creation

---

## 🔧 Workflow Details

### CI/CD Pipeline (`ci-cd.yml`)

Runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Jobs:**
1. **TypeScript Type Check** — `pnpm check`
2. **Code Quality** — `pnpm format --check`
3. **Build Verification** — `pnpm build`
4. **Lighthouse Audit** — Performance metrics
5. **Security Audit** — Dependency vulnerabilities

**Status Badge:**
Add to your README.md:
```markdown
![CI/CD](https://github.com/your-username/shader-landing/actions/workflows/ci-cd.yml/badge.svg)
```

### Deployment Workflow (`deploy.yml`)

Runs automatically on:
- Push to `main` branch (after CI/CD passes)
- Manual trigger via GitHub Actions

**Actions:**
1. Builds the project
2. Deploys to Vercel
3. Comments on PRs with deployment URL
4. Notifies Slack (optional)

### Pull Request Checks (`pr-checks.yml`)

Runs automatically on:
- PR opened/updated to `main` or `develop`

**Checks:**
1. TypeScript type checking
2. Code formatting
3. Build verification
4. Bundle size analysis
5. Accessibility audit
6. Breaking changes detection

---

## 📊 Lighthouse Configuration

The `lighthouserc.json` file defines performance thresholds:

```json
{
  "categories:performance": ["error", { "minScore": 0.8 }],
  "categories:accessibility": ["error", { "minScore": 0.9 }],
  "categories:best-practices": ["error", { "minScore": 0.9 }],
  "categories:seo": ["error", { "minScore": 0.9 }]
}
```

**Adjust thresholds:**
- Edit `lighthouserc.json`
- Change `minScore` values (0.0 to 1.0)
- Commit and push to trigger new audit

---

## 🔐 Security

### Secrets Management

- **Never commit secrets** — Use GitHub Secrets instead
- **Rotate tokens regularly** — Update Vercel tokens every 6 months
- **Limit scope** — Use minimal permissions for tokens
- **Monitor usage** — Check GitHub Actions logs regularly

### Audit Logs

View all workflow runs:
1. Go to **Actions** tab
2. Click on a workflow
3. View logs for each job

---

## 🐛 Troubleshooting

### Workflow Not Running

**Problem:** Workflow doesn't trigger on push

**Solution:**
1. Check branch name matches workflow trigger (main/develop)
2. Verify `.github/workflows/` files exist
3. Check repository settings → Actions is enabled
4. Commit and push again

### TypeScript Errors in CI

**Problem:** `pnpm check` fails

**Solution:**
```bash
# Run locally first
pnpm check

# Fix errors
pnpm format

# Commit and push
git add .
git commit -m "fix: resolve TypeScript errors"
git push
```

### Build Fails in CI

**Problem:** `pnpm build` fails

**Solution:**
```bash
# Clear cache and rebuild locally
rm -rf node_modules dist
pnpm install
pnpm build

# If successful, push
git push
```

### Lighthouse Score Low

**Problem:** Lighthouse audit fails

**Solution:**
1. Run locally: `npm install -g lighthouse-cli`
2. Check performance issues
3. Optimize images, code splitting, caching
4. Update `lighthouserc.json` thresholds if needed

### Deployment Fails

**Problem:** Vercel deployment fails

**Solution:**
1. Check `VERCEL_TOKEN` is valid
2. Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`
3. Check Vercel project settings
4. View Vercel deployment logs

---

## 📈 Monitoring

### GitHub Actions Dashboard

View all workflow runs:
1. Go to **Actions** tab
2. Click on workflow name
3. View run history and logs

### Performance Metrics

View Lighthouse reports:
1. Go to **Actions** → **CI/CD Pipeline**
2. Click on a successful run
3. Download Lighthouse report artifact

### Slack Notifications (Optional)

To receive Slack notifications:
1. Create Slack webhook: [Slack API](https://api.slack.com/messaging/webhooks)
2. Add `SLACK_WEBHOOK` secret to GitHub
3. Workflow will notify on success/failure

---

## 🎯 Best Practices

### Commit Messages

Use conventional commits for better tracking:
```
feat: add new feature
fix: resolve bug
docs: update documentation
test: add tests
perf: improve performance
```

### Branch Strategy

```
main          → Production-ready code
develop       → Development branch
feature/*     → Feature branches
bugfix/*      → Bug fix branches
```

### PR Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push: `git push origin feature/my-feature`
4. Open PR on GitHub
5. Wait for CI/CD checks to pass
6. Request review
7. Merge after approval

---

## 🚀 Advanced Configuration

### Custom Build Steps

Edit `.github/workflows/ci-cd.yml` to add custom steps:

```yaml
- name: Custom Step
  run: |
    echo "Running custom command"
    npm run custom-script
```

### Environment Variables

Add environment variables in workflow:

```yaml
env:
  CUSTOM_VAR: value
```

### Matrix Builds

Test across multiple Node versions:

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
```

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/git/vercel-for-github)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [pnpm Documentation](https://pnpm.io)

---

## 🆘 Support

For issues:
1. Check GitHub Actions logs
2. Review workflow files for syntax errors
3. Test commands locally first
4. Check GitHub documentation

---

**Happy automating! 🚀**
