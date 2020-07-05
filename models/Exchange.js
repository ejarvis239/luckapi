//not used
const mongoose = require('mongoose');

const { Schema } = mongoose;
const ExchangeSchema = new Schema({

	id: {
	  type: String,
	  unique: true,
	  lowercase: true,
	},
	symbol: {
	  type: String,
	  unique: true,
	  lowercase: true,
	},
	name:  {
	  type: String,
	},
	image: {
	  type: String,
	},
	current_price:  {
	  type: Number
	}, 
    market_cap:  {
		type: Number
	  }, 
    market_cap_rank:  {
		type: Number
	  }, 
    total_volume: {
		type: Number
	  }, 
    high_24h:  {
		type: Number
	  }, 
    low_24h: {
		type: Number
	  }, 
    price_change_24h: {
		type: Number
	  }, 
    price_change_percentage_24h: {
		type: Number
	  }, 
    market_cap_change_24h: {
		type: Number
	  }, 
    market_cap_change_percentage_24h: {
		type: Number
	  }, 
    circulating_supply: {
		type: Number
	  }, 
    total_supply: {
		type: Number
	  }, 
    ath: {
		type: Number
	  }, 
    ath_change_percentage: {
		type: Number
	  }, 
    ath_date: {
		type: Date
	  }, 
    atl: {
		type: Number
	  }, 
    atl_change_percentage: {
		type: Number
	  }, 
    atl_date: {
		type: Date
	  }, 
    roi: {
      times: {
		type: Number
	  }, 
      currency: {
		type: String
	  }, 
      percentage: {Type: Number}
    },
	last_updated: {Type: Date}
  });

module.exports = mongoose.model('Exchange', ExchangeSchema);