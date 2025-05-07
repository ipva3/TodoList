import { elements } from './constants.js';
import { changeState } from './state.js';

/**
 * @typedef {import('./state.js').State} State
 * @typedef {import('./tasks.js').Task} Task
 *
 * @typedef {'all' | 'done' | 'todo'} FilterType
 */

const typeToNode = {
  all: elements.filterAll,
  done: elements.filterDone,
  todo: elements.filterTodo
};

/**
 * Set next filter
 * @param {State} state 
 * @param {FilterType} nextFilter 
 * @returns {boolean}
 */
export function setNextFilter(state, nextFilter) {
  if (state.filter === nextFilter) return false;
  changeState(state, 'filter', nextFilter);
  changeState(state, 'pagination', { ...state.pagination, page: 1 });
  return true;
}

/**
 * Set active to right filter
 * @param {State} state
 */
export function renderFilters(state) {
  for (const [type, node] of Object.entries(typeToNode)) {
    node.classList[type === state.filter ? 'add' : 'remove']('active');
  }
}

/**
 * Get filtered tasks related to current filter
 * @param {Array<Task>} tasks
 * @param {FilterType} filter
 * @returns {Array<Task>}
 */
export function getFilteredTasks(tasks, filter) {
  switch (filter) {
    case 'all':
      return tasks;

    case 'done':
      return tasks.filter(({ isCompleted }) => isCompleted);

    case 'todo':
      return tasks.filter(({ isCompleted }) => !isCompleted);

    default:
      return [];
  }
}
