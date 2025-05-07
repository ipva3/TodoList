import { elements } from './constants.js';
import { createElement, getElementByIdWithCheck } from './elements.js';
import { getFilteredTasks } from './filters.js';
import { getPaginatedTasks, renderPagination } from './pagination.js';
import { changeState } from './state.js';

/**
 * @typedef {import('./state').State} State
 * @typedef {import('./filters.js').FilterType} FilterType
 * @typedef {import('./pagination.js').Pagination} Pagination
 * 
 * @typedef {Object} Task
 * @property {string} id - unique id
 * @property {string} title
 * @property {boolean} isCompleted
 * @property {boolean} isEditing
 * 
 * @typedef {'check' | 'edit' | 'remove'} ActionType
 */

/**
 * Create task
 * @param {string} title
 * @param {CreateTaskOptions} [options]
 * @returns {Task}
 * 
 * @typedef {Object} CreateTaskOptions
 * @property {boolean} [isCompleted=false]
 * @property {boolean} [isEditing=false]
 */
export function createTask(title, options = {}) {
  return {
    id: crypto.randomUUID(),
    title,
    isCompleted: options.isCompleted ?? false,
    isEditing: options.isEditing ?? false,
  };
}

/**
 * Add task to state
 * @param {State} state
 * @param {Task} task
 */
export function addTask(state, task) {
  changeState(state, 'tasks', [task, ...state.tasks])
}

/**
 * Render list of tasks
 * @param {State} state
 */
export function renderTasks(state) {
  elements.taskList.innerHTML = '';
  const tasks = getFilteredTasks(getPaginatedTasks(state.tasks, state.pagination), state.filter);
  for (const task of tasks) {
    const taskNode = createTaskNode(state, task);
    elements.taskList.appendChild(taskNode);
  }
}

/**
 * Create task for pushing to list
 * @param {State} state
 * @param {Task} task
 * @returns {HTMLLIElement}
 */
function createTaskNode(state, task) {
  const node = createElement('li', {
    id: task.id,
  });

  //* Title task node
  const titleNode = createTitle(task);

  //* Check task action node
  const checkActionNode = createActionNode('check', () => {
    const tasks = state.tasks.map((t) => {
      if (t.id !== task.id) return t;
      return { ...t, isCompleted: !task.isCompleted };
    });
    changeState(state, 'tasks', tasks);
    renderPagination(state);
    renderTasks(state);
  });

  //* Edit task action node
  const editActionNode = createActionNode('edit', () => {
    const taskNode = getElementByIdWithCheck(task.id);
    const taskTitle = (() => {
      if (task.isEditing) {
        const title = taskNode.firstElementChild.value.trim();
        return title ? title : task.title;
      }
      return task.title;
    })()
    const tasks = state.tasks.map((t) => {
      if (t.id !== task.id) return t;
      return { ...t, title: taskTitle, isEditing: !task.isEditing };
    });
    changeState(state, 'tasks', tasks);
    renderPagination(state);
    renderTasks(state);
  });

  //* Remove task action node
  const removeActionNode = createActionNode('remove', () => {
    const tasks = state.tasks.filter((t) => t.id !== task.id);
    changeState(state, 'tasks', tasks);
    renderPagination(state);
    renderTasks(state);
  });

  node.appendChild(titleNode);
  node.appendChild(checkActionNode);
  node.appendChild(editActionNode);
  node.appendChild(removeActionNode);

  return node;
}

/**
 * Create title node for task node
 * @param {Task} task
 * @return {HTMLSpanElement}
 */
function createTitle({ title, isEditing, isCompleted }) {
  const tagName = isEditing ? 'input' : 'span';

  const node = createElement(tagName, {
    className: 'task__title'
  });

  if (isCompleted) {
    node.classList.add('completed');
  }

  if (isEditing) {
    node.value = title;
  } else {
    node.innerText = title;
  }

  return node;
}

/**
 * Create template action button
 * @param {ActionType} type
 * @param {() => void} action
 */
function createActionNode(type, action) {
  const node = createElement('button', {
    className: 'task__action'
  });
  node.onclick = action;

  const iconNode = createElement('img', {
    className: 'task__icon'
  });
  iconNode.src = `./img/${type}.png`;
  iconNode.alt = `${type}`;
  node.appendChild(iconNode);

  return node;
}

