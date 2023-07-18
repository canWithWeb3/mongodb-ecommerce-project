const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    slug: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
    }]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User