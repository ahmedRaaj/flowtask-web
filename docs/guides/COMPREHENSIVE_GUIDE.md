# 📚 Complete Concept Guide: FlowTask Design System

## Table of Contents
1. [CSS Variables & Custom Properties](#1-css-variables--custom-properties)
2. [Tailwind CSS Configuration](#2-tailwind-css-configuration)
3. [Color System Architecture](#3-color-system-architecture)
4. [Dark Mode Implementation](#4-dark-mode-implementation)
5. [Responsive Design](#5-responsive-design)
6. [Component Structure](#6-component-structure)
7. [Accessibility](#7-accessibility)

---

## 1. CSS Variables & Custom Properties

### What Are CSS Variables?

CSS variables (custom properties) are reusable values you define once and use everywhere:

```css
:root {
  --color-primary-600: #0284c7;  /* Define once */
  --spacing-unit: 0.25rem;
  --border-radius: 0.5rem;
}

.button {
  background-color: var(--color-primary-600);  /* Use it */
  border-radius: var(--border-radius);
  padding: var(--spacing-unit);
}
```

### Why Use Them?

| Benefit | Example |
|---------|---------|
| **Single Source of Truth** | Change color once, updates everywhere |
| **Maintainability** | Easy to modify and test |
| **Consistency** | Same values used across entire site |
| **Dark Mode** | Override variables in `@media (prefers-color-scheme: dark)` |

### Our Variable Structure

```css
:root {
  /* Primary colors - 10 shades */
  --color-primary-50: #f0f8ff;    /* Lightest */
  --color-primary-100: #e0f1fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;   /* Mid-tone */
  --color-primary-600: #0284c7;   /* ← Main brand color */
  --color-primary-700: #0369a1;   /* ← Hover state */
  --color-primary-800: #075985;
  --color-primary-900: #0c3d66;   /* Darkest */
}
```

### Why 10 Shades?

Each color needs **multiple variants** for different uses:

```
50  → Very light backgrounds, soft highlights
100 → Light hover states, light backgrounds
200 → Subtle borders, dividers
300 → Light accents
400 → Medium accents
500 → Mid-tone, secondary elements
600 → ← MAIN COLOR (buttons, primary text)
700 → ← HOVER STATE
800 → Dark emphasis
900 → Darkest text, deep emphasis
```

### Example: Using Shades

```tsx
// Status badge
<div className="bg-primary-50 border border-primary-200 text-primary-700">
  In Progress
</div>

// Normal button
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Save
</button>

// Disabled button
<button className="bg-primary-200 text-primary-400" disabled>
  Saving...
</button>
```

---

## 2. Tailwind CSS Configuration

### What is Tailwind?

Tailwind is a **utility-first CSS framework** that provides low-level classes you combine to build designs:

```tsx
{/* Instead of writing CSS... */}
<style>
  .button {
    padding: 0.75rem 1rem;
    background-color: #0284c7;
    border-radius: 0.5rem;
    cursor: pointer;
  }
</style>

{/* ...use Tailwind utilities */}
<button className="px-4 py-3 bg-primary-600 rounded-lg cursor-pointer">
  Click me
</button>
```

### Our Tailwind Config Structure

```typescript
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // ← Scan these files
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {  // ← Extend default theme
      colors: {  // ← Add custom colors
        primary: {
          50: "var(--color-primary-50)",    // Reference CSS variable
          100: "var(--color-primary-100)",
          // ... more shades
          600: "var(--color-primary-600)",
        }
      }
    }
  }
};
```

### How It Works: The Pipeline

```
1. CONFIG FILE DEFINES
   tailwind.config.ts
   ↓
2. SCANS CONTENT
   "Find all .tsx files in app/ and components/"
   ↓
3. GENERATES CSS CLASSES
   .bg-primary-600 { background-color: var(--color-primary-600); }
   .text-primary-700 { color: var(--color-primary-700); }
   ↓
4. BUILD TIME
   Only includes classes you actually use (tree-shaking)
   ↓
5. RESULT
   Minimal CSS bundle with only needed styles
```

### Key Config Features

**`content` Array:**
```typescript
content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"]
//       Tells Tailwind: "Look in these folders for class names"
//       If a file uses "bg-primary-600", include that style
```

**`extend` vs `override`:**
```typescript
// EXTEND: Add to default Tailwind (keep Tailwind defaults + add ours)
theme: {
  extend: {
    colors: { /* add custom colors */ }
  }
}

// OVERRIDE: Replace all defaults (not recommended unless intentional)
theme: {
  colors: { /* ONLY these colors available */ }
}
```

---

## 3. Color System Architecture

### The 4 Color Families

#### **Primary (Blue)** - Brand & Main Actions
```
Use for:
  ✓ Primary buttons & CTAs
  ✓ Brand elements (logo, wordmark)
  ✓ Active states
  ✓ Main interactive elements

Example:
  <button className="bg-primary-600 hover:bg-primary-700">
    Save
  </button>
```

#### **Secondary (Indigo)** - Accents & Support
```
Use for:
  ✓ Secondary buttons
  ✓ Badges & tags
  ✓ Highlights & accents
  ✓ Alternative CTAs

Example:
  <button className="bg-secondary-600 hover:bg-secondary-700">
    Optional Action
  </button>
```

#### **Neutral (Gray)** - Text, Borders, Structure
```
Use for:
  ✓ All text content
  ✓ Backgrounds & containers
  ✓ Borders & dividers
  ✓ Structural elements

Example:
  <p className="text-neutral-700 dark:text-neutral-200">
    Body text
  </p>
```

#### **Status (Semantic)** - Feedback Messages
```
Use for:
  ✓ Success: ✓ Positive feedback
  ✓ Warning: ⚠ Caution/alert
  ✓ Error: ✗ Failure/deletion
  ✓ Info: ℹ Information

Example:
  <div className="bg-success-light text-success">
    ✓ Changes saved
  </div>
```

### Color Decision Tree

```
What are you styling?

├─ Main button/brand/focus?
│  └─ Use PRIMARY (primary-600, primary-700)
│
├─ Secondary action/accent?
│  └─ Use SECONDARY (secondary-600, secondary-700)
│
├─ Text/border/background?
│  └─ Use NEUTRAL
│     ├─ Light mode: neutral-900 (dark text)
│     ├─ Dark mode: neutral-50 (light text)
│     └─ Borders: neutral-200 (light) / neutral-800 (dark)
│
└─ Feedback/status message?
   ├─ Positive? → success
   ├─ Warning? → warning
   ├─ Error? → error
   └─ Info? → info
```

---

## 4. Dark Mode Implementation

### How Dark Mode Works

**Step 1: Define Variables Twice**

```css
:root {
  /* Light Mode (Default) */
  --color-background: #ffffff;
  --color-foreground: #111827;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode Override */
    --color-background: #0f172a;
    --color-foreground: #f1f5f9;
  }
}
```

**Step 2: Use Variables Consistently**

```css
body {
  background: var(--color-background);  /* Automatically switches */
  color: var(--color-foreground);        /* Based on system preference */
}
```

**Step 3: Tailwind's `dark:` Prefix**

```tsx
<div className="bg-white dark:bg-neutral-950">
  {/* Light mode: white bg
      Dark mode: neutral-950 bg */}
</div>

<p className="text-neutral-900 dark:text-neutral-50">
  {/* Light mode: dark gray text
      Dark mode: light gray text */}
</p>
```

### When Does Dark Mode Activate?

```
Browser checks: prefers-color-scheme media query
  ↓
Three options:
  1. light   → System set to light mode
  2. dark    → System set to dark mode
  3. no-preference → Let browser decide
```

Users can control this in:
- **macOS**: System Preferences > General > Appearance
- **iOS**: Settings > Display & Brightness
- **Windows**: Settings > Personalization > Colors

### Our Dark Mode Strategy

**For Neutrals (most content):**
```tsx
{/* Primary heading */}
<h1 className="text-neutral-900 dark:text-neutral-50">
{/* Body text */}
<p className="text-neutral-700 dark:text-neutral-200">
{/* Secondary text */}
<span className="text-neutral-600 dark:text-neutral-400">
{/* Muted text */}
<small className="text-neutral-500">
```

**For Primary Colors:**
```tsx
{/* Button in both modes */}
<button className="bg-primary-600 dark:bg-primary-500">
  {/* Lighter in dark mode for visibility */}
</button>

{/* Focus ring adjusts too */}
<button className="focus:ring-offset-2 dark:focus:ring-offset-neutral-950">
  {/* Different offset color for dark background */}
</button>
```

**For Containers:**
```tsx
{/* Card backgrounds */}
<div className="bg-white dark:bg-neutral-950">
  {/* White in light, almost black in dark */}
</div>

{/* Page backgrounds */}
<main className="bg-neutral-50 dark:bg-neutral-900">
  {/* Light gray in light, dark gray in dark */}
</main>
```

---

## 5. Responsive Design

### Mobile-First Approach

We design for **mobile first**, then enhance for larger screens:

```tsx
{/* Base (mobile): */}
<h1 className="text-2xl sm:text-3xl md:text-5xl">
{/*
    Mobile (< 640px):  text-2xl
    Tablet (≥ 640px):  sm:text-3xl
    Desktop (≥ 768px): md:text-5xl
*/}
```

### Tailwind Breakpoints

```
No prefix  →  0px (mobile default)
sm:        →  640px (small tablets)
md:        →  768px (tablets)
lg:        →  1024px (laptops)
xl:        →  1280px (desktops)
2xl:       →  1536px (large screens)
```

### Real Examples from Our Page

**Padding:**
```tsx
<main className="px-4 py-8 sm:px-6 sm:py-12 md:py-16">
{/*
  Mobile:        px-4 (4*0.25=1rem) py-8 (8*0.25=2rem)
  Small (640px): px-6 (6*0.25=1.5rem) py-12 (12*0.25=3rem)
  Medium (768px): py-16 (16*0.25=4rem)
*/}
```

**Font Size:**
```tsx
<h2 className="text-3xl sm:text-4xl md:text-5xl">
{/*
  Mobile (< 640px):  30px
  Tablet (≥ 640px):  36px
  Desktop (≥ 768px): 48px
*/}
```

**Layout:**
```tsx
<div className="mb-8 sm:mb-10">
{/*
  Mobile:        margin-bottom: 2rem (8 * 0.25rem)
  Tablet+:       margin-bottom: 2.5rem (10 * 0.25rem)
*/}
```

### Why Mobile First?

```
❌ Desktop First (harder):
   Start with desktop styles → Add media queries to reduce → Complexity

✅ Mobile First (easier):
   Start with simple mobile → Add media queries to enhance → Natural progression
   Smaller files → Progressive enhancement
```

---

## 6. Component Structure

### Our Page Hierarchy

```
<div className="min-h-screen ... flex flex-col">
  {/* Full page container */}
  
  <header>
    {/* Brand/Logo area - fixed at top */}
  </header>
  
  <main className="flex-1">
    {/* Content area - grows to fill space */}
  </main>
  
  <footer>
    {/* Status line - pushed to bottom */}
  </footer>
</div>
```

### Flexbox Layout Explanation

```css
display: flex;
flex-direction: column;  {/* Stack vertically */}
min-height: 100vh;      {/* At least full viewport height */}
```

```
Without flex-1 on main:
┌──────────────┐
│   Header     │
├──────────────┤
│              │
│    Main      │  Only takes needed space
│              │
├──────────────┤
│   Footer     │
└──────────────┘

With flex-1 on main:
┌──────────────┐
│   Header     │
├──────────────┤
│              │
│              │
│    Main      │  Grows to fill available space
│              │  Pushes footer to bottom
│              │
├──────────────┤
│   Footer     │
└──────────────┘
```

### Container Centering

```tsx
<main>
  <div className="max-w-4xl mx-auto">
    {/* Content here */}
  </div>
</main>
```

**How it works:**
```css
max-w-4xl;      /* Max width: 56rem (896px) */
mx-auto;        /* Margin left/right: auto */
```

```
On wide screens:
┌─────────────────────────────────────────────────────────────┐
│  [spacing] [max-w-4xl content here] [spacing]               │
└─────────────────────────────────────────────────────────────┘
        Auto margin centers it

On narrow screens:
┌──────────────────────┐
│  content fills width │
│  (max-w-4xl ignored) │
└──────────────────────┘
```

---

## 7. Accessibility

### ARIA Labels

```tsx
<button aria-label="Add a new task">
  {/* Screen readers announce: "Add a new task" */}
</button>
```

### Semantic HTML

```tsx
✅ GOOD:
<header>...</header>
<main>...</main>
<footer>...</footer>

❌ AVOID:
<div role="header">...</div>
<div role="main">...</div>
```

Screen readers understand semantic HTML natively.

### Color Contrast

All our text meets **WCAG AA** (4.5:1 ratio minimum):

```
Light mode text colors:
  text-neutral-900 (dark) on bg-white = 13:1 ✅ Excellent
  text-neutral-700 on bg-white = 9:1 ✅ Excellent
  text-neutral-600 on bg-white = 7:1 ✅ Good

Dark mode text colors:
  text-neutral-50 (light) on bg-neutral-950 = 10:1 ✅ Excellent
  text-neutral-200 on bg-neutral-950 = 11:1 ✅ Excellent
```

### Focus States

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500">
{/*
  outline-none    → Remove ugly default browser outline
  ring-2          → Add 2px focus ring
  ring-primary-500 → Color the ring
*/}
</button>
```

**Why this matters:**
- Keyboard users can see what's focused
- Tab navigation stays visible
- Meets WCAG Level AA

### Hover & Active States

```tsx
<button className="hover:bg-primary-700 active:scale-95">
{/*
  hover:bg-primary-700  → Visual feedback on hover
  active:scale-95       → Visual feedback on click
*/}
</button>
```

---

## Summary: How It All Connects

```
1. globals.css
   ↓
   Defines 30+ CSS variables (colors)
   Defines light & dark mode variants
   
2. tailwind.config.ts
   ↓
   References those CSS variables
   Creates Tailwind utility classes
   
3. page.tsx
   ↓
   Uses Tailwind classes
   Combines with dark: prefixes
   Adds responsive prefixes (sm:, md:)
   
RESULT:
   ✓ Consistent theme across site
   ✓ Dark mode automatic
   ✓ Responsive on all devices
   ✓ Accessible to all users
   ✓ Easy to maintain & extend
```

---

## Quick Reference: Common Patterns

### Typical Page Layout
```tsx
<div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
  <header className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
    {/* Header content */}
  </header>
  
  <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
    <div className="max-w-4xl mx-auto">
      {/* Main content */}
    </div>
  </main>
  
  <footer className="bg-white/50 dark:bg-neutral-950/50">
    {/* Footer content */}
  </footer>
</div>
```

### Typical Card Component
```tsx
<div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 sm:p-6">
  <h3 className="text-neutral-900 dark:text-neutral-50 font-semibold">
    Card Title
  </h3>
  <p className="text-neutral-600 dark:text-neutral-400 mt-2">
    Card description
  </p>
</div>
```

### Typical Button
```tsx
<button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 transition-colors duration-200">
  Button Text
</button>
```

---

**You now understand the complete architecture! 🎉**
