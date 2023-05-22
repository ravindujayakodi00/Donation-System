const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

},{timestamps: true});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
