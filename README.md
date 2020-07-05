# Luck - Backend 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Before starting, you should ensure the following are installed:

[Node v8.12](https://nodejs.org/en/)

For this project, you will also require the following dependencies:

```
  "dependencies": {
    "axios": "^0.19.2",
    "body-parser": "^1.19.0",
    "coingecko-api": "^1.0.10",
    "cors": "^2.8.5",
    "express": "^4.17.1",

"devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^5.2.0",
    "nodemon": "^1.18.4",
    "supertest": "^3.3.0"
```
### Installing
1. Fork and clone this repository onto your own local machine.

2. Install the required node dependencies:
```
$ npm i
```

3. Create a config file for the project:
```
$ mkdir config
$ touch config.js
```

4. Your config file should look similar to this:
```
const config = {
    
    access_key: '',
};

module.exports = config

## Api endpoints

The following endpoints are available to users.

* GET /-- returns the home page, which displays all of these endpoints

#### exchange
* GET /api.exchange?fiat={fiat}&crypto={crypto}-- returns the exchange value of a fiat crypto pair
