const config = require ("../config/config");
const axios = require ('axios');
const accessKey = config.access_key;

const getExchange = async (req, res, next) => {
    const { fiat, crypto } = req.query;
    let crypto_price = 0;
    let rate = 0;
    let exchange_rate = 0;
    let updated_date = '';
    let crypto_error = '';
    let fiat_error = '';
    let api_response = {};
    const cryptoCaptial = crypto.toUpperCase();
    if (crypto !== '' && fiat !== '') {
        const crypto_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";
        await axios.get(crypto_url)
            .then((response) => {
            let cryptoItem = {};
            for(let i = 0;i<response.data.length;i++) {
                if (response.data[i].symbol === crypto) {
                    cryptoItem = response.data[i];
                }
            }
            if (cryptoItem.symbol) {
                crypto_price = cryptoItem.current_price;
                updated_date = cryptoItem.last_updated;
            } else {
                crypto_error = 'Crypto currency info is incorrect, please use lowercase 3 digit currency code';
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
        if (fiat) {
            const fiat_url = `http://apilayer.net/api/live?access_key=${accessKey}&currencies=${fiat.toUpperCase()}`
            await axios.get(fiat_url).
            then((response) => {
                if (response.data.success === true) {
                    switch (fiat.toUpperCase()) {
                        case 'EUR':
                            rate = response.data.quotes.USDEUR;
                            break;
                        case 'AFN':
                            rate = response.data.quotes.USDAFN;
                            break;
                        case 'AMD':
                            rate = response.data.quotes.USDAMD;
                            break;
                        case 'BGN':
                            rate = response.data.quotes.USDBGN;
                            break;
                        case 'USD':
                            rate = 1;
                            break;
                    }
                } else {
                    fiat_error = response.data.error.info;
                }
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });

        }
        if (crypto_error === '' && fiat_error === '' ) {
            exchange_rate = crypto_price * rate;
            api_response = {
                "cryptocurrency": cryptoCaptial,
                "Fiat Currency": fiat.toUpperCase(),
                "Exchange rate": exchange_rate,
                "last updated": updated_date
            }
        } else if (crypto_error === '' && fiat_error !== '') {
            api_response = {
                'error': fiat_error
            }
        } else if (crypto_error !== '' && fiat_error === '') {
            api_response = {
                'error': crypto_error
            }
        } else if (crypto_error !=='' && fiat_error !== '') {
            api_response = {
                'fiat_error': fiat_error,
                'crypto_error': crypto_error
            }
        }
    } else {
        api_response ={
            "error": "Crypto currency and fiat currency must be required!"
        }
    }

    res.send(api_response);
};

module.exports = { getExchange };
