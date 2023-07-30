import SessionInterface from "./ServiceInterface"
import Todo from "./Todo";
export default class TodoComponent {
  
  private todoUL : HTMLUListElement;
  private todoInput : HTMLInputElement;
  private addButton : HTMLButtonElement;

  constructor(private service : SessionInterface) {

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

    this.todoUL = document.querySelector("#todo-ul")!;
    this.addButton = document.querySelector("#add-button")!;
    this.todoInput = document.querySelector("#todo-input")!;
    

    this.service.getAllTodos().then((todoList) =>
      todoList.forEach((element) => {
        this.renderItem(element);
      })
    );

    this.addButton.addEventListener("click", () => {
      this.service.addTodo(this.todoInput.value, false).then((newTodo) => {
        this.renderItem(newTodo);
        this.todoInput.value = "";
      });
    });
  }

  renderItem(todo : Todo) {
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
  
  toggleCompletedHandler(todo : Todo) {
    const inp = document.querySelector(`#todo-${todo.id}>input`);
    inp?.addEventListener("click", () => {
      this.service.updateTodo(todo.id).then();
    });
  }

  deleteTodoHandler(todo : Todo) {
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
