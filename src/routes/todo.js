const express = require("express")
const { getTodo, getAllTodos, createTodo, updateTodo, deleteTodo, searchTodo } = require("../controller/todos")

const router = express.Router()

router.get("/", getAllTodos)
router.get("/:id", getTodo)
router.post("/", createTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)
router.get("/search/:query", searchTodo);


module.exports.todoRoute = router