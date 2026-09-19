# 💻 Code Examples & Real-World Patterns

## Section 1: CSS Variables - Deep Dive

### Basic CSS Variable Usage

```css
/* Define variables */
:root {
  --color-primary: #0284c7;
  --spacing-unit: 0.25rem;
  --border-radius: 0.5rem;
}

/* Use variables */
.button {
  background-color: var(--color-primary);      /* Reuse variable */
  padding: calc(1 * var(--spacing-unit));      /* Math operations */
  border-radius: var(--border-radius);
}

/* Fallback if variable doesn't exist */
.element {
  color: var(--accent-color, #0284c7);         /* Falls back to blue */
}
```

### How We Organize Colors (10 Shades Pattern)

```css
:root {
  /* Lightest → Darkest progression */
  --color-primary-50: #f0f8ff;    /* 0% darkness */
  --color-primary-100: #e0f1fe;   /* 10% */
  --color-primary-200: #bae6fd;   /* 20% */
  --color-primary-300: #7dd3fc;   /* 30% */
  --color-primary-400: #38bdf8;   /* 40% */
  --color-primary-500: #0ea5e9;   /* 50% */
  --color-primary-600: #0284c7;   /* 60% ← PRIMARY SHADE */
  --color-primary-700: #0369a1;   /* 70% ← HOVER STATE */
  --color-primary-800: #075985;   /* 80% */
  --color-primary-900: #0c3d66;   /* 90% - Darkest */
}

/* Usage: You pick the right shade for the right job */
.button-primary {
  background-color: var(--color-primary-600);  /* Normal state */
}

.button-primary:hover {
  background-color: var(--color-primary-700);  /* Darker on hover */
}

.button-primary:disabled {
  background-color: var(--color-primary-200);  /* Light when disabled */
}

.badge-primary {
  background-color: var(--color-primary-50);   /* Very light background */
  color: var(--color-primary-600);              /* Dark text */
  border: 1px solid var(--color-primary-200);   /* Light border */
}
```

### Dark Mode with CSS Variables

```css
:root {
  /* Light Mode (default) */
  --color-background: #ffffff;
  --color-text: #111827;
  --color-border: #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode (overrides) */
    --color-background: #0f172a;
    --color-text: #f1f5f9;
    --color-border: #374151;
  }
}

/* Applied to any element - automatically adapts */
body {
  background: var(--color-background);  /* Auto-switches! */
  color: var(--color-text);
}

div {
  border: 1px solid var(--color-border);  /* Auto-switches! */
}

/* No need to write dark: prefixes for every element */
```

---

## Section 2: Tailwind Configuration

### Step-by-Step Config Breakdown

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  // STEP 1: Tell Tailwind where to look for classes
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ↑ Tailwind scans these files for any Tailwind classes
  //   Example: className="bg-primary-600 text-white"
  //   Tailwind finds: bg-primary-600, text-white
  //   Only generates CSS for these classes

  theme: {
    // STEP 2: Extend the default theme (don't replace it)
    extend: {
      colors: {
        // STEP 3: Define custom colors
        primary: {
          50: "var(--color-primary-50)",    // Reference CSS var
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        // This enables: bg-primary-50, bg-primary-600, text-primary-700, etc.

        secondary: {
          50: "var(--color-secondary-50)",
          // ... more shades
        },

        neutral: {
          50: "var(--color-neutral-50)",
          // ... more shades
        },

        // Status colors (single colors, not 10 shades)
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
      },
    },
  },

  plugins: [],  // No extra plugins needed
};

export default config;
```

### What This Generates

Once configured, Tailwind generates these CSS classes:

```css
/* From primary: { 50: "var(...)", 600: "var(...)" } */

/* Background colors */
.bg-primary-50   { background-color: var(--color-primary-50); }
.bg-primary-100  { background-color: var(--color-primary-100); }
/* ... all the way to ... */
.bg-primary-900  { background-color: var(--color-primary-900); }

