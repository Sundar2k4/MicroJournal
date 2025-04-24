const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  content: { type: String, required: true, maxlength: 140 }
});

module.exports = mongoose.model('Entry', entrySchema);
