const express = require('express');

const categoriesRouter = express.Router();

const categoriesController = require('../controllers/categoryController');

// routes
// GET /categories
categoriesRouter.get('/categories', categoriesController.getAll);

categoriesRouter.get('/categories/:id', categoriesController.single);

// POST /categories
categoriesRouter.post('/categories', categoriesController.create);

// DELETE /categories/:id
categoriesRouter.delete('/categories/:id', categoriesController.delete);

categoriesRouter.put('/categories/:id', categoriesController.update);

module.exports = categoriesRouter;
