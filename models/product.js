const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ProductSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }

)





module.exports = mongoose.model('product', ProductSchema)