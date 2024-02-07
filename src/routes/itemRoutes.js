const express = require('express');

const itemRouter = express.Router();

const itemsController = require('../controllers/itemsController');
const { validateItemBody, validateToken } = require('../middleware');

// routes

// GET ALL items route /api/items
itemRouter.get('/items', itemsController.getAll);

// GET single item route /api/items/:itemId
itemRouter.get('/items/:itemId', itemsController.getSingle);

// POST single item route /api/items
itemRouter.post('/items', validateToken, validateItemBody, itemsController.create);

// DELETE single item route /api/items/:itemId
itemRouter.delete('/items/:itemId', validateToken, itemsController.delete);

module.exports = itemRouter;
