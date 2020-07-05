const exchangeRouter = require('express').Router();
const {getExchange} = require('../controllers/exchange')

exchangeRouter.route('/')
    .get(getExchange)
  
module.exports = exchangeRouter;
