const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createTaskListItem = function (taskText) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  // Keep task text as text instead of interpreting it as HTML.
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskListItem(newTaskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

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
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

function taskCompleted() {
  const taskItem = this.parentNode;
  completedList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
}

function taskIncomplete() {
  const taskItem = this.parentNode;
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
}

addTaskButton.addEventListener('click', addTask);

function bindTaskEvents(taskListItem, checkboxChangeHandler) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxChangeHandler;
}

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], taskCompleted);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], taskIncomplete);
}
