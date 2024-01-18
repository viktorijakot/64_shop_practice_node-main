const express = require('express');

const categoryRouter = express.Router();

const categoryController = require('../controllers/categoryController');

categoryRouter.get('/categories', categoryController.getAll);

module.exports = categoryRouter;
