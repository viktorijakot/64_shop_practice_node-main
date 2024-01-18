const ApiError = require('../apiError/apiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    // sukuriam sql
    const sql = 'SELECT * FROM `items`';

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
  create: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
