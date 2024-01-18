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
  getSingle: async (req, res, next) => {},
  create: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
