const dbConfig = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('genreateJWTToken no secret');

// console.log(jwtSecret);
// patikrinam ar veikia
// console.log(dbConfig);

module.exports = {
  dbConfig,
  jwtSecret,
};
