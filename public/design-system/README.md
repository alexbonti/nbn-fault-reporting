# NBN Co Fault Reporting — Design System

Based on the [NBN Co brand identity](https://www.nbnco.com.au) and design language.
Used across all workshop UI components (Chapters 2 & 3).

## Files

| File | Purpose |
|------|---------|
| `tokens.css` | All CSS custom properties — colours, typography, spacing, shadows, radius, z-index |
| `components.css` | Base reset + reusable component classes (import tokens.css first) |

## How to use

```html
<link rel="stylesheet" href="/design-system/tokens.css">
<link rel="stylesheet" href="/design-system/components.css">
```

---

## Colour Palette

### Brand
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-navy` | `#003DA5` | Nav bar, primary headings, bordered buttons |
| `--color-brand-blue` | `#009FE3` | CTAs, links, active states, highlights |
| `--color-brand-blue-dark` | `#0077B6` | Hover state on blue CTAs |
| `--color-brand-blue-light` | `#E6F4FB` | Background tints, info banners |

### Status (Fault states)
| Token | Colour | State |
|-------|--------|-------|
| `--status-submitted` | Grey `#667085` | SUBMITTED |
| `--status-in-progress` | Blue `#009FE3` | IN_PROGRESS |
| `--status-pending` | Amber `#F79009` | PENDING_CUSTOMER |
| `--status-escalated` | Red `#D92D20` | ESCALATED |
| `--status-resolved` | Green `#12B76A` | RESOLVED |

---

## Typography

- **Font family:** `Helvetica Neue`, Arial, Helvetica, sans-serif
- Scale: `--font-size-xs` (12px) → `--font-size-5xl` (48px)
- Use `.heading-1` through `.heading-4` for consistent heading styles
- Use `.label` for uppercase section labels / eyebrows

---

## Components

### Buttons

```html
<a class="btn btn--primary">Report a Fault</a>
<a class="btn btn--secondary">Check Status</a>
<a class="btn btn--ghost">Learn more →</a>
<a class="btn btn--primary btn--lg">Large Primary</a>
<a class="btn btn--primary btn--sm">Small Primary</a>
```

### Cards

```html
<div class="card">
  <div class="card__body">
    <div class="card__icon"><!-- svg --></div>
    <p class="card__title">Title</p>
    <p class="card__text">Description text here.</p>
  </div>
</div>
```

### Status Badges

```html
<span class="badge badge--submitted">Submitted</span>
<span class="badge badge--in-progress">In Progress</span>
<span class="badge badge--pending">Pending Customer</span>
<span class="badge badge--escalated">Escalated</span>
<span class="badge badge--resolved">Resolved</span>
```

### Alerts / Banners

```html
<div class="alert alert--info">...</div>
<div class="alert alert--success">...</div>
<div class="alert alert--warning">...</div>
<div class="alert alert--error">...</div>
```

### Forms

```html
<div class="form-group">
  <label class="form-label">Customer ID</label>
  <input class="form-input" type="text" placeholder="CUS-001-NSW">
  <span class="form-hint">Found on your service agreement</span>
</div>
```

### Step Indicator

```html
<div class="step">
  <div class="step__number">1</div>
  <div class="step__content">
    <div class="step__title">Submit your fault</div>
    <div class="step__desc">Tell us what's happening</div>
  </div>
</div>
```

### Layout

```html
<div class="grid grid-3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

---

## Sections used on landing page

| Section | Class | Background |
|---------|-------|------------|
| Hero | `.hero` | Navy → Blue gradient |
| Features | `.section` | White |
| How it works | `.section` | `--color-grey-50` |
| CTA band | `.section` | Navy |
| Footer | `.footer` | `--color-grey-900` |

---

*Design system created for the NBN Co Fault Reporting API Workshop.*
*Claude Code can use this system to build additional pages — see CLAUDE.md.*
