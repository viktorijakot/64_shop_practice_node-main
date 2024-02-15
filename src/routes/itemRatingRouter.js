const express = require("express");

const itemRatingsRouter = express.Router();
const itemRatingsController = require("../controllers/itemRatingsController");

// routes

// POST /api/item-ratings - create
itemRatingsRouter.post("/item-ratings", itemRatingsController.add);

itemRatingsRouter.get(
  "/item-ratings/customer/:customerId",
  itemRatingsController.getByCustomer
);

module.exports = itemRatingsRouter;
