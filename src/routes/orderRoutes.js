const express = require('express');

const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/orders', orderController.getAll);

orderRouter.get('/orders/user/:userId', orderController.getSingleUser);

orderRouter.post('/orders', orderController.create);

module.exports = orderRouter;
// GET orders by users /api/orders/user/5 - grazintu visus 5 userio orderius

// GET all orders /api/orders/ - grazina visus u=sakymus - autorizuotasm protected

// POST /api/orders - paduoti visa reikalinga info, kad sukurti orderi
