const express = require('express');
const { fetchBoards, createBoard, addTask, updateTask, deleteTask, getTaskCards, createList, markTaskComplete, fetchBoardById } = require('../controllers/BoardController');

const BoardRoutes = express.Router();

BoardRoutes.route("/boards")
    .get(fetchBoards)
    .post(createBoard);

BoardRoutes.route("/boards/:boardId")
    .get(fetchBoardById);

BoardRoutes.route("/tasks")
    .post(addTask);

BoardRoutes.route("/lists")
    .post(createList);

BoardRoutes.route("/lists/:listId")
    .get(getTaskCards)

BoardRoutes.route("/tasks/:id")
    .put(updateTask)
    .delete(deleteTask);

BoardRoutes.route("/task/:taskId").put(markTaskComplete);

module.exports = BoardRoutes;
