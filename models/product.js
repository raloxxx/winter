'use strict';
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: {
        type: String
    },
    description: {
        type: String
    },
    img: {
        type: String
    }
})


module.exports = mongoose.model('Product', productSchema);
