const apiRouter = require('express').Router();
const exchangeRouter = require('./exchangeRouter')

apiRouter.get("/", (req, res, next) => console.log('hit api router'));

apiRouter.use('/exchange', exchangeRouter)

module.exports = apiRouter;