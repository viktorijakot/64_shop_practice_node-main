const APIError = require('../apiError/ApiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    const sql = 'SELECT * FROM `categories`';

    const [catsArr, error] = await makeSqlQuery(sql);

    if (error) {
      return next(error);
    }

    res.json(catsArr);
  },
  create: async (req, res, next) => {
    const { name } = req.body;

    const sql = 'INSERT INTO `categories` (`name`) VALUES (?)';

    const [responseObject, error] = await makeSqlQuery(sql, [name]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('Something wrong with categories creation', 400));
    }

    res.status(201).json({
      id: responseObject.insertId,
      message: 'Category created successfully',
    });
  },
  delete: async (req, res, next) => {
    const { id } = req.params;

    const sql = 'DELETE FROM `categories` WHERE id=?';

    const [responseObject, error] = await makeSqlQuery(sql, [id]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('Something wrong with category delete', 400));
    }

    res.status(200).json({
      message: 'Category deleted successfully!',
    });
  },
};
