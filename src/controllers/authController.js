/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const { makeSqlQuery, makeJWTToken } = require('../helpers');
const ApiError = require('../apiError/apiError');

const login = async (req, res, next) => {
  // pasiimti email ir plain password
  const { email, password } = req.body;

  // ieskoti db customer pagal email
  const sql = 'SELECT * FROM customers WHERE email=?';
  const [rowsArr, error] = await makeSqlQuery(sql, [email]);

  if (error) {
    console.log(chalk.magentaBright('login error ==='), error);
    return next(error);
  }

  // ar radom useri
  if (rowsArr.length === 0) {
    console.log(chalk.magentaBright('user not found ==='));
    return next(new ApiError('Email was not found', 400));
  }

  // radom useri
  const foundUserInDB = rowsArr[0];

  const passwordHash = foundUserInDB.password;
  // patikrinti ar sutampa slaptazodiziai

  if (!bcrypt.compareSync(password, passwordHash)) {
    return next(new ApiError('Password or email does not match', 401));
  }
  // sekme
  console.log('foundUserInDB ===', foundUserInDB);
  const token = makeJWTToken({ email, sub: foundUserInDB.id, scope: foundUserInDB.scope });
  return res.json({
    msg: `Welcome ${foundUserInDB.firstname} ${foundUserInDB.lastname}`,
    token,
  });
};

const register = async (req, res, next) => {
  // pasiimti duomenis kuriuos gavom
  const {
    email, password, firstname, lastname,
  } = req.body;

  // console.log(chalk.magenta('req.body ===', req.body));
  console.log(chalk.magentaBright('req.body ==='), req.body);

  // bcryp passqord
  const passwordHash = bcrypt.hashSync(password, 10);

  // irasyti i db

  const sql = 'INSERT INTO `customers` (`email`, `password`, `firstname`, `lastname`) VALUES (?, ?, ?, ?)';
  const [resObj, error] = await makeSqlQuery(sql, [email, passwordHash, firstname, lastname]);

  if (error) {
    console.log(chalk.magentaBright('register error ==='), error);
    next(error);
    // new APIError('too h', status, type)
    return;
  }

  // sekmingas yrasymas
  if (resObj.affectedRows === 1) {
    res.status(201).json({
      msg: 'user created',
      id: resObj.insertId,
    });
  }

  // kai uzklausa pavyko bet affectedRows !== 1
  res.end();
};

module.exports = {
  login,
  register,
};
