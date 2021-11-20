require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('./users')
const expensesRouter = require('./expenses');
const authRouter = require('./auth');

const createError = require('http-errors');


const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Routers
app.use('/api/users', usersRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/auth', authRouter);

app.get('/', (req,res) => {
    res.status(200).json({message: 'Hello World!'})
});

// Error handler
app.use(function (err, req, res, next) {
    if (err instanceof createError.HttpError) {
      res.locals.message = err.message;
      res.locals.status = err.statusCode;
      if (process.env.NODE_ENV === 'development') {
        res.locals.error = err;
      }
    }
    console.error(err);
    if (process.env.NODE_ENV === 'production' && !res.locals.message) {
      res.locals.message = 'ApplicationError';
      res.locals.status = 500;
    }
    if (res.locals.status) {
      res.status(res.locals.status || 500);
      const errObject = { error: res.locals.error, message: res.locals.message };
      return res.json(errObject);
    }
    next(err);
  });
  


module.exports = app;