/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
const ApiError = require('../apiError/apiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    // sukuriam sql
    const sql = 'SELECT `i`.*, `c`.name AS `category_name`, AVG(`ir`.`rating`) AS `average_rating`, COUNT(`ir`.`item_id`) as `rating_count` '
    + 'FROM `items` as `i` '
    + 'LEFT JOIN `categories` AS c ON `i`.`cat_id`  = `c`.`id` '
    + 'LEFT JOIN `item_ratings` AS ir ON `ir`.`item_id`  = `i`.`id` '
    + 'WHERE `i`.`isDeleted` = 0 '
    + 'GROUP BY `i`.`id`';

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
  updateRating: async (req, res, next) => {
    const { itemId } = req.params;

    const { rating } = req.body;

    const sql = 'UPDATE `items` SET `rating` = ? WHERE `id` = ?';
    const [responseObject, error] = await makeSqlQuery(sql, [rating, itemId]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new ApiError('Something wrong with item rating update', 400));
    }

    res.status(200).json({
      id: itemId,
      msg: `Item with id: ${itemId} rating updated successfully`,
    });
  },
  create: async (req, res, next) => {
    const {
      title, description, price, rating, stock, cat_id, img_url,
    } = req.body;

    const argArr = [title, description ?? null, price, rating ?? 0, stock, cat_id, img_url ?? ''];
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
      msg: 'Item created successfully',
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
      msg: 'Item deleted successfully',
    });
  },
  update: async (req, res, next) => {
    const { itemId } = req.params;

    const {
      title, cat_id, description, price, img_url, rating, stock,
    } = req.body;

    const sql = 'UPDATE `items` '
        + 'SET `title` = ?, `cat_id` = ?, `description` = ?, `price` = ?, `img_url` = ?, `rating` = ?, `stock` = ? '
        + 'WHERE `id` = ?';

    const [responseObject, error] = await makeSqlQuery(sql, [
      title,
      cat_id,
      description,
      price,
      img_url,
      rating,
      stock,
      itemId,
    ]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new ApiError('Something wrong with item edit', 400));
    }

    res.status(200).json({
      id: itemId,
      msg: `Item with id: ${itemId} updated successfully`,
    });
  },
};
