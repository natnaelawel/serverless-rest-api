const db = require("../db/todo");

const getAllTodos = async (req, res, next) => {
  try {
    const result = await db.getTodos();
    console.log("result is ", result);
    return res.json(result);
  } catch (error) {
    console.log("there is an error", error);
    res.json({ message: "there is an error" });
  }
};

const getTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await db.getTodo(id);
    return res.status(200).json(result);
  } catch (error) {
    res.json({
      message: "",
    });
  }
};

const createTodo = async (req, res, next) => {
  console.log("body is ", req.body);
  const { title, note, due_date } = req.body;
  try {
    const todo = await db.createTodo(title, note, due_date);
    return res.status(200).json(todo);
  } catch (error) {
    console.error("there is an error", error);
    return res.status(500).json({ message: "there is an error" });
  }
};

const updateTodo = async (req, res, next) => {
  const id = req.params.id;
  const { title, note, due_date } = req.body;
  try {
    const todo = await db.updateTodo(id, title, note, due_date);
    return res.status(200).json(todo);
  } catch (error) {
    console.error("there is an error");
    return res.status(500).json({ message: "there is an error" });
  }
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await db.deleteTodo(id);
    return res.status(201).json(todo);
  } catch (error) {
      console.log('the error is ', error)
    return res.status(500).json({ message: "there is an error" });
  }
};

const searchTodo = async (req, res, next) => {
  const searchQuery = req.params.query;
  try {
    const todo = await db.searchTodo(searchQuery);
    return res.status(201).json(todo);
  } catch (error) {
    console.log("the error is ", error);
    return res.status(500).json({ message: "there is an error" });
  }
};



module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodo
};
