const express = require('express');

const itemRouter = express.Router();

const itemsController = require('../controllers/itemsController');

// routes

// GET ALL items route /api/items
itemRouter.get('/items', itemsController.getAll);

module.exports = itemRouter;
