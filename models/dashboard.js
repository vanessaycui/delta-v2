var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    min: 0,
  }
})	
const incomeSchema = new Schema({
  incomeType: String
})	

var dashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categories: [categorySchema],
  incomes: [incomeSchema]
}, {
  timestamps: true
});


module.exports = mongoose.model('Dashboard', dashboardSchema);