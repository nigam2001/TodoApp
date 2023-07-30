export default class Todo {
    text;
    completed;
    static lastId = 0;
    id;
    constructor(text, completed = false) {
        this.text = text;
        this.completed = completed;
        this.id = ++Todo.lastId;
    }
}
