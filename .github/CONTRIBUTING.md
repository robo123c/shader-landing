# Contributing to ShaderKit

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the ShaderKit project.

---

## 🎯 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Respect others' opinions and ideas
- Report violations to maintainers

---

## 🚀 Getting Started

### 1. Fork the Repository

```bash
# Click "Fork" on GitHub
git clone https://github.com/your-username/shader-landing.git
cd shader-landing
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Set Up Development Environment

```bash
pnpm install
pnpm dev
```

### 4. Make Your Changes

- Write clean, readable code
- Follow TypeScript best practices
- Add comments for complex logic
- Test your changes locally

### 5. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update documentation"
git commit -m "test: add tests"
git commit -m "perf: improve performance"
```

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

---

## 📋 PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style
- [ ] TypeScript check passes: `pnpm check`
- [ ] Code is formatted: `pnpm format`
- [ ] Build succeeds: `pnpm build`
- [ ] Changes are tested locally
- [ ] PR description explains changes
- [ ] Commits use conventional format

---

## 🎨 Code Style

### TypeScript

```tsx
// Use const by default
const myVar = "value";

// Use interfaces for types
interface MyInterface {
  name: string;
  age: number;
}

// Use arrow functions
const myFunction = () => {
  // ...
};
```

### React Components

```tsx
// Use functional components
export default function MyComponent() {
  const [state, setState] = useState(null);

  return (
    <div>
      {/* JSX content */}
    </div>
  );
}
```

### Tailwind CSS

```tsx
// Use utility classes
className="flex items-center justify-between gap-4"

// Use responsive prefixes
className="text-sm md:text-lg lg:text-xl"

// Avoid custom CSS when possible
```

---

## 🧪 Testing

### Local Testing

```bash
# Type check
pnpm check

# Format check
pnpm format --check

# Build
pnpm build

# Dev server
pnpm dev
```

### Browser Testing

- Test on Chrome, Firefox, Safari
- Test on mobile devices
- Check responsive design
- Verify shader rendering

---

## 📝 Documentation

### Update Docs When:

- Adding new features
- Changing existing behavior
- Adding new components
- Updating configuration

### Documentation Files:

- `README_PROJECT.md` — Project overview
- `SETUP.md` — Installation guide
- `CUSTOMIZATION.md` — Customization guide
- `CHEATSHEET.md` — Quick reference
- `CI_CD_SETUP.md` — CI/CD guide

---

## 🐛 Reporting Bugs

### Create an Issue with:

1. **Title** — Clear, concise description
2. **Description** — What happened, what should happen
3. **Steps to Reproduce** — How to trigger the bug
4. **Environment** — OS, browser, Node version
5. **Screenshots** — If applicable

### Example:

```markdown
## Bug: Shader not rendering in Firefox

### Description
The hero shader animation doesn't render in Firefox.

### Steps to Reproduce
1. Open the site in Firefox
2. Observe the hero section
3. No shader animation appears

### Environment
- OS: macOS 13
- Browser: Firefox 120
- Node: 18.17.0

### Expected
Shader animation should render in all modern browsers.
```

---

## 🚀 Feature Requests

### Suggest Features with:

1. **Title** — Clear feature name
2. **Description** — What and why
3. **Use Case** — How it helps users
4. **Alternatives** — Other solutions considered

### Example:

```markdown
## Feature: Dark mode toggle

### Description
Add a dark/light mode toggle in the navbar.

### Use Case
Users prefer different themes based on lighting conditions.

### Alternatives
- Always use dark mode (current)
- System preference detection
```

---

## 📚 Project Structure

```
client/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── lib/           # Utilities
│   ├── App.tsx        # Main app
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
└── index.html         # HTML template
```

---

## 🔄 Review Process

1. **Automated Checks** — CI/CD pipeline runs
2. **Code Review** — Maintainers review code
3. **Feedback** — Address review comments
4. **Approval** — PR approved by maintainers
5. **Merge** — PR merged to main branch

---

## 📦 Dependency Management

### Adding Dependencies

```bash
# Add package
pnpm add package-name

# Add dev dependency
pnpm add -D package-name

# Update lock file
git add pnpm-lock.yaml
```

### Guidelines

- Only add necessary dependencies
- Prefer smaller packages
- Check for security issues
- Update regularly

---

## 🚢 Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release with notes

---

## 💡 Tips for Success

1. **Start small** — Begin with small contributions
2. **Read existing code** — Understand patterns
3. **Ask questions** — Don't hesitate to ask
4. **Test thoroughly** — Test locally before PR
5. **Be patient** — Reviews take time
6. **Be respectful** — Maintain positive tone

---

## 🙏 Thank You

Thank you for contributing to ShaderKit! Your efforts help make this project better for everyone.

---

**Happy contributing! 🎉**
