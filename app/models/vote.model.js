var mongoose = require('mongoose');

const schema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  sub_id: { type: String, required: true },
  cat_id: { type: String, required: true },
  cat_url: { type: String, required: true },
  pair_id: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Vote', schema)