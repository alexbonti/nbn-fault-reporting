const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`NBN Fault Reporting API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('─────────────────────────────────────────────');
  console.log('Workshop starter repo — routes not yet implemented.');
  console.log('Use Claude Code to build POST /report-fault');
  console.log('and GET /fault-status/:fault_id');
});
