import { elements } from './constants.js';

/**
 * Get value from input on form
 * @returns {string}
 */
export function getFormValue() {
  return elements.formInput.value.trim();
}

/**
 * Reset value inside input
 */
export function resetFormValue() {
  elements.formInput.value = '';
}

/**
 * Focus form input
 */
export function focusFormInput() {
  elements.formInput.focus();
}
