import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

var todoList = [
  { id: 1, text: "buy paneer", completed: false },
  { id: 2, text: "buy laptop", completed: false },
];

app.post("/", (req, res) => {
  const body = req.body;
  const lastId = todoList.at(-1)?.id + 1 ?? 1;
  console.log(body.completed);
  const todo = {
    id: lastId,
    text: body.text,
    completed: body.completed.toLowerCase == "false" ? false : true,
  };
  todoList.push(todo);
  console.log("post", todoList);
  res.send(todo);
});

app.get("/", (req, res) => {
  console.log("get", todoList);
  res.send(todoList);
});

app.get("/:id", (req, res) => {
  const found = todoList.find((elem) => elem.id == req.params.id);
  if (found) res.send(found);
  else res.status(404).send(req.params.id + " was not found");
});

app.put("/:id", (req, res) => {
  const found = todoList.find((elem) => elem.id == req.params.id);
  if (found) {
    found.completed = !found.completed;
    console.log("put", todoList);
    res.send(found);
  } else res.status(404).send(req.params.id + " was not found");
});
app.delete("/:id", (req, res) => {
  todoList = todoList.filter((elem) => elem.id != req.params.id);
  console.log("delete", todoList);
  res.send(todoList);
});
app.listen(11000, () => console.log("toDo app is running"));
