var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var entrySchema = new Schema({
  category: String,
  company: String,
  date: Date,
  cost: {
    type: Number,
    min: 0
  },
  comment: String,
  person: String,
  outlier: Boolean,
  income: {
    type:Number,
    min: 0
  },
  incomeType: String,
  dashboard:{
    type: Schema.Types.ObjectId,
    ref: 'Dashboard'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Entry', entrySchema);