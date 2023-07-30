import ServiceInterface from "./ServiceInterface.js";
import Todo from "./Todo.js";

export default class LocalService implements ServiceInterface {
  private todoList: Todo[] = [];

  constructor() {
    this.loadTodoList();
  }

  async addTodo(text: string, completed: boolean): Promise<Todo> {
    const todo = new Todo(text, completed);
    this.todoList.push(todo);
    this.saveTodoList();
    return todo
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoList;
  }

  async getTodo(id: number): Promise<Todo> {
    return this.todoList.find((elem) => elem.id == id)!;
  }

  async updateTodo(id: number): Promise<Todo> {
    const found: Todo = this.todoList.find((elem) => elem.id == id)!;
    if (found) found.completed = !found.completed;
    this.saveTodoList();
    return found;
  }

  async deleteTodo(id: number): Promise<Todo> {
    const found: Todo = this.todoList.find(elem => elem.id == id)!;
    this.todoList = this.todoList.filter((elem) => elem.id != id);
    this.saveTodoList();
    return found;
  }
  saveTodoList() {
    localStorage.setItem("todo-list", JSON.stringify(this.todoList));
  }
  loadTodoList() {
    const todoList = JSON.parse(localStorage.getItem("todo-list") ?? "[]");
    Todo.lastId = todoList[todoList.length - 1]?.id ?? 0;
    console.log(todoList);
    //this.todoList.forEach((todo) => this.renderItem(todo));
    return todoList;
  }
}
