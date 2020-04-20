'use strict';
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    client: {
        type: String
    }
})


module.exports = mongoose.model('Order', orderSchema);
