import LocalService from "./LocalService.js";
import TodoComponent from "./ToDoComponent.js";
document.addEventListener("DOMContentLoaded", () => {
    const localService = new LocalService();
    const todoApp = new TodoComponent(localService);
});
