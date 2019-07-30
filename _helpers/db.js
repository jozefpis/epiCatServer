const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

module.exports = {
    Vote: require('../app/models/vote.model'),
    Pair: require('../app/models/pair.model'),
    Top: require('../app/models/top.model'),
    Statistic: require('../app/models/statistic.model'),
};