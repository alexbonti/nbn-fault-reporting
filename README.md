# NBN Fault Reporting API
### Workshop Starter Repo — Agentic AI & the Future of Software Engineering

---

## Overview

This is the starter repository for the **NBN Co × RMIT Online** workshop.

It contains a minimal Express API with no routes implemented. During the workshop,
you'll use **Claude Code** to build out the missing endpoints, following the
Explore → Plan → Code → Commit workflow.

---

## What's Already Here

| File | Purpose |
|------|---------|
| `src/app.js` | Express app with middleware and error handlers |
| `src/server.js` | Server entry point |
| `src/store.js` | In-memory fault report store |
| `src/faultId.js` | Fault ID generation and validation utilities |
| `data/mockData.json` | Realistic mock customers, fault types, service types |
| `tests/health.test.js` | Health check tests — passing from day one |
| `tests/faultId.test.js` | Fault ID utility tests — passing from day one |
| `CLAUDE.md` | Claude Code project memory — read automatically each session |

---

## What You'll Build

Endpoints are built in sequence across two workshop sessions:

### Session 1 — Module 1B Live Demo: `POST /report-fault`
The facilitator builds this live using the Explore → Plan → Code → Commit
workflow. You watch, then reproduce it yourself in the afternoon breakout.

**Request body:**
```json
{
  "customerId":  "CUS-001-NSW",
  "faultType":   "NO_CONNECTION",
  "address":     "14 Banksia Grove, Cherrybrook NSW 2126",
  "description": "No internet since 6am this morning."
}
```

**Success response (201):**
```json
{
  "faultId":   "NBN-2026-A3F8K2",
  "status":    "SUBMITTED",
  "message":   "Your fault report has been received.",
  "createdAt": "2026-04-15T09:30:00.000Z"
}
```

### Session 2 — Module 1C GitHub Arc: `GET /fault-status/:fault_id`
Built using the full GitHub workflow. The BA writes a GitHub Issue with
acceptance criteria → Claude Code creates a branch, builds the endpoint,
opens a PR → Claude reviews the PR → a human approves the merge.

**Success response (200):**
```json
{
  "faultId":     "NBN-2026-A3F8K2",
  "customerId":  "CUS-001-NSW",
  "faultType":   "NO_CONNECTION",
  "address":     "14 Banksia Grove, Cherrybrook NSW 2126",
  "description": "No internet since 6am this morning.",
  "status":      "SUBMITTED",
  "createdAt":   "2026-04-15T09:30:00.000Z",
  "updatedAt":   "2026-04-15T09:30:00.000Z"
}
```

**After both demos**, the full API exists. Day 2 teams start from this
completed state and build their own features on top of it.

---

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd nbn-fault-reporting

# 2. Install dependencies
npm install

# 3. Confirm tests pass
npm test

# 4. Start the server
npm start

# 5. Check it's running
curl http://localhost:3000/health
```

---

## Running Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

On day one, you should see **2 test suites, 16 tests, all passing**.

---

## Mock Data

Realistic Australian customer data is in `data/mockData.json`:

- **8 sample customers** across all states, all NBN service types
  (FTTP, FTTN, FTTC, FTTB, HFC, Fixed Wireless, Satellite)
- **6 fault types** with priority levels and target resolution times
- **5 fault status codes** with descriptions
- **4 sample fault report descriptions** — ready to use in demos

---

## Workshop Day 2 — Team Challenge

Build a working prototype of the fault reporting tool. Your team's output must include:

1. `POST /report-fault` endpoint — implemented, validated, tested
2. `PATCH /fault-status/:fault_id` endpoint — implemented, validated, tested
3. One GitHub Issue per feature (written by the BA)
4. One PR per feature (created by Claude Code)
5. One subagent PR review per feature before the human merge

Assessment criteria:
- Did every role contribute a meaningful, identifiable output?
- Did you follow the Human Decision / AI Assist / AI Automate boundaries?
- Where did you deviate from the playbook — and why?

---

## Fault ID Format

```
NBN-YYYY-XXXXXX

NBN     — fixed prefix
YYYY    — 4-digit year  
XXXXXX  — 6-character uppercase alphanumeric sequence

Example: NBN-2026-A3F8K2
```

---

*Based on Anthropic Claude Code — RMIT Online Workshop Program, April 2026*
