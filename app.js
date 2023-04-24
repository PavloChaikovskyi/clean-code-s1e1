const taskInput = document.getElementById("newTask");
const addButton = document.getElementById("btnAdd");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completedTasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.classList.add("task__row");
  
  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task__label";
  
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox input__checkbox";
  
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task__input";
  
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "button btn__edit";
  
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("delete__img");
  deleteButtonImg.setAttribute("alt", "");
  deleteButtonImg.src = "./remove.svg";
  
  const deleteButton = document.createElement("button");
  deleteButton.className = "button btn__delete";
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".btn__edit");
  const containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".input__checkbox");
  const editButton = taskListItem.querySelector(".btn__edit");
  const deleteButton = taskListItem.querySelector(".btn__delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
