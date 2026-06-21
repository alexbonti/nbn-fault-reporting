#!/usr/bin/env node
/**
 * PostToolUse hook — runs npm test after every file write or edit.
 *
 * If tests fail, writes the failure output to stderr so Claude reads it
 * and self-corrects in the same turn.
 *
 * Hook contract:
 *   stdin  — JSON describing the completed tool call
 *   exit 0 — tests passed
 *   exit 1 — tests failed (stderr fed back to Claude as context)
 */

const { execSync } = require('child_process');
const path = require('path');

process.stdin.setEncoding('utf8');
let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    execSync('npm test', {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });
    process.exit(0);
  } catch (err) {
    const output = (err.stdout || '').toString() + (err.stderr || '').toString();
    process.stderr.write('Tests failed after edit:\n' + output);
    process.exit(1);
  }
});
