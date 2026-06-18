const { generate, isValid, FAULT_ID_REGEX } = require('../src/faultId');

describe('faultId.generate()', () => {
  it('generates an ID in NBN-YYYY-XXXXXX format', () => {
    const id = generate();
    expect(isValid(id)).toBe(true);
  });

  it('includes the current year', () => {
    const id = generate();
    const year = new Date().getFullYear().toString();
    expect(id).toContain(year);
  });

  it('generates unique IDs across multiple calls', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generate()));
    expect(ids.size).toBe(100);
  });
});

describe('faultId.isValid()', () => {
  it('accepts a correctly formatted fault ID', () => {
    expect(isValid('NBN-2026-A3F8K2')).toBe(true);
  });

  it('accepts fault IDs with all digits in the sequence', () => {
    expect(isValid('NBN-2026-123456')).toBe(true);
  });

  it('accepts fault IDs with all letters in the sequence', () => {
    expect(isValid('NBN-2026-ABCDEF')).toBe(true);
  });

  it('rejects lowercase sequence characters', () => {
    expect(isValid('NBN-2026-a3f8k2')).toBe(false);
  });

  it('rejects wrong prefix', () => {
    expect(isValid('FAU-2026-A3F8K2')).toBe(false);
  });

  it('rejects sequence that is too short', () => {
    expect(isValid('NBN-2026-A3F8K')).toBe(false);
  });

  it('rejects sequence that is too long', () => {
    expect(isValid('NBN-2026-A3F8K22')).toBe(false);
  });

  it('rejects missing year segment', () => {
    expect(isValid('NBN-A3F8K2')).toBe(false);
  });

  it('rejects non-string input', () => {
    expect(isValid(null)).toBe(false);
    expect(isValid(undefined)).toBe(false);
    expect(isValid(12345)).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValid('')).toBe(false);
  });
});
