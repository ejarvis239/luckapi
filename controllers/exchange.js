const config = require ("../config/config");
const axios = require ('axios');
const accessKey = config.access_key;

const getExchange = async (req, res, next) => {
    const { fiat, crypto } = req.query;
    if (!crypto || !fiat) res.send({error: "Crypto currency and fiat currency are required!"});

    let crypto_price = 0;
    let rate = 0;
    let exchange_rate = 0;
    let updated_date = '';
    let crypto_error = null;
    let fiat_error = null;
    let api_response = {};
    const cryptoCapital = crypto.toUpperCase();

    const crypto_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";
    try {
        let _data = await axios.get(crypto_url);
        let cryptoItem = {};
        for(let i = 0; i<_data.data.length; i++) {
            if (_data.data[i].symbol === crypto) {
                cryptoItem = _data.data[i];
                break;
            }
        }
        if (cryptoItem.symbol) {
            crypto_price = cryptoItem.current_price;
            updated_date = cryptoItem.last_updated;
        } else {
            crypto_error = 'Crypto currency info is incorrect, please use lowercase 3 letter currency code';
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
    const fiat_url = `http://apilayer.net/api/live?access_key=${accessKey}&currencies=${fiat.toUpperCase()}`;
    try {
        let _response = await axios.get(fiat_url);
        if (_response.data.success) {
            if (fiat.toUpperCase() === 'USD') {
                rate = 1;
            } else {
                const key = 'USD' + fiat.toUpperCase();
                rate = _response.data.quotes[key];
            }
        } else {
            fiat_error = _response.data.error.info;
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
    if (!crypto_error && !fiat_error) {
        exchange_rate = crypto_price * rate;
        api_response = {
            "cryptocurrency": cryptoCapital,
            "Fiat Currency": fiat.toUpperCase(),
            "Exchange rate": exchange_rate,
            "last updated": updated_date
        }
    } else {
        if (crypto_error) api_response['crypto_error'] = crypto_error;
        if (fiat_error) api_response['fiat_error'] = fiat_error;
    }

    res.send(api_response);
};

module.exports = { getExchange };
