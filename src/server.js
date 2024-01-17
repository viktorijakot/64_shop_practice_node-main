/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const { mainErrroHandler } = require('./middleware');

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
