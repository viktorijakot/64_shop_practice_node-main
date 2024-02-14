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
      msg: 'Category created successfully',
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
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE categories SET name=? WHERE id=?';

    const [resObj, error] = await makeSqlQuery(sql, [name, id]);
    if (error) {
      console.log(' update item error ===', error);
      return next(error);
    }
    // if (resObj.affectedRows === 1) {
    //   return res.json({ msg: `student with id ${studentId} was updated` });
    // }
    // return res.status(201).json({
    //   id: resObj.insertId,
    //   msg: 'success',
    // });
    if (resObj.affectedRows !== 1) {
      return next(new APIError('something went wrong in update', 400));
    }

    res.status(201).json({
      id,
      msg: `Category with id:${id} updated successfully`,
    });
  },
  single: async (req, res, next) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM categories WHERE id=?';

    const [itemArr, error] = await makeSqlQuery(sql, [id]);

    if (error) {
      console.log('error GET SINGLE student table ===');
      return next(error);
    }
    if (itemArr.length === 0) {
      return res.json('there is no such a student');
    }
    return res.json(itemArr[0]);
  },
};
