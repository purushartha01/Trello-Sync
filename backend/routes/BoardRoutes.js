const express = require('express');

const BoardRoutes = express.Router();

BoardRoutes.route("/boards").post();

BoardRoutes.route("/tasks").post();

BoardRoutes.route("/tasks/:id")
    .put()
    .delete();


module.exports = BoardRoutes;