/* Text colors */
.text-primary-50  { color: var(--color-primary-50); }
.text-primary-100 { color: var(--color-primary-100); }
/* ... all the way to ... */
.text-primary-900 { color: var(--color-primary-900); }

/* Border colors */
.border-primary-50  { border-color: var(--color-primary-50); }
/* ... and so on ... */

/* Plus hover, active, focus variants */
.hover\:bg-primary-600:hover       { background-color: #0284c7; }
.active\:bg-primary-700:active     { background-color: #0369a1; }
.focus\:ring-primary-500:focus     { ring-color: #0ea5e9; }
.dark\:bg-primary-500 .dark & {    background-color: #0ea5e9; }
/* And so on... */
```

---

## Section 3: Responsive Design Patterns

### Mobile-First Responsive

```tsx
// PATTERN 1: Grow font size with screen
export function Heading() {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      Responsive Title
    </h1>
  );
}
/* 
  < 640px:  30px (text-2xl)      ← Mobile: smaller
  640px+:   36px (sm:text-3xl)   ← Tablet: medium
  768px+:   42px (md:text-4xl)   ← Tablet+: larger
  1024px+:  48px (lg:text-5xl)   ← Desktop: largest
*/

// PATTERN 2: Grow padding with screen
export function Container() {
  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Horizontal padding grows: 1rem → 1.5rem → 2rem → 3rem */}
    </main>
  );
}

// PATTERN 3: Hide/show elements by breakpoint
export function Sidebar() {
  return (
    <div className="hidden md:block">
      {/* Hidden on mobile, shown on tablet+ */}
    </div>
  );
}

// PATTERN 4: Different layouts by breakpoint
export function Grid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* 1 column on mobile
          2 columns on tablet
          3 columns on larger tablet
          4 columns on desktop */}
    </div>
  );
}
```

### Real Component Example

```tsx
export function TaskCard({ task }) {
  return (
    <article className="
      bg-white dark:bg-neutral-950
      border border-neutral-200 dark:border-neutral-800
      rounded-lg
      p-4 sm:p-6 md:p-8
      shadow-sm
      hover:shadow-md
      transition-shadow
    ">
      <h3 className="
        text-lg sm:text-xl md:text-2xl
        font-semibold
        text-neutral-900 dark:text-neutral-50
        mb-2 sm:mb-3
      ">
        {task.title}
      </h3>

      <p className="
        text-sm sm:text-base
        text-neutral-600 dark:text-neutral-400
        mb-4 sm:mb-6
      ">
        {task.description}
      </p>

      <div className="
        flex flex-col sm:flex-row
        gap-2 sm:gap-3
      ">
        <button className="
          flex-1
          px-4 sm:px-5
          py-2 sm:py-2.5
          bg-primary-600 hover:bg-primary-700
          dark:bg-primary-500 dark:hover:bg-primary-600
          text-white
          font-medium
          rounded-lg
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500
        ">
          Edit
        </button>

        <button className="
          flex-1
          px-4 sm:px-5
          py-2 sm:py-2.5
          bg-neutral-100 hover:bg-neutral-200
          dark:bg-neutral-800 dark:hover:bg-neutral-700
          text-neutral-700 dark:text-neutral-300
          font-medium
          rounded-lg
          transition-colors
        ">
          Archive
        </button>
      </div>
    </article>
  );
}
```

---

## Section 4: Dark Mode Patterns

### Simple Dark Mode

```tsx
// PATTERN 1: Text that inverts
<p className="text-neutral-900 dark:text-neutral-50">
  {/* Light mode: dark text (#111827)
      Dark mode: light text (#f1f5f9) */}
</p>

// PATTERN 2: Background that inverts
<div className="bg-neutral-100 dark:bg-neutral-900">
  {/* Light mode: light gray bg (#f3f4f6)
      Dark mode: dark gray bg (#111827) */}
