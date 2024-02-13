/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const { mainErrroHandler, validateToken } = require('./middleware');
const itemRouter = require('./routes/itemRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// use routers
// /api         /auth/login
app.use('/api', authRouter);
// /api         /items
app.use('/api', itemRouter);
// /api         /categories
app.use('/api', validateToken, categoryRouter);
// /api         /order
app.use('/api', validateToken, orderRouter);

// 404 not found page api
app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found',
  });
});

// visos musu klaidos
app.use(mainErrroHandler);

app.listen(port, () => {
  console.log(chalk.blue(`Server is listening on port ${port}`));
});
