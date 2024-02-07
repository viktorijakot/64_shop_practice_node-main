/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const bcrypt = require('bcryptjs');
const { makeSqlQuery, makeJWTToken } = require('../helpers');
const APIError = require('../apiError/ApiError');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM customers WHERE email=?';
  const [rowsArr, error] = await makeSqlQuery(sql, [email]);

  if (error) {
    return next(error);
  }

  if (rowsArr.length === 0) {
    return next(new APIError('Email not found', 400));
  }

  const foundUserInDB = rowsArr[0];

  const passHash = foundUserInDB.password;

  if (!bcrypt.compareSync(password, passHash)) {
    return next(new APIError('pass or email not match (pass no match)', 401));
  }

  const token = makeJWTToken({ email: foundUserInDB.email, userId: foundUserInDB.id, scope: foundUserInDB.scope });
  res.json({
    message: `Welcome ${foundUserInDB.firstname} ${foundUserInDB.lastname}!`,
    token,
  });
  console.log('token ===', token);
};

const register = async (req, res, next) => {
  const {
    firstname, lastname, email, password,
  } = req.body;

  const salt = process.env.SALT || 5;
  const passwordHash = bcrypt.hashSync(password, +salt);

  const sql = 'INSERT INTO `customers` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ? ,?)';
  const [resObj, error] = await makeSqlQuery(sql, [firstname, lastname, email, passwordHash]);

  if (error) {
    return next(error);
  }

  if (resObj.affectedRows === 1) {
    res.status(201).json({
      message: 'User created successfully',
      id: resObj.insertId,
    });
  }

  res.end();
};

module.exports = {
  login,
  register,
};
