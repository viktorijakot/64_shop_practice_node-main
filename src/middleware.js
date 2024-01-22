/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const Yup = require('yup');
const jwt = require('jsonwebtoken');
const ApiError = require('./apiError/apiError');
const { jwtSecret } = require('./config');

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
  // const {
  //   title, description, price, rating, stock, cat_id, img_url,
  // } = req.body;
  const postScheme = Yup.object({
    title: Yup.string().trim().min(3).required('Title is missing'),
    description: Yup.string().trim().min(3).required('Description is missing'),
    price: Yup.number().min(1).required('Price is missing'),
    rating: Yup.number(),
    stock: Yup.number().integer().min(1).required('Stock is missing'),
    cat_id: Yup.number().integer(),
    img_url: Yup.string().trim().min(3).required('Image url is missing'),
  });
  try {
    const item = await postScheme.validate(req.body, { abortEarly: false });
    console.log('item  ===', item);
    next();
  } catch (error) {
    console.log('error ===', error);
    const errorFormater = {};
    // eslint-disable-next-line no-unused-vars
    const formatedErrors = error.inner.forEach((errObj) => {
      errorFormater[errObj.path] = errObj.message;
    });
    next(errorFormater, 400);
  }
};

const validateToken = async (req, res, next) => {
  console.log('authoriz is in progress ===');
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ApiError('No token', 401);
    const decoded = jwt.verify(token, jwtSecret);
    console.log('decoded ===', decoded);
    req.userEmail = decoded.email;
    req.userId = decoded.sub;
    console.log('req.userEmail  ===', req.userEmail);
    console.log('req.userId ===', req.userId);
    next();
  } catch (error) {
    console.log('token authorization error ===');
    next(new ApiError('Unauthorized', 401));
  }
};

module.exports = {
  mainErrroHandler,
  validateItemBody,
  validateToken,
};
