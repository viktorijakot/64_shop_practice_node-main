const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

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

module.exports = {
  mainErrroHandler,
};
