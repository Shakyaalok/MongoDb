const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: {
        prodId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        }
    }
})

module.exports = mongoose.model('cart', cartSchema)