const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// ── Static files (landing page + design system) ───────────────────
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── Health check ──────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'NBN Fault Reporting API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ── Routes added during the workshop ──────────────────────────────
//   POST  /report-fault              (Module 1B  — facilitator demo)
//   PATCH /fault-status/:fault_id    (Module 1C  — GitHub arc, facilitator)
//   GET   /fault-status/:fault_id    (Module 2A  — engineers, Part 1)

// ── 404 handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// ── Global error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
