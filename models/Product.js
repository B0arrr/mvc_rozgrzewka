const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    shops: [{
        shop: String,
        price: Number,
        link: String
    }]
})
const Product = mongoose.model("Product", ProductSchema)
module.exports = Product