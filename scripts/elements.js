/**
 * Find element with provided id.
 * @param {string} id
 * @returns {HTMLElement | null}
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Find element with provided id and ensure if it exists.
 * @param {string} id
 * @returns {HTMLElement}
 */
export function getElementByIdWithCheck(id) {
  const element = getElementById(id);

  if (!element) {
    throw new Error(`Element with id '${id}' does not exist!`);
  }

  return element;
}

/**
 * @typedef {Object} CreateElementOptions
 * @property {string} [id]
 * @property {string} [className]
 */

/**
 * Create HTML element with provided options.
 * @template {keyof HTMLElementTagNameMap} TagName
 * @param {TagName} tagName
 * @param {CreateElementOptions} [options]
 * @returns {HTMLElementTagNameMap[TagName]}
 */
export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);
  
  if (options.id) {
    if (document.getElementById(options.id)) {
      console.warn(`Element with id '${options.id}' already exists!`);
    }
    element.id = options.id;
  }
  
  if (options.className) {
    for (const classStr of options.className.split(' ')) {
      element.classList.add(classStr);
    }
  }
  
  return element;
}
