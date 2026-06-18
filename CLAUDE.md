# NBN Fault Reporting API — Claude Code Guide

## Project
This is a Node.js + Express REST API for an Australian telecommunications company (NBN Co).
It allows residential customers to report broadband faults and check the status of their reports.

This is a **workshop environment**. The codebase is intentionally minimal — participants
use Claude Code to build out the missing endpoints during the session.

---

## UI Design System

A design system matching the NBN Co brand identity is located at `public/design-system/`.

### Files

| File | Purpose |
|------|---------|
| `public/design-system/tokens.css` | All CSS custom properties — colours, typography, spacing, shadows, z-index |
| `public/design-system/components.css` | Base reset + reusable component classes |
| `public/design-system/README.md` | Full component catalogue with code examples |

### How to use in any new HTML page

```html
<link rel="stylesheet" href="/design-system/tokens.css">
<link rel="stylesheet" href="/design-system/components.css">
```

### Key design tokens

```css
/* Brand */
--color-brand-navy:  #003DA5   /* nav, headings, borders */
--color-brand-blue:  #009FE3   /* CTAs, links, active states */

/* Fault status colours */
--status-submitted:  #667085   /* SUBMITTED */
--status-in-progress:#009FE3   /* IN_PROGRESS */
--status-pending:    #F79009   /* PENDING_CUSTOMER */
--status-escalated:  #D92D20   /* ESCALATED */
--status-resolved:   #12B76A   /* RESOLVED */
```

### Available component classes

- **Layout:** `.container`, `.section`, `.grid`, `.grid-2`, `.grid-3`, `.grid-4`
- **Typography:** `.heading-1` → `.heading-4`, `.label`, `.text-muted`
- **Buttons:** `.btn .btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--white`, `.btn--sm`, `.btn--lg`
- **Cards:** `.card`, `.card__body`, `.card__icon`, `.card__title`, `.card__text`
- **Forms:** `.form-group`, `.form-label`, `.form-input`, `.form-select`, `.form-textarea`, `.form-hint`, `.form-error`
- **Badges:** `.badge .badge--submitted/in-progress/pending/escalated/resolved`
- **Alerts:** `.alert .alert--info/success/warning/error`
- **Navigation:** `.nav`, `.nav__inner`, `.nav__logo`, `.nav__links`
- **Steps:** `.step`, `.step__number`, `.step__content`
- **Hero:** `.hero`, `.hero__title`, `.hero__subtitle`, `.hero__eyebrow`, `.hero__actions`
- **Footer:** `.footer`, `.footer__grid`, `.footer__heading`, `.footer__links`

### Existing pages

| Page | Path | Purpose |
|------|------|---------|
| Landing page | `public/index.html` | Hero, fault types, how-it-works, API reference |

### Adding new pages

When building additional UI pages (e.g. fault report form, status dashboard):
1. Link both design system CSS files
2. Use `.container` for page-width constraint
3. Use `.section` for vertical rhythm
4. Use tokens directly for any custom styles — never hardcode hex values
5. Refer to `public/design-system/README.md` for full component examples

### Serving static files

To serve the `public/` folder from the Express app, add to `src/app.js`:

```js
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'public')));
```

---

## Commands
- Start server: `npm start`
- Dev mode (auto-restart): `npm run dev`
- Run tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run with coverage: `npm run test:coverage`

## Architecture
- **Framework:** Express 4.x
- **Storage:** In-memory only (Map in `src/store.js`) — no database
- **Test runner:** Jest + Supertest
- **Entry point:** `src/server.js` → loads `src/app.js`

## File Structure
```
src/
  app.js          Express app setup, middleware, error handlers
  server.js       Server entry point (port binding)
  store.js        In-memory fault report store
  faultId.js      Fault ID generation and validation
data/
  mockData.json   Realistic mock customers, fault types, service types
tests/
  health.test.js  Health endpoint and 404 tests (passing on day one)
  faultId.test.js Fault ID utility tests (passing on day one)
```

