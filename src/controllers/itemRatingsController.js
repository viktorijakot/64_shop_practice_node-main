const APIError = require('../apiError/ApiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  add: async (req, res, next) => {
    const { item_id, customer_id, rating } = req.body;

    const sql = 'INSERT INTO `item_ratings` (`item_id`,`customer_id`, `rating`) VALUES (?, ?, ?)';

    const [responseObject, error] = await makeSqlQuery(sql, [item_id, customer_id, rating]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('Something wrong with item rating create', 400));
    }

    res.status(201).json({
      id: responseObject.insertId,
      message: 'Item rating successfully added!',
    });
  },
  getByCustomer: async (req, res, next) => {
    const { customerId } = req.params;

    const sql = 'SELECT `item_id`, `rating` FROM `item_ratings` WHERE `customer_id` = ?';

    const [responseObject, error] = await makeSqlQuery(sql, [customerId]);

    if (error) {
      return next(error);
    }

    res.json(responseObject);
  },
};
