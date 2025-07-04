// rituals/index.js
import { ritualActions } from './actions.js';
import ceremonies from './ceremonies.json';

/**
 * Perform all ritual actions tied to a specific trigger.
 * @param {string} trigger - Ritual trigger event name (e.g., 'onOpen', 'onDeploy')
 * @param {HTMLElement} [element] - Optional DOM element to target
 */
export function performRitual(trigger, element = null) {
  const rituals = ceremonies.rituals.filter(r => r.trigger === trigger);
  rituals.forEach(ritual => {
    ritual.actions.forEach(actionName => {
      const actionFn = ritualActions[actionName];
      if (typeof actionFn === 'function') {
        try {
          actionFn(element);
        } catch (err) {
          console.warn(`Ritual action "${actionName}" failed:`, err);
        }
      } else {
        console.warn(`Ritual action "${actionName}" not found.`);
      }
    });
  });
}

/**
 * Get metadata for rituals, optionally filtered by trigger.
 * @param {string} [trigger] - Optional trigger to filter rituals
 * @returns {Array} Ritual definitions
 */
export function getRituals(trigger = null) {
  return trigger
    ? ceremonies.rituals.filter(r => r.trigger === trigger)
    : ceremonies.rituals;
}

/**
 * Get a ritual definition by ID.
 * @param {string} id - Ritual ID
 * @returns {Object|null} Ritual object or null
 */
export function getRitualById(id) {
  return ceremonies.rituals.find(r => r.id === id) || null;
}
