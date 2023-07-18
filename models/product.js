const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    description: String,
    categories: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
    }],
    slug: String,
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product