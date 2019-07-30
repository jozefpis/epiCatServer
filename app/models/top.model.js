var mongoose = require('mongoose');

const schema = new mongoose.Schema({
  cat_id: { type: String, unique: true, required: true },
  cat_url: { type: String, unique: true, required: true },
  count: { type: Number, required: true },
  created_at: { type: Date, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Top', schema);