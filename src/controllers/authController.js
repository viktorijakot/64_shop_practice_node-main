const login = async (req, res, next) => {
  res.json('login ing');
};
const register = async (req, res, next) => {
  res.json('registering');
};

module.exports = {
  login,
  register,
};
