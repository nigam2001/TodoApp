import Todo from "./Todo.js";
export default class RemoteService {
  url = "http://localhost:11000";

  async getAllTodos() : Promise<Todo[]> {
    const response = await fetch(this.url);
    const data = await response.json();
    console.log(data);
    return data;
  }
  async addTodo(text : string, completed : boolean) : Promise<Todo> {
    const response = await fetch(this.url, {
      method: "post",
      body: JSON.stringify(new Todo(text, completed)),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
  async updateTodo(id : number) : Promise<Todo> {
    const response = await fetch(this.url + "/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
  async deleteTodo(id : number) : Promise<Todo>{
    const response = await fetch(this.url + "/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
}