</div>

// PATTERN 3: Border that adapts
<div className="border border-neutral-200 dark:border-neutral-800">
  {/* Light mode: light gray border (#e5e7eb)
      Dark mode: dark gray border (#1f2937) */}
</div>
```

### Advanced Dark Mode with Status

```tsx
export function Alert({ status, message }) {
  const baseStyles = "
    rounded-lg p-4
    border
    transition-colors
  ";

  const successStyles = "
    bg-success-light dark:bg-green-950
    border-success
    text-success dark:text-green-300
  ";

  const errorStyles = "
    bg-error-light dark:bg-red-950
    border-error
    text-error dark:text-red-300
  ";

  const styles = status === "success" ? successStyles : errorStyles;

  return <div className={`${baseStyles} ${styles}`}>{message}</div>;
}

/* 
Light mode + success:  Green background #d1fae5, green text #10b981
Dark mode + success:   Dark green background #1f2f1f, light green text
Light mode + error:    Red background #fee2e2, red text #ef4444
Dark mode + error:     Dark red background #2f1f1f, light red text
*/
```

---

## Section 5: Color Decision Making

### Decision Flowchart in Code

```tsx
// Which color should I use?

function ColorSelector({ elementType, state }) {
  // Interactive elements (buttons, links)
  if (elementType === "button" || elementType === "link") {
    if (state === "primary") {
      return "bg-primary-600 hover:bg-primary-700";
      // Primary action → main brand color
    }
    if (state === "secondary") {
      return "bg-secondary-600 hover:bg-secondary-700";
      // Secondary action → accent color
    }
    if (state === "danger") {
      return "bg-error hover:bg-red-700";
      // Dangerous action → red
    }
  }

  // Text content
  if (elementType === "text") {
    if (state === "primary") {
      return "text-neutral-900 dark:text-neutral-50";
      // Most important → darkest light mode, lightest dark mode
    }
    if (state === "secondary") {
      return "text-neutral-700 dark:text-neutral-200";
      // Less important → lighter light mode, still readable dark mode
    }
    if (state === "muted") {
      return "text-neutral-600 dark:text-neutral-400";
      // Subtle → gray text
    }
  }

  // Backgrounds
  if (elementType === "background") {
    if (state === "page") {
      return "bg-neutral-50 dark:bg-neutral-900";
      // Subtle background
    }
    if (state === "card") {
      return "bg-white dark:bg-neutral-950";
      // Card stands out more
    }
    if (state === "highlight") {
      return "bg-primary-50 dark:bg-primary-900/20";
      // Highlighted area
    }
  }

  // Borders
  if (elementType === "border") {
    if (state === "normal") {
      return "border-neutral-200 dark:border-neutral-800";
      // Standard border
    }
    if (state === "focus") {
      return "border-primary-500";
      // Focused input
    }
  }

  // Status feedback
  if (elementType === "status") {
    return {
      success: "text-success bg-success-light",
      warning: "text-warning bg-warning-light",
      error: "text-error bg-error-light",
      info: "text-info bg-info-light",
    }[state];
  }
}
```

---

## Section 6: Complete Page Example

```tsx
export default function Dashboard() {
  return (
    // Full-height container with dark mode support
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      
      {/* HEADER */}
      <header className="
        px-4 sm:px-6 py-6 sm:py-8
        border-b border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-950
      ">
        <div className="max-w-4xl mx-auto">
          <h1 className="
            text-2xl sm:text-3xl
            font-bold
            bg-gradient-to-r from-primary-600 to-secondary-600
            dark:from-primary-400 dark:to-secondary-400
            bg-clip-text text-transparent
          ">
            FlowTask
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT - Grows to fill space */}
      <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Title Section */}
          <div className="mb-8 sm:mb-10">
            <h2 className="
              text-3xl sm:text-4xl md:text-5xl
              font-bold
              text-neutral-900 dark:text-neutral-50
              mb-2
            ">
              My Tasks
            </h2>
            <p className="
              text-lg sm:text-xl
              text-neutral-600 dark:text-neutral-400
              font-light
            ">
              Stay focused on what matters.
            </p>
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <button className="
              inline-flex items-center gap-2
              px-5 sm:px-6 py-2.5 sm:py-3
              bg-primary-600 hover:bg-primary-700
              dark:bg-primary-500 dark:hover:bg-primary-600
              text-white font-medium
              rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500
              focus:ring-offset-2 dark:focus:ring-offset-neutral-950
              transition-all duration-200
              active:scale-95
            ">
              <span className="text-lg">+</span>
              <span>Add task</span>
            </button>
          </div>

          {/* Empty State */}
          <div className="
            bg-white dark:bg-neutral-950
            rounded-xl shadow-sm
            border border-neutral-200 dark:border-neutral-800
            p-8 sm:p-12
            text-center
          ">
            <div className="max-w-sm mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="
                  w-16 h-16 sm:w-20 sm:h-20
                  bg-primary-50 dark:bg-neutral-800
                  rounded-full
                  flex items-center justify-center
                ">
                  <svg className="
                    w-8 h-8 sm:w-10 sm:h-10
                    text-primary-600 dark:text-primary-400
                  " /* icon SVG */ />
                </div>
              </div>

              <h3 className="
                text-xl sm:text-2xl font-semibold
                text-neutral-900 dark:text-neutral-50
                mb-2
              ">
                No tasks yet
              </h3>
              <p className="
                text-neutral-600 dark:text-neutral-400
              ">
                Add your first task to get started.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER - Fixed at bottom */}
      <footer className="
        border-t border-neutral-200 dark:border-neutral-800
        px-4 sm:px-6 py-4 sm:py-5
        bg-white/50 dark:bg-neutral-950/50
        backdrop-blur-sm
      ">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <span className="
                inline-block w-2 h-2
                bg-success rounded-full
              "></span>
              Ready to go
            </span>
          </p>
        </div>
      </footer>

    </div>
  );
}
```

---

## Section 7: Common Mistakes & Fixes

### ❌ Mistake 1: Hardcoding Colors

```tsx
// BAD - Hardcoded colors
<button className="bg-blue-600 hover:bg-blue-700 text-white">
  Save
