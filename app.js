var taskInput = document.querySelector("#newTask");
var addButton = document.querySelector("#btnAdd");
var incompleteTaskHolder = document.getElementById("incompleteTasks");
var completedTasksHolder = document.getElementById("completedTasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.classList.add("task__row");

  deleteButtonImg.classList.add("delete__img");
  deleteButtonImg.setAttribute("alt", "");

  label.innerText = taskString;
  label.className = "task__label";

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox input__checkbox";

  editInput.type = "text";
  editInput.className = "task__input";

  editButton.innerText = "Edit";
  editButton.className = "button btn__edit";

  deleteButton.className = "button btn__delete";
  deleteButtonImg.src = "./remove.svg";
  
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task__input");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".btn__edit");
  var containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".input__checkbox");
  var editButton = taskListItem.querySelector(".btn__edit");
  var deleteButton = taskListItem.querySelector(".btn__delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
