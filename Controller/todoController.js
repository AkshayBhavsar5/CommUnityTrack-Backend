const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todo = require("../db/models/todo");
const catchAsyncError = require("../middlewares/catchAsyncError");
const AppError = require("../middlewares/appError");

const todoBoard = express();

todoBoard.use(cors());
todoBoard.use(bodyParser.json());

// create todo
const createTodo = catchAsyncError(async (req, res) => {
  //   const { title, column } = req.body;
  const body = req.body;

  const addTodo = await todo.create({
    title: body.title,
    column: body.column,
  });
  try {
    res.status(201).json({
      status: "success",
      message: "todo created ",
      addTodo,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all todo
const getTodo = catchAsyncError(async (req, res) => {
  const todos = await todo.findAll();
  try {
    return res.status(201).json({
      status: "success",
      message: "get all todo",
      todos,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update todo

const editTodo = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { title, column } = req.body;

  try {
    const todos = await todo.findByPk(id);
    if (!todos) {
      return res.status(400).json({
        error: "todo can't found",
      });
    }
    await todos.update({ title, column });
    return res.status(201).json({
      status: "success",
      message: "todo updated successfully ",
      todos,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const deleteTodo = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await todo.findByP(id);
    if (!todos) {
      return res.status(404).json({
        error: "todo can't found",
      });
    }
    await todos.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { createTodo, getTodo, editTodo, deleteTodo };
