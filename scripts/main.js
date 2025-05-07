// @ts-check
'use-strict';

import { createState } from './state.js';
import { elements } from './constants.js';
import { renderFilters, setNextFilter } from './filters.js';
import { getFormValue, resetFormValue } from './form.js';
import { addTask, createTask, renderTasks } from './tasks.js';
import { renderPagination } from './pagination.js';

const state = createState(
  'store',
  {
    tasks: [],
    filter: 'all',
    pagination: {
      perPage: 5,
      page: 1
    },
  },
  {
    isPersistent: true
  }
);

//* Init all states
(function () {
  renderFilters(state);
  renderPagination(state);
  renderTasks(state);
})();

//* Form actions
elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = getFormValue();
  if (!title) return;
  addTask(state, createTask(title));
  renderPagination(state);
  renderTasks(state);
  resetFormValue();
});

//* Filters
elements.filterAll.addEventListener('click', () => {
  if (!setNextFilter(state, 'all')) return;
  renderFilters(state);
  renderPagination(state);
  renderTasks(state);
});
elements.filterDone.addEventListener('click', () => {
  if (!setNextFilter(state, 'done')) return;
  renderFilters(state);
  renderPagination(state);
  renderTasks(state);
});
elements.filterTodo.addEventListener('click', () => {
  if (!setNextFilter(state, 'todo')) return;
  renderFilters(state);
  renderPagination(state);
  renderTasks(state);
});
