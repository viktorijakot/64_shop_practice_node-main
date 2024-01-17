const mysql = require('mysql2/promise');

const { dbConfig } = require('./config');

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

module.exports = {
  makeSqlQuery,
};
