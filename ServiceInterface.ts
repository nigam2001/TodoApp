import Todo from "./Todo"

export default interface ServiceInterface{

    addTodo(text : string, completed : boolean) : Promise<Todo>
    getAllTodos() : Promise<Todo[]>
    getTodo(id : number) : Promise<Todo>
    updateTodo(id : number) : Promise<Todo>
    deleteTodo(id  : number) : Promise<Todo>
}