const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    const sql = 'SELECT * FROM `categories`';
    const [catArr, error] = await makeSqlQuery(sql);
    if (error) {
      console.log('categories get all error ===');
      return next(error);
    }
    return res.json(catArr);
  },
};
