// find the element
const form = document.querySelector("form");
const todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("#addButton");
const ulList = document.querySelector("#todoList");
const message = document.querySelector("#message");

// creating all function for the work

// message function
const notificationMessage = (text, status) => {
  message.textContent = text;
  message.classList.add(`message${status}`);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(`message${status}`);
  }, 800);
};

// createTodo function
const createTodo = (uniqueId, inputValue) => {
  let list = document.createElement("li");
  list.id = uniqueId;
  list.classList.add("adding-todo-style");
  list.innerHTML = `
    <span>${inputValue}</span>
     <span>
        <button class="add-todo-button" id="todoDelete">
            <i class="fa fa-trash"></i>
        </button>
    </span>
  `;

  //add list element to parent element
  ulList.appendChild(list);

  // finding delete button
  let deleteButton = list.querySelector("#todoDelete");

  // adding a listener for delete todo
  deleteButton.addEventListener("click", deleteTodo);
};

// delete Todo
const deleteTodo = (event) => {
  let deleteTodo = event.target.parentElement.parentElement.parentElement;

  ulList.removeChild(deleteTodo);

  // adding notification message
  notificationMessage("Todo Deleted", "Unsuccess");

  // deleting info in the localStorage
  const deletedTodoId = deleteTodo.id;

  let setTodos = getTodosFromLocalStorage();

  setTodos = setTodos.filter((todo) => todo.uniqueId !== deletedTodoId);

  localStorage.setItem("Todo", JSON.stringify(setTodos));
};

// deleteButtonHandler function
const deleteButtonHandler = () => {
  // adding notification message
  message.textContent = "Todo Deleted";
  message.classList.add("messageUnsuccess");
};

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("Todo")
    ? JSON.parse(localStorage.getItem("Todo"))
    : [];
};

// formHandler function
const formHandler = (event) => {
  event.preventDefault();
  let inputValue = todoInput.value;

  // create unique id for all input value
  let uniqueId = Date.now().toString();

  // adding notification message
  notificationMessage("Todo Added", "Success");

  // localStorage data
  let setTodos = getTodosFromLocalStorage();
  setTodos.push({ uniqueId, inputValue });
  localStorage.setItem("Todo", JSON.stringify(setTodos));

  // adding a function for the todo text add in list
  createTodo(uniqueId, inputValue);

  todoInput.value = "";
};

// loadTodos
const loadTodos = () => {
  let setTodos = getTodosFromLocalStorage();

  setTodos.map((todo) => createTodo(todo.uniqueId, todo.inputValue));
};

// adding a listener
form.addEventListener("submit", formHandler);
window.addEventListener("DOMContentLoaded", loadTodos);
