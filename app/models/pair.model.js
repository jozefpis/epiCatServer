var mongoose = require('mongoose');

const schema = new mongoose.Schema({
  cats: { type: Object, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pair', schema)