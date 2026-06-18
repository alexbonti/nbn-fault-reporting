/**
 * Generates and validates fault IDs in NBN format.
 *
 * Format: NBN-YYYY-XXXXXX
 *   NBN   — service prefix
 *   YYYY  — 4-digit year
 *   XXXXXX — 6-character uppercase alphanumeric sequence
 *
 * Example: NBN-2026-A3F8K2
 */

const FAULT_ID_REGEX = /^NBN-\d{4}-[A-Z0-9]{6}$/;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Generate a new fault ID.
 * @returns {string}  e.g. "NBN-2026-A3F8K2"
 */
function generate() {
  const year = new Date().getFullYear();
  let sequence = '';
  for (let i = 0; i < 6; i++) {
    sequence += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `NBN-${year}-${sequence}`;
}

/**
 * Validate a fault ID string against the expected format.
 * @param {string} faultId
 * @returns {boolean}
 */
function isValid(faultId) {
  if (typeof faultId !== 'string') return false;
  return FAULT_ID_REGEX.test(faultId);
}

module.exports = { generate, isValid, FAULT_ID_REGEX };
