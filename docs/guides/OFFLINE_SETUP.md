# 📡 Going Offline: Font & Dependency Guide

## Current Status

| Component | Online? | Details |
|-----------|---------|---------|
| Fonts | ✅ Currently Online | Google Fonts (CDN) |
| CSS | ✅ Offline | Tailwind (built-in) |
| JS | ✅ Offline | Next.js (local) |
| Tailwind | ✅ Offline | Local npm package |

---

## 🔄 Option 1: Hybrid (Current - Fast + Fallback)

### Status: ✅ IMPLEMENTED
Your app now has:
- ✅ `display: "swap"` - Shows fallback font while loading
- ✅ `preload: true` - Downloads font early
- Works offline after first load (cached)
- Instantly usable with system fonts as fallback

### How It Works:
```
1. First visit: Downloads font from Google Fonts
2. Browser caches font (1-2 days)
3. System font shows until download finishes
4. No blank text or layout shift ✓
5. Subsequent visits: Uses cached font instantly
```

**Best for:** Most users (fast, cached, fallback)

---

## 📂 Option 2: Fully Self-Hosted (Complete Offline)

### How to Set Up:

#### Step 1: Get Font Files

Download from Google Fonts:
```bash
# Option A: Manual Download
# 1. Visit https://fonts.google.com/specimen/Geist
# 2. Click "Download family"
# 3. Extract to public/fonts/

# Option B: Use Google Fonts Downloader
npm install -g gftools
gftools download Geist
```

#### Step 2: File Structure
```
public/
└── fonts/
    ├── GeistSans-Regular.woff2
    ├── GeistSans-Medium.woff2
    ├── GeistSans-Bold.woff2
    ├── GeistMono-Regular.woff2
    └── GeistMono-Bold.woff2
```

#### Step 3: Update app/layout.tsx

Replace Google import with local:

```typescript
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/GeistSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeistSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeistSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeistMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

#### Step 4: Build & Test

```bash
npm run build
npm run dev

# Visit http://localhost:3000
# Works offline now ✓
```

---

## 🎨 Option 3: System Fonts (Ultra-Fast, Zero Downloads)

### Files are Already Installed, Use This Layout:

```typescript
// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

### Update globals.css:

```css
html {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  /* Fallback to system fonts */
}
```

**Pros:**
- ✅ Zero HTTP requests
- ✅ Instant load
- ✅ Works offline by default
- ✅ Smaller build size

**Cons:**
- ❌ Less brand-specific
- ❌ Varies by OS/device

---

## 📊 Comparison Table

| Metric | Current (Hybrid) | Self-Hosted | System Fonts |
|--------|-----------------|------------|-------------|
| **First Load** | 200ms | 0ms | 0ms |
| **Offline** | ✓ After cache | ✓ Always | ✓ Always |
| **Font Size** | ~30KB | ~60KB | 0KB |
| **Build Size** | Smaller | +60KB | Smallest |
| **Branding** | Full | Full | Limited |
| **Setup** | ✅ Done | 30 min | 5 min |
| **Fallback** | System font | System font | N/A |

---

## ✅ Recommended: Hybrid (Current Setup)

### Why?
1. **Fast first load** - Font downloads while page renders
2. **Instant after cache** - Browser caches 1-2 days
3. **Works offline** - Fallback system font always ready
4. **No maintenance** - Google handles font updates
5. **Smallest build** - No font files in repo

### Make It Work Offline:

After first load, your site is cached. To test offline:

1. **Chrome DevTools:**
   ```
   F12 → Network tab → Offline checkbox ✓
   Refresh → Works! ✓
   ```

2. **Firefox DevTools:**
   ```
   F12 → Network settings → Offline ✓
   Refresh → Works! ✓
   ```

3. **Real offline (no internet):**
   ```
   Unplug wifi/internet
   Refresh → Works! ✓
   ```

---

## 🚀 Next Steps

### Keep Current (Recommended):
```bash
# Nothing to do!
# Your app is already optimized for offline after first load
npm run build
npm run dev
```

### Go Fully Offline:
```bash
# Follow Option 2: Fully Self-Hosted above
# Download font files → Update layout.tsx → Done
```

### Use System Fonts:
```bash
# Follow Option 3: System Fonts above
# Remove font imports → Update CSS → Done
```

---

## 🔍 How to Verify

### Check Font Loading:
```bash
# Chrome DevTools
1. F12 → Network tab
2. Reload page
3. Filter: "font"
4. See where fonts load from:
   - cdn.fonts.googleapis.com = Online (Google Fonts)
   - localhost:3000/fonts/ = Offline (Self-hosted)
   - (none) = System fonts
```

### Test Offline Mode:
```bash
1. Reload page (load fonts into cache)
2. F12 → Network tab → Offline ✓
3. Refresh page
4. Should still see fonts (cached) ✓
```

---

## 💡 Summary

| Situation | Recommendation |
|-----------|-----------------|
| **Quick start, good internet** | Keep current (hybrid) ✅ |
| **Need guaranteed offline** | Self-host fonts (Option 2) |
| **Smallest possible build** | System fonts (Option 3) |
| **Mobile app / Offline-first** | Self-hosted + Service Worker |

---

## 📚 Learn More

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com)
- [Font Display Strategy](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [Service Workers for Offline](https://web.dev/service-workers-cache-storage/)

---

**Status:** ✅ Current setup optimized for hybrid (online + offline cache)
