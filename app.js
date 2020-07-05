const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./router/apiRouter');
const CoinGecko = require('coingecko-api');
const to = require('await-to-js').default;
const { response } = require('express');
const { handle404s, handle500s } = require('./errors')
const coinGecko = new CoinGecko();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', apiRouter);

app.get("/", (req, res, next) =>
  res.sendFile(`${__dirname}/views/index.html`)
);

app.use('/*', (req, res) => {
    res.status(404).send({msg: 'Page not found'});
    });

app.use(handle404s);
app.use(handle500s);

module.exports = app;