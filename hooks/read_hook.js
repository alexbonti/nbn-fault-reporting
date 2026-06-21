#!/usr/bin/env node
/**
 * PreToolUse hook — blocks Claude from reading the .env file.
 *
 * Hook contract:
 *   stdin  — JSON describing the proposed tool call
 *   exit 0 — allow the call
 *   exit 2 — block the call (stderr message sent back to Claude)
 */

process.stdin.setEncoding('utf8');
let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  const toolArgs = JSON.parse(input);
  const readPath = toolArgs.tool_input?.file_path || '';
  if (readPath.includes('.env')) {
    console.error('Blocked: .env must not be read. Use .env.example for key names.');
    process.exit(2);
  }
  process.exit(0);
});
