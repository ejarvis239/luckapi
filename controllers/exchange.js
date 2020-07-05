const config = require ("../config/config");
const axios = require ('axios');
const accessKey = config.access_key;

const getExchange = async (req, res, next) => {
    const { fiat, crypto } = req.query;
    console.log('request >>>>>>', req.query);
    let crypto_price = 0;
    let rate = 0;
    let exchange_rate = 0;
    let updated_date = '';
    const cryptoCap = crypto.toLowerCase();
    
    if (cryptoCap) {
        const crypto_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";
        const crypto_data = await axios.get(crypto_url);
        let cryptoItem = {};
        for(let i = 0;i<crypto_data.data.length;i++) {
            if (crypto_data.data[i].symbol === cryptoCap) {
                cryptoItem = crypto_data.data[i];
            }
        }
        crypto_price = cryptoItem.current_price;
        updated_date = cryptoItem.last_updated;
    }
    if (fiat) {
        const fiat_url = `http://apilayer.net/api/live?access_key=${accessKey}&currencies=${fiat}`
        const fiat_data = await axios.get(fiat_url);
        switch (fiat) {
            case 'EUR':
                rate = fiat_data.data.quotes.USDEUR;
                break;
            case 'AFN':
                rate = fiat_data.data.quotes.USDAFN;
                break;
            case 'AMD':
                rate = fiat_data.data.quotes.USDAMD;
                break;
            case 'BGN':
                rate = fiat_data.data.quotes.USDBGN;
                break;
            case 'USD':
                rate = 1;
                break;
        }

    }
    exchange_rate = crypto_price * rate;
    const response = {
        "cryptocurrency": cryptoCap,
        "Fiat Currency": fiat,
        "Exchange rate": exchange_rate,
        "last updated": updated_date
    }
    console.log(response)
    res.send(response);
    
};

module.exports = { getExchange };
