/**
 * Returns true if HTMLElement is scrolled all the way down
 * @param el {HTMLElement | null} HTMLElement
 * @returns {boolean} boolean
 */
export const isAtBottom = (el) =>
  el?.scrollHeight !== (el?.scrollTop || 0) + (el?.clientHeight || 0);

/**
 * Scrolls to bottom of HTMLElement
 * @param el {HTMLElement | null} HTMLElement
 * @returns {void} void
 */
export const scrollToBottom = (el) => {
  /** @type{HTMLElement} */ (el?.lastChild)?.scrollIntoView();
};
