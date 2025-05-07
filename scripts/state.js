/**
 * @typedef {Array.<import('./tasks.js').Task>} Tasks
 * @typedef {import('./filters.js').FilterType} FilterType
 * @typedef {import('./pagination.js').Pagination} Pagination
 * 
 * @typedef {Object} State
 * @property {string} name
 * @property {Tasks} tasks
 * @property {FilterType} filter
 * @property {Pagination} pagination
 * 
 * @typedef {Object} CreateStateInitial
 * @property {Tasks} tasks
 * @property {FilterType} filter
 * @property {Pagination} pagination
 * 
 * @typedef {Object} CreateStateOptions
 * @property {boolean} isPersistent
 */

/** @type {Record<string, CreateStateOptions>} */
const storages = {};

/**
 * Create state
 * @param {string} name
 * @param {CreateStateInitial} initialState
 * @param {CreateStateOptions} [options={}]
 * @returns {State}
 */
export function createState(name, initialState, options = {}) {
  storages[name] = options;
  if (options.isPersistent) {
    const storageValue = JSON.parse(sessionStorage.getItem(name));
    return storageValue ?? { name, ...initialState };
  }
  return { name, ...initialState };
}

/**
 * Change value of state
 * @template {keyof State} StateKey
 * @param {State} state
 * @param {StateKey} key
 * @param {State[StateKey]} value
 */
export function changeState(state, key, value) {
  const { isPersistent } = storages[state.name];
  state[key] = value;
  if (isPersistent) {
    sessionStorage.setItem(state.name, JSON.stringify(state));
  }
}
