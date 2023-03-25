const mongoose = require('mongoose');
const Donor = require('./donorsModel');

const stockSchema = new mongoose.Schema({
  foodBank: String,
  foodItems: [{
    name: String,
    quantity: Number,
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor',
      required: true
    },
    donatedDate: {
      type: Date,
      default: Date.now
    }
  }],

}, { timestamps: true});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
