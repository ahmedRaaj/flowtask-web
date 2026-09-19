# 🎨 FlowTask Design System

This document describes the consistent color and typography system used across FlowTask.

## Color Palette

### Primary Colors (Professional Blue)
Used for main CTAs, brand elements, and primary interactions.

```css
--color-primary-50:  #f0f8ff  /* Lightest: backgrounds, light hover states */
--color-primary-100: #e0f1fe
--color-primary-200: #bae6fd
--color-primary-300: #7dd3fc
--color-primary-400: #38bdf8
--color-primary-500: #0ea5e9  /* Mid-tone: accents, secondary elements */
--color-primary-600: #0284c7  /* Main: buttons, active states */
--color-primary-700: #0369a1  /* Hover: interactive hover states */
--color-primary-800: #075985
--color-primary-900: #0c3d66  /* Darkest: emphasis, deep interactive states */
```

### Secondary Colors (Professional Indigo)
Used for accents, secondary interactions, and complementary highlights.

```css
--color-secondary-50:  #f0f4ff
--color-secondary-100: #e0e7ff
--color-secondary-200: #c7d2fe
--color-secondary-300: #a5b4fc
--color-secondary-400: #818cf8
--color-secondary-500: #6366f1  /* Mid-tone: accents, badges */
--color-secondary-600: #4f46e5  /* Main: secondary buttons */
--color-secondary-700: #4338ca  /* Hover: secondary hover states */
--color-secondary-800: #3730a3
--color-secondary-900: #312e81  /* Darkest: deep emphasis */
```

### Neutral Colors (Cool Gray)
Used for text, backgrounds, borders, and structural elements.

```css
--color-neutral-50:  #f9fafb  /* Lightest: subtle backgrounds */
--color-neutral-100: #f3f4f6  /* Light background */
--color-neutral-200: #e5e7eb  /* Borders, dividers */
--color-neutral-300: #d1d5db  /* Light borders */
--color-neutral-400: #9ca3af  /* Muted text, secondary labels */
--color-neutral-500: #6b7280  /* Tertiary text */
--color-neutral-600: #4b5563  /* Secondary text */
--color-neutral-700: #374151  /* Primary text (light mode) */
--color-neutral-800: #1f2937  /* Dark text, emphasis */
--color-neutral-900: #111827  /* Darkest: primary text (dark mode) */
```

### Status Colors
Used for semantic feedback and state indication.

```css
--color-success:      #10b981  /* Green: positive actions, confirmations */
--color-success-light: #d1fae5
--color-warning:      #f59e0b  /* Amber: cautions, warnings */
--color-warning-light: #fef3c7
--color-error:        #ef4444  /* Red: errors, deletions */
--color-error-light:  #fee2e2
--color-info:         #3b82f6  /* Blue: informational messages */
--color-info-light:   #dbeafe
```

---

## Usage Guide

### Tailwind Color Classes

All colors are available as Tailwind color classes:

#### Primary Colors
```tsx
<div className="bg-primary-50">      {/* Light background */}
<div className="bg-primary-600">     {/* Main button background */}
<div className="text-primary-700">   {/* Dark text */}
<div className="border-primary-200"> {/* Light border */}
```

#### Secondary Colors
```tsx
<div className="bg-secondary-50">
<div className="border-secondary-600">
<span className="text-secondary-500">
```

#### Neutral Colors
```tsx
<div className="bg-neutral-50">       {/* Page background */}
<p className="text-neutral-700">      {/* Primary text */}
<div className="border-neutral-200">  {/* Border */}
```

#### Status Colors
```tsx
<div className="bg-success">
<div className="bg-warning-light">
<div className="text-error">
<span className="bg-info-light">
```

---

## Color Mapping by Component

### Buttons
- **Primary Button**: `bg-primary-600` → hover: `bg-primary-700` → focus: `focus:ring-primary-500`
- **Secondary Button**: `bg-secondary-600` → hover: `bg-secondary-700`
- **Danger Button**: `bg-error` → hover: `bg-red-700`
- **Success Button**: `bg-success` → hover: `bg-green-600`

### Text
- **Primary Heading**: `text-neutral-900` (light) / `text-neutral-50` (dark)
- **Secondary Heading**: `text-neutral-800` (light) / `text-neutral-100` (dark)
- **Body Text**: `text-neutral-700` (light) / `text-neutral-200` (dark)
- **Muted Text**: `text-neutral-600` (light) / `text-neutral-400` (dark)

### Backgrounds
- **Primary Background**: `bg-neutral-50` (light) / `bg-neutral-900` (dark)
- **Card Background**: `bg-white` (light) / `bg-neutral-950` (dark)
- **Hover State**: `bg-neutral-100` (light) / `bg-neutral-800` (dark)
- **Disabled State**: `bg-neutral-200` (light) / `bg-neutral-700` (dark)

### Borders
- **Primary Border**: `border-neutral-200` (light) / `border-neutral-800` (dark)
- **Subtle Border**: `border-neutral-100` (light) / `border-neutral-900` (dark)
- **Emphasis Border**: `border-primary-300` (light) / `border-primary-700` (dark)

### Status Indicators
- **Success**: `bg-success` or `text-success`
- **Warning**: `bg-warning` or `text-warning`
- **Error**: `bg-error` or `text-error`
- **Info**: `bg-info` or `text-info`

---

## Dark Mode

All colors automatically adapt to dark mode via `prefers-color-scheme: dark`.

```tsx
// Automatic dark mode support
<div className="bg-white dark:bg-neutral-950">
  <p className="text-neutral-900 dark:text-neutral-50">
    Text that adapts to light/dark modes
  </p>
</div>
```

The CSS variables defined in `globals.css` handle the color adjustments:

- **Light Mode**: Bright backgrounds, dark text
- **Dark Mode**: Dark backgrounds, light text with adjusted contrast

---

## Accessibility

### Color Contrast
All text-background combinations meet **WCAG AA** standards (4.5:1 for normal text).

### Focus States
All interactive elements have visible focus rings using `focus:ring-2 focus:ring-primary-500`.

### Semantic Use
- Never use color alone to convey information (use icons/text + color)
- Always provide enough contrast between text and background
- Use status colors (success/warning/error) for semantic feedback

---

## Adding New Components

When creating new components, use the theme colors:

```tsx
// ❌ Bad: Hardcoded colors
<button className="bg-blue-600 hover:bg-blue-700">

// ✅ Good: Using theme colors
<button className="bg-primary-600 hover:bg-primary-700">
```

### Color Selection Guide
- **Interactive elements** → `primary-*`
- **Accents / badges** → `secondary-*`
- **Text / structure** → `neutral-*`
- **Feedback messages** → `success/warning/error/info`

---

## Extending Colors

To add new colors, update `../../app/globals.css` and `tailwind.config.ts`:

1. Add CSS variable in `:root` (both light and dark modes)
2. Add to `@theme inline` in globals.css
3. Add to `extend.colors` in tailwind.config.ts

---

Generated: 2026-09-19
Last Updated: Design System v1.0
