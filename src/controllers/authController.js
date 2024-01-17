/* eslint-disable import/no-extraneous-dependencies */

const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const { makeSqlQuery } = require('../helpers');

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
    return next({ error: 'user not found' });
  }

  // radom useri

  // patikrinti ar sutampa slaptazodiziai

  const foundUser = rowsArr[0];

  if (!bcrypt.compareSync(password, foundUser.password)) {
    return next({ error: 'Email or password do not match' });
  }
  return res.status(200).json({ msg: 'Successful login' });
};
const register = async (req, res, next) => {
  // pasiimti duomenis kuriuos gavom
  const { email, password } = req.body;

  // console.log(chalk.magenta('req.body ===', req.body));
  console.log(chalk.magentaBright('req.body ==='), req.body);

  // bcryp passqord
  const passwordHash = bcrypt.hashSync(password, 10);

  // irasyti i db

  const sql = 'INSERT INTO `customers` (`email`, `password`) VALUES (?, ?)';
  const [resObj, error] = await makeSqlQuery(sql, [email, passwordHash]);

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
