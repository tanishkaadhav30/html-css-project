const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskCount = document.querySelector('#task-count');
const themeToggle = document.querySelector('#theme-toggle');
const dateLabel = document.querySelector('#date-label');

let tasks = JSON.parse(localStorage.getItem('daily-focus-tasks')) || [
  { id: 1, text: 'Plan one meaningful thing for today', completed: false },
  { id: 2, text: 'Take a moment to appreciate your progress', completed: false }
];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('daily-focus-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  taskList.innerHTML = visibleTasks.map((task) => `
    <li class="task-item ${task.completed ? 'completed' : ''}">
      <button class="check-button" type="button" data-action="toggle" data-id="${task.id}" aria-label="Mark task as ${task.completed ? 'open' : 'completed'}"></button>
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="delete-button" type="button" data-action="delete" data-id="${task.id}" aria-label="Delete task">×</button>
    </li>
  `).join('');

  const openTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${openTasks} ${openTasks === 1 ? 'task' : 'tasks'} left`;
  emptyState.hidden = visibleTasks.length > 0;
}

function escapeHtml(text) {
  return text.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  }[character]));
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.unshift({ id: Date.now(), text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
});

taskList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === 'toggle') {
    tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
  } else if (button.dataset.action === 'delete') {
    tasks = tasks.filter((task) => task.id !== id);
  }
  saveTasks();
  renderTasks();
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderTasks();
  });
});

themeToggle.addEventListener('click', () => {
  const isDark = document.body.dataset.theme === 'dark';
  document.body.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.textContent = isDark ? '☾' : '☀';
  localStorage.setItem('daily-focus-theme', document.body.dataset.theme);
});

const savedTheme = localStorage.getItem('daily-focus-theme');
if (savedTheme === 'dark') {
  document.body.dataset.theme = 'dark';
  themeToggle.textContent = '☀';
}
dateLabel.textContent = new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(new Date());
renderTasks();
