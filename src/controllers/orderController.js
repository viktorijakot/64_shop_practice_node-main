module.exports = {
  getSingleUser: async (req, res, next) => {
    res.json('veikia');
  },
  getAll: async (req, res, next) => {
    res.json('veikia');
  },
  create: async (req, res, next) => {
    const {
      id, item_id, customer_id, qty, total,
    } = req.body;
    console.log('req.body ===', req.body);
    res.json(req.body);
  },
};
