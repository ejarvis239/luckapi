const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const app = express();
const CoinGecko = require('coingecko-api');
const to = require('await-to-js').default;
const coinGecko = new CoinGecko();
const { response } = require('express');

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
// app.use('/api', routes);

async function coinGeckoSync() {
	const [error, response] = await to(coinGecko.coins.markets({
				order: 'market_cap_desc',
				per_page: 15,
				vs_currency: 'usd',
				page: 1
			}))
					console.log(response.data);
					}

coinGeckoSync();

module.exports = app;