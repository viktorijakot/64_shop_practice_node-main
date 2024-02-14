/* eslint-disable import/no-extraneous-dependencies */
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('./config');

async function makeSqlQuery(sql, argArr = []) {
  let connection;
  try {
    // prisijungiam
    connection = await mysql.createConnection(dbConfig);
    // atlikti veiksma
    const [rows] = await connection.execute(sql, argArr);
    return [rows, null];
  } catch (error) {
    // console.warn('getSqlData', error);
    return [null, error];
  } finally {
    // atsijungiam
    if (connection) connection.end();
    // connection?.end();
    console.log('after connection end');
  }
}

function makeJWTToken(data) {
  if (!jwtSecret) throw new Error('no secret provided');
  return jwt.sign(data, jwtSecret, { expiresIn: '1h' });
}
function parseJWTToken(token) {
  if (!jwtSecret) throw new Error('no secret provided');

  return jwt.decode(token);
}
module.exports = {
  makeSqlQuery,
  makeJWTToken,
  parseJWTToken,
};
