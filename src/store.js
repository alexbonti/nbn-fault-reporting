/**
 * In-memory store for fault reports.
 *
 * Intentionally simple — this is a workshop environment.
 * In production, this would be replaced with a database layer.
 *
 * Data persists only for the lifetime of the Node process.
 */

const store = new Map();

module.exports = {
  /**
   * Save a fault report.
   * @param {string} faultId  - Generated fault ID (NBN-YYYY-XXXXXX format)
   * @param {object} report   - The full fault report object
   */
  save(faultId, report) {
    store.set(faultId, report);
  },

  /**
   * Retrieve a fault report by ID.
   * @param {string} faultId
   * @returns {object|undefined}
   */
  findById(faultId) {
    return store.get(faultId);
  },

  /**
   * List all stored fault reports.
   * @returns {object[]}
   */
  findAll() {
    return Array.from(store.values());
  },

  /**
   * Return total count of stored reports.
   * @returns {number}
   */
  count() {
    return store.size;
  },

  /**
   * Clear all stored reports.
   * Used between tests to ensure a clean state.
   */
  clear() {
    store.clear();
  }
};
