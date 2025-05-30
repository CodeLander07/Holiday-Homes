const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;