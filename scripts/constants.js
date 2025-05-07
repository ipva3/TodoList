import { getElementByIdWithCheck } from './elements.js';

// Node elements
const formID = 'form';
const formInputID = 'form-input';
const filterAllID = 'filter-all';
const filterDoneID = 'filter-done';
const filterTodoID = 'filter-todo';
const listID = 'list';
const paginationID = 'pagination';

export const elements = {
  /** @type {HTMLFormElement} */
  form: getElementByIdWithCheck(formID),
  /** @type {HTMLInputElement} */
  formInput: getElementByIdWithCheck(formInputID),

  /** @type {HTMLButtonElement} */
  filterAll: getElementByIdWithCheck(filterAllID),
  /** @type {HTMLButtonElement} */
  filterDone: getElementByIdWithCheck(filterDoneID),
  /** @type {HTMLButtonElement} */
  filterTodo: getElementByIdWithCheck(filterTodoID),

  /** @type {HTMLUListElement} */
  taskList: getElementByIdWithCheck(listID),
  /** @type {HTMLDivElement} */
  pagination: getElementByIdWithCheck(paginationID)
};
