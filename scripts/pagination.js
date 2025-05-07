import { elements } from './constants.js';
import { createElement } from './elements.js';
import { getFilteredTasks } from './filters.js';
import { changeState } from './state.js';
import { renderTasks } from './tasks.js';

/**
 * @typedef {import('./state.js').State} State
 * @typedef {import('./tasks.js').Task} Task
 * 
 * @typedef {Object} Pagination
 * @property {number} perPage
 * @property {number} page
 */

/**
 * Creaete pagination buttons
 * @param {State} state 
 */
export function renderPagination(state) {
  recalculatePagination(state);
  const tasks = getFilteredTasks(state.tasks, state.filter);
  const pageCount = Math.ceil(tasks.length / state.pagination.perPage);

  elements.pagination.innerHTML = '';
  for (let page = 1; page <= pageCount; ++page) {
    const pageButton = createPageButton(state, page);
    elements.pagination.appendChild(pageButton);
  }
}

/**
 * Get paginated tasks related to current page
 * @param {Array<Task>} tasks
 * @param {Pagination} pagination
 * @returns {Array<Task>}
 */
export function getPaginatedTasks(tasks, pagination) {
  const startIndex = (pagination.page - 1) * pagination.perPage;
  const endIndex = startIndex + pagination.perPage;
  return tasks.slice(startIndex, endIndex);
}

/**
 * Create page button to move on
 * @param {State} state
 * @param {number} pageNumber
 */
function createPageButton(state, pageNumber) {
  const isActive = state.pagination.page === pageNumber;
  const node = createElement('button', {
    className: isActive ? 'active' : undefined
  });
  node.innerText = String(pageNumber);
  node.onclick = () => {
    changeState(state, 'pagination', { ...state.pagination, page: pageNumber });
    renderPagination(state);
    renderTasks(state);
  };
  return node;
}

/**
 * Recalculate pagination for current number of tasks and page
 * @param {State} state
 */
function recalculatePagination(state) {
  const tasksLength = getFilteredTasks(state.tasks, state.filter).length;
  const maxPageNumber = Math.max(Math.ceil(tasksLength / state.pagination.perPage), 1);
  if (state.pagination.page > maxPageNumber) {
    changeState(state, 'pagination', { ...state.pagination, page: maxPageNumber });
  }
}
