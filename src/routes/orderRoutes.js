const express = require('express');

const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

// orderRouter.get('/orders', orderController.getAll);

// orderRouter.get('/orders/user/:userId', orderController.getSingleUser);

// orderRouter.post('/orders', orderController.create);
orderRouter.get('/orders/:id', orderController.getSingle);

// GET /api/orders/ - grazina visus uzsakymus autorizuotas
orderRouter.get('/orders', orderController.getAll);

// POST /api/orders - paduoti visa reikalinga info kad sukurti orderi
orderRouter.post('/orders', orderController.create);

// DELETE /api/orders/:id - ištrina užsakyma pagal nurodyta ID
orderRouter.delete('/orders/:id', orderController.delete);

module.exports = orderRouter;
// GET orders by users /api/orders/user/5 - grazintu visus 5 userio orderius

// GET all orders /api/orders/ - grazina visus u=sakymus - autorizuotasm protected

// POST /api/orders - paduoti visa reikalinga info, kad sukurti orderi
