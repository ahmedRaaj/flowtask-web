# 🔘 Button Component - Usage Guide

## Overview
Reusable, type-safe Button component with 4 variants, 3 sizes, and full dark mode support.

**File:** `../../components/Button.tsx`

---

## Basic Usage

### Simple Button
```tsx
import Button from "@/components/Button";

export default function Page() {
  const handleClick = () => console.log("Clicked!");
  
  return (
    <Button
      label="Click me"
      onClick={handleClick}
    />
  );
}
```

### With Icon
```tsx
<Button
  label="Add task"
  icon={<span className="text-lg">+</span>}
  onClick={handleAddTask}
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | required | Button text content |
| `icon` | ReactNode | undefined | Icon element to display before label |
| `onClick` | () => void | undefined | Click handler function |
| `variant` | string | "primary" | Style variant: primary \| secondary \| outline \| danger |
| `size` | string | "md" | Button size: sm \| md \| lg |
| `disabled` | boolean | false | Disable button interaction |
| `className` | string | "" | Additional Tailwind classes |
| `ariaLabel` | string | undefined | Accessibility label (falls back to label) |
| `type` | string | "button" | HTML type: button \| submit \| reset |

---

## Variants

### 1. Primary (Default)
```tsx
<Button
  label="Save"
  variant="primary"
  onClick={handleSave}
/>
```
**Use for:** Main actions (submit, create, add)
**Colors:** Blue (light theme), Darker blue (dark theme)

### 2. Secondary
```tsx
<Button
  label="Filter"
  variant="secondary"
  onClick={handleFilter}
/>
```
**Use for:** Secondary actions, accents
**Colors:** Indigo (light theme), Darker indigo (dark theme)

### 3. Outline
```tsx
<Button
  label="Cancel"
  variant="outline"
  onClick={handleCancel}
/>
```
**Use for:** Dismissal, optional actions
**Colors:** Bordered primary color, fills on hover

### 4. Danger
```tsx
<Button
  label="Delete"
  variant="danger"
  onClick={handleDelete}
/>
```
**Use for:** Destructive actions (delete, remove)
**Colors:** Red

---

## Sizes

### Small
```tsx
<Button
  label="Okay"
  size="sm"
/>
```
**Use for:** Compact layouts, inline actions

### Medium (Default)
```tsx
<Button
  label="Add Task"
  size="md"
/>
```
**Use for:** Most buttons, primary interactions

### Large
```tsx
<Button
  label="Get Started"
  size="lg"
/>
```
**Use for:** Hero sections, prominent CTAs

---

## Real-World Examples

### Add Task Button
```tsx
<Button
  label="Add task"
  icon={<span className="text-lg">+</span>}
  onClick={handleAddTask}
  variant="primary"
  size="md"
  ariaLabel="Add a new task"
/>
```

### Save Form
```tsx
<form onSubmit={handleSubmit} className="flex gap-3">
  <Button
    label="Save"
    type="submit"
    variant="primary"
  />
  <Button
    label="Cancel"
    type="button"
    variant="outline"
    onClick={handleCancel}
  />
</form>
```

### Action Row
```tsx
<div className="flex gap-2">
  <Button label="Edit" size="sm" />
  <Button label="Copy" size="sm" />
  <Button
    label="Delete"
    size="sm"
    variant="danger"
    onClick={handleDelete}
  />
</div>
```

### Disabled State
```tsx
<Button
  label="Save"
  disabled={isLoading}
  onClick={handleSave}
/>
```

---

## Styling

### All Variants Include:
- ✅ **Hover states** - Color change, smooth transition
- ✅ **Focus states** - Ring + offset for accessibility
- ✅ **Active states** - Scale animation on click (primary/secondary/danger)
- ✅ **Dark mode** - Automatic color switching
- ✅ **Disabled state** - Opacity reduction, cursor disabled

### Focus Ring
```
Focus state:
  - 2px ring (primary color)
  - 2px offset from button
  - Automatically visible on keyboard navigation
```

### Active State
Primary, Secondary, Danger variants scale to 95% on click (visual feedback).

---

## Accessibility

### Built-in Features
- ✅ `aria-label` - Screen reader support
- ✅ Semantic `<button>` HTML
- ✅ Focus ring visible on keyboard navigation
- ✅ `disabled` attribute for assistive tech
- ✅ Sufficient color contrast (WCAG AA)

### Example with Accessibility
```tsx
<Button
  label="Edit"
  ariaLabel="Edit task: Buy groceries"
  icon={<PencilIcon />}
  onClick={handleEdit}
/>
```

---

## Combining Features

### Icon + Variant + Size
```tsx
<Button
  label="Create Task"
  icon={<PlusIcon />}
  variant="primary"
  size="lg"
  onClick={handleCreate}
/>
```

### Custom Styling
```tsx
<Button
  label="Custom"
  className="w-full" // Make button full width
  onClick={handleClick}
/>
```

### With Loading State
```tsx
const [isLoading, setIsLoading] = useState(false);

<Button
  label={isLoading ? "Saving..." : "Save"}
  disabled={isLoading}
  onClick={handleSave}
/>
```

---

## Dark Mode

### Automatic
No extra code needed! Button automatically:
- Changes colors for dark theme
- Swaps text color for readability
- Adjusts focus ring offset for dark backgrounds

Test in browser DevTools:
```
F12 → More tools → Rendering → Emulate CSS media feature prefers-color-scheme
```

---

## Comparison: Before & After

### Before (Hardcoded)
```tsx
// page.tsx - Long, repetitive
<button
  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-600 dark:bg-primary-500 text-white font-medium rounded-lg shadow-sm hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 transition-all duration-200 active:scale-95"
  aria-label="Add a new task"
>
  <span className="text-lg">+</span>
  <span>Add task</span>
</button>
```

### After (Reusable)
```tsx
// page.tsx - Clean, maintainable
<Button
  label="Add task"
  icon={<span className="text-lg">+</span>}
  onClick={handleAddTask}
  ariaLabel="Add a new task"
/>
```

**Benefits:**
- 📉 90% less code
- 🎨 Consistent styling everywhere
- 🔧 Change once, update all buttons
- 🧪 Easier to test
- ♿ Built-in accessibility

---

## Common Patterns

### Button Group
```tsx
<div className="flex gap-2">
  <Button label="Option 1" size="sm" />
  <Button label="Option 2" size="sm" />
  <Button label="Option 3" size="sm" />
</div>
```

### Button with Loading
```tsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  await delay(2000);
  setLoading(false);
};

<Button
  label={loading ? "Submitting..." : "Submit"}
  disabled={loading}
  onClick={handleSubmit}
  variant="primary"
/>
```

### Icon-Only Button
```tsx
<Button
  label="Save"
  icon={<SaveIcon />}
  className="p-3" // Override padding
  ariaLabel="Save document"
/>
```

---

## Next Steps

1. **Use in your components** - Replace any hardcoded buttons
2. **Create more variants** - Add custom color schemes if needed
3. **Build related components** - Card, Input, Modal, etc.
4. **Extract icons** - Create Icon component for consistency

---

## File Reference
- **Component:** `../../components/Button.tsx`
- **Used in:** `../../app/page.tsx`
- **Color system:** `../../app/globals.css`
- **Tailwind config:** `../../tailwind.config.ts`