## Data Model
A fault report has this shape:

```json
{
  "faultId":     "NBN-2026-A3F8K2",
  "customerId":  "CUS-001-NSW",
  "faultType":   "NO_CONNECTION",
  "address":     "14 Banksia Grove, Cherrybrook NSW 2126",
  "description": "No internet since 6am. Power light is red.",
  "status":      "SUBMITTED",
  "createdAt":   "2026-04-15T09:30:00.000Z",
  "updatedAt":   "2026-04-15T09:30:00.000Z"
}
```

## Fault ID Format
Format: `NBN-YYYY-XXXXXX`
- `NBN` — fixed prefix
- `YYYY` — 4-digit year
- `XXXXXX` — 6-character uppercase alphanumeric sequence

Use `faultId.generate()` to create new IDs.
Use `faultId.isValid(id)` to validate incoming IDs.
Regex: `/^NBN-\d{4}-[A-Z0-9]{6}$/`

## Valid Fault Types
From `data/mockData.json`:
- `NO_CONNECTION` — Service completely offline
- `SLOW_SPEED` — Speeds below plan speeds
- `INTERMITTENT` — Connection dropping and restoring
- `PHONE_LINE` — VoIP service fault
- `EQUIPMENT_FAULT` — NBN connection box or router issue
- `PLANNED_OUTAGE` — Suspected scheduled maintenance

## Error Response Format
All errors must follow this consistent format:

```json
{
  "error":     "ERROR_CODE",
  "message":   "Human readable description",
  "timestamp": "2026-04-15T09:30:00.000Z"
}
```

Common error codes used in this project:
- `VALIDATION_ERROR` — Missing or invalid request fields
- `INVALID_FAULT_ID` — fault_id does not match NBN-YYYY-XXXXXX format
- `NOT_FOUND` — Resource does not exist
- `INTERNAL_SERVER_ERROR` — Unexpected server error

## Key Constraints
- **No PII beyond customerId** — do not store names, emails, or phone numbers
- **No external dependencies** — do not install new npm packages without asking
- **No authentication** — out of scope for the workshop
- **No real-time updates** — out of scope for the workshop
- **No database** — in-memory store only

## Testing Conventions
- Test files live in `tests/`
- Name pattern: `<feature>.test.js`
- Use `supertest` for HTTP endpoint tests
- Use `store.clear()` in `beforeEach()` to reset state between tests
- Test at minimum: happy path, missing fields, invalid formats, not found

## Workshop Build Sequence

Endpoints are built in this order across the two workshop sessions:

### Module 1B Demo — POST /report-fault
Built live by the facilitator using the Explore → Plan → Code → Commit workflow.
Accepts a fault report from a residential customer.
Required fields: `customerId`, `faultType`, `address`, `description`
Returns: `{ faultId, status, message, createdAt }`

After this demo, `POST /report-fault` exists in the codebase.

### Module 1C GitHub Arc — PATCH /fault-status/:fault_id
Built live using the full GitHub workflow: BA writes an Issue → Claude Code
creates a branch, builds to spec, opens a PR → Claude reviews the PR →
human approves the merge.

Allows a call centre agent or field technician to update the status of a
fault report. Valid status transitions:
- SUBMITTED → IN_PROGRESS
- IN_PROGRESS → PENDING_CUSTOMER
- IN_PROGRESS → ESCALATED
- IN_PROGRESS → RESOLVED
- PENDING_CUSTOMER → IN_PROGRESS
- ESCALATED → RESOLVED

Note: store.js does not have an update() method yet. Claude Code should
add one as part of this implementation.

Returns: updated fault report object or 404/400 error.

### Module 1C Extension (if time permits) — Fault Dashboard UI
UX designer prototypes the dashboard in Claude.ai first (HTML/CSS mockup).
Claude Code then implements the design as a served static page in the app.
The dashboard displays all fault reports from GET /faults (list endpoint,
also to be built as part of this extension).

After both demos, POST, PATCH and the dashboard exist.
Day 2 teams start from this completed state.
