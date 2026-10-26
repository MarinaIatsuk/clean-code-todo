const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');
const todoApp = document.querySelector('.todo-app');

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  deleteButton.append(deleteIcon);

  return deleteButton;
}

const createTaskListItem = function (taskText) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  // Keep task text as text instead of interpreting it as HTML.
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  taskItem.append(checkbox, label, editInput, editButton, createDeleteButton());
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskListItem(newTaskInput.value);

  todoList.appendChild(taskItem);

  newTaskInput.value = '';
};

function toggleTaskEditMode(taskItem) {
  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
}

function handleTaskListClick(event) {
  const taskItem = event.target.closest('li');
  if (!taskItem) return;

  if (event.target.closest('button.edit')) {
    toggleTaskEditMode(taskItem);
  } else if (event.target.closest('button.delete')) {
    taskItem.remove();
  }
}

function handleTaskCompletion(event) {
  const checkbox = event.target;
  if (!checkbox.matches('input[type="checkbox"]')) return;

  const taskItem = checkbox.closest('li');
  if (!taskItem) return;

  const destinationList = checkbox.checked ? completedList : todoList;
  destinationList.append(taskItem);
}

addTaskButton.addEventListener('click', addTask);
todoApp.addEventListener('click', handleTaskListClick);
todoApp.addEventListener('change', handleTaskCompletion);