</button>

// GOOD - Theme colors
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Save
</button>
```

### ❌ Mistake 2: Forgetting Dark Mode

```tsx
// BAD - Only light mode
<div className="bg-white text-neutral-900">
  Content
</div>

// GOOD - Both modes
<div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
  Content
</div>
```

### ❌ Mistake 3: Desktop-First Responsive

```tsx
// BAD - Design for desktop, reduce for mobile
<h1 className="md:text-5xl sm:text-3xl text-2xl">
  (confusing, backward)
</h1>

// GOOD - Design for mobile, grow for larger screens
<h1 className="text-2xl sm:text-3xl md:text-5xl">
  (natural progression)
</h1>
```

### ❌ Mistake 4: Wrong Color Shade

```tsx
// BAD - Using wrong shade
<button className="bg-primary-100">  {/* Too light! */}
  Save
</button>

// GOOD - Use right shade for context
<button className="bg-primary-600">  {/* Bold and visible */}
  Save
</button>

<div className="bg-primary-50">  {/* Light background */}
  Highlight area
</div>
```

### ❌ Mistake 5: Mixing Neutral Shades Randomly

```tsx
// BAD - Random text colors
<p className="text-neutral-400">Primary text</p>

// GOOD - Consistent hierarchy
<h2 className="text-neutral-900">Heading</h2>
<p className="text-neutral-700">Body text</p>
<span className="text-neutral-600">Secondary</span>
<small className="text-neutral-500">Muted</small>
```

---

**You're ready to build with confidence! 🚀**
