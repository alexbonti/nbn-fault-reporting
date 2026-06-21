#!/usr/bin/env node
/**
 * Generates .claude/settings.local.json from .claude/settings.example.json.
 * Replaces $PWD placeholders with the absolute path of the project root.
 *
 * Run: npm run setup
 */

const fs   = require('fs');
const path = require('path');

const root       = path.join(__dirname, '..');
const examplePath = path.join(root, '.claude', 'settings.example.json');
const outputPath  = path.join(root, '.claude', 'settings.local.json');

if (!fs.existsSync(examplePath)) {
  console.error('Error: .claude/settings.example.json not found.');
  process.exit(1);
}

const template = fs.readFileSync(examplePath, 'utf8');
const resolved = template.replace(/\$PWD/g, root);

fs.writeFileSync(outputPath, resolved);
console.log('Generated .claude/settings.local.json');
console.log('Restart Claude Code for hook changes to take effect.');
