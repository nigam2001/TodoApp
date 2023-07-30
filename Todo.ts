export default class Todo {
  static lastId : number = 0;
  public id : number
  constructor(public text : string, public completed = false) {
    this.id = ++Todo.lastId;
  }
}
