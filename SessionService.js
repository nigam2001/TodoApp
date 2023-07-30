import Todo from "./Todo.js";
export default class SessionService {
    todoList = [];
    constructor() {
        this.todoList = this.loadTodoList();
    }
    async addTodo(text, completed) {
        const todo = new Todo(text, completed);
        this.todoList.push(todo);
        this.saveTodoList();
        return todo;
    }
    async getAllTodos() {
        return this.todoList;
    }
    async getTodo(id) {
        return this.todoList.find((elem) => elem.id == id);
    }
    async updateTodo(id) {
        const found = this.todoList.find((elem) => elem.id == id);
        if (found)
            found.completed = !found.completed;
        this.saveTodoList();
        return found;
    }
    async deleteTodo(id) {
        const found = this.todoList.find(elem => elem.id == id);
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
        return todoList;
    }
}
