const ApiError = require('../apiError/ApiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  getSingleUser: async (req, res, next) => {
    const { userId } = req.body;

    const sql = `SELECT posts.post_id, posts.title, posts.author, users.email AS userEmail, posts.content, posts.date, COUNT(post_comments.comm_id) AS commentCount,
    categories.title AS categoryName
    FROM posts
    JOIN categories
    ON posts.cat_id=categories.cat_id
    LEFT JOIN post_comments
    ON post_comments.post_id=posts.post_id
    LEFT JOIN users
    ON users.id=posts.user_id
    WHERE posts.post_id=?
    GROUP BY posts.post_id`;
  },
  getAll: async (req, res, next) => {
    res.json('veikia');
  },
  create: async (req, res, next) => {
    const { item_id, customer_id } = req.body;

    const sql = 'INSERT INTO `orders` (`item_id`, `customer_id`, `qty`, `total`) VALUES (?, ?, ?, ?)';

    const [responseObject, error] = await makeSqlQuery(sql, [
      item_id,
      customer_id,
      1,
      70,
    ]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next(new ApiError('something went wrong', 400));
    }

    res.status(201).json({
      id: responseObject.insertId,
      message: 'Order created successfully',
    });
  },
};
