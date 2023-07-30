export default class TodoComponent {
    service;
    todoUL;
    todoInput;
    addButton;
    constructor(service) {
        this.service = service;
        const template = `
                      <div id="container">
                      <h1>Todo App</h1>
                      <input id="todo-input" type="text">
                      <button id="add-button">add</button>
                      <ul id="todo-ul"></ul>
                      </div>
                      `;
        const appTodo = document.querySelector("app-todo");
        appTodo?.insertAdjacentHTML("beforeend", template);
        this.todoUL = document.querySelector("#todo-ul");
        this.addButton = document.querySelector("#add-button");
        this.todoInput = document.querySelector("#todo-input");
        this.service.getAllTodos().then((todoList) => todoList.forEach((element) => {
            this.renderItem(element);
        }));
        this.addButton.addEventListener("click", () => {
            this.service.addTodo(this.todoInput.value, false).then((newTodo) => {
                this.renderItem(newTodo);
                this.todoInput.value = "";
            });
        });
    }
    renderItem(todo) {
        const todoLi = `
        <li id="todo-${todo.id}">
            <input type="checkbox" ${todo.completed ? "checked" : ""}/>
            <label>${todo.text}</label>
            <button>x</button>
        </li>`;
        this.todoUL.insertAdjacentHTML("beforeend", todoLi);
        this.toggleCompletedHandler(todo);
        this.deleteTodoHandler(todo);
    }
    toggleCompletedHandler(todo) {
        const inp = document.querySelector(`#todo-${todo.id}>input`);
        inp?.addEventListener("click", () => {
            this.service.updateTodo(todo.id).then();
        });
    }
    deleteTodoHandler(todo) {
        const li = document.querySelector(`#todo-${todo.id}`);
        const deleteButton = document.querySelector(`#todo-${todo.id}>button`);
        deleteButton?.addEventListener("click", () => {
            this.service.deleteTodo(todo.id).then((todolist) => {
                li?.remove();
                console.log(todolist);
            });
        });
    }
}
