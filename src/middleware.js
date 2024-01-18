/* eslint-disable import/no-unresolved */
const ApiError = require('./apiError/apiError');

const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  // patikrinti ar atejo api klaida
  if (errorGot instanceof ApiError) {
    return res.status(errorGot.status).json({ error: errorGot.message });
  }

  if (errorGot?.code === 'ER_DUP_ENTRY') {
    // email jau egzistuoja
    return res.status(400).json({
      error: 'email already taken',
    });
  }

  return res.status(500).json({
    error: 'System errror',
  });
};

const validateItemBody = async (req, res, next) => {

};

const validateToken = async (req, res, next) => {

};

module.exports = {
  mainErrroHandler,
  validateItemBody,
  validateToken,
};
