/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
const ApiError = require('../apiError/apiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    // sukuriam sql
    const sql = 'SELECT * FROM `items` WHERE isDeleted=0';

    // makeSqlQuery
    const [itemsArr, error] = await makeSqlQuery(sql);

    // grazinam klaida
    if (error) {
      console.log('error getAll items error ===');
      return next(error);
    }

    // grazinam items
    return res.json(itemsArr);
  },
  getSingle: async (req, res, next) => {
    const { itemId } = req.params;
    // sukuriam sql
    const sql = 'SELECT * FROM `items` WHERE id=?';

    // makeSqlQuery
    /** @type {[Array, Object]} */
    const [itemsArr, error] = await makeSqlQuery(sql, [itemId]);

    // grazinam klaida
    if (error) {
      console.log('error getAll items error ===');
      return next(error);
    }
    // jeigu nera tokio id itemo
    if (itemsArr.length === 0) {
      return next(new ApiError('Post was not found', 404));
    }
    // grazinam item
    return res.json(itemsArr[0]);
  },
  create: async (req, res, next) => {
    const {
      title, description, price, rating, stock, cat_id, img_url,
    } = req.body;

    const argArr = [title, description, price, rating, stock, cat_id, img_url];
    const sql = `INSERT INTO items (title, description, price, rating, stock, cat_id, img_url) 
    VALUES (?,?,?,?,?,?,?)`;

    const [resObj, error] = await makeSqlQuery(sql, argArr);

    if (error) {
      console.log(' create item error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      console.log('create item no rows affected', resObj);
      return next(new ApiError('something went wrong', 400));
    }

    return res.status(201).json({
      id: resObj.insertId,
      msg: 'success',
    });
  },
  delete: async (req, res, next) => {
    const { itemId } = req.params;
    const sql = 'UPDATE `items` SET isDeleted=1 WHERE id=? LIMIT 1';
    const [resObj, error] = await makeSqlQuery(sql, [itemId]);

    if (error) {
      console.log(' create item error ===', error);
      return next(error);
    }

    if (resObj.changedRows !== 1) {
      console.log('delete item no rows changed', resObj);
      return next(new ApiError('something went wrong', 400));
    }

    return res.status(200).json({
      msg: 'Success',
    });
  },
};
